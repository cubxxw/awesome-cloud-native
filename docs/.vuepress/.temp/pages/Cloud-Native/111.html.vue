<template><div><h1 id="openim-多进程管理策略" tabindex="-1"><a class="header-anchor" href="#openim-多进程管理策略" aria-hidden="true">#</a> OpenIM 多进程管理策略</h1>
<p>[toc]</p>
<h2 id="主要模块" tabindex="-1"><a class="header-anchor" href="#主要模块" aria-hidden="true">#</a> 主要模块</h2>
<p>这篇文章将会从 OpenIM 最基本的单进程前台运行开始，到 nohup 后台运行，到 system 系统进程，然后再到 Supervisord，容器化管理，kubernetes 健康检测。</p>
<h2 id="目前问题" tabindex="-1"><a class="header-anchor" href="#目前问题" aria-hidden="true">#</a> 目前问题</h2>
<p>阅读：https://github.com/cubxxw/Open-IM-Server/blob/refactor/feat-enhance/scripts/install/openim-crontask.sh 源码</p>
<p>目前 OpenIM 之前的进程管理策略是通过 <code v-pre>nohup</code> 在后台启动的。</p>
<p>整个项目由多个进程共同运行，现在需要一个可靠的保活机制，以便能够在进程崩溃的时候能够快速把它拉起来。openim 的解决方案无非就是写个保活脚本，在后台一直运行，如果发现某进程被关闭了，那么由脚本拉起来，或者是通过  docker compose 健康检测机制：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>healthcheck:
  test: <span class="token punctuation">[</span><span class="token string">"CMD-SHELL"</span>, <span class="token string">"./scripts/check-all.sh"</span><span class="token punctuation">]</span>
  interval: 30s
  timeout: 10s
  retries: <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是脚本它自己挂掉怎么办？(总不能使用脚本继续保活保活脚本套娃吧)。此外，另一个办法就是配置出来一个服务，让<code v-pre>Linux</code>操作系统帮你守护进程，显然，这种办法完全不需要担心守护进程自己挂掉，毕竟是<code v-pre>systemd</code>帮你守护，如果它挂掉了，操作系统应该也没了。</p>
<p>我们适配通用的 Ubuntu 和 CentOS 即可，因为 其他 的操作系统比如说 <code v-pre>alpine</code> , Alpine Linux 并不使用 <code v-pre>systemd</code> 作为其默认的初始化系统。相反，Alpine Linux 使用 <code v-pre>OpenRC</code> 作为其默认的初始化系统。这也是许多人选择 Alpine Linux 的原因，因为它是轻量级的，并且没有引入 <code v-pre>systemd</code>。</p>
<p>现在新版的 Ubuntu 和 CentOS 都支持的，旧版的<code v-pre>linux</code>使用<code v-pre>service httpd start</code>启动服务，新版的<code v-pre>linux</code>使用<code v-pre>systemctl start httpd</code>来启动服务，此外使用<code v-pre>initd</code>作为初始化系统的操作系统添加服务是在<code v-pre>/etc/init.d/</code>中添加脚本，而使用<code v-pre>systemd</code>作为初始化系统的操作系统只需要在<code v-pre>/etc/systemd/system/</code>文件夹中添加配置文件就好了。</p>
<h2 id="前台进程" tabindex="-1"><a class="header-anchor" href="#前台进程" aria-hidden="true">#</a> 前台进程</h2>
<p>前台进程：是在终端中运行的命令，那么该终端就为进程的控制终端，一旦这个终端关闭，这个进程也随之消失，这时就把Shell给占据了，我们无法进行其他操作。对于那些没有交互的进程，我们希望将其在后台启动，可以在启动参数的时候加一个’&amp;’实现这个目的。</p>
<p>后台进程：也叫守护进程（Daemon），是运行在后台的一种特殊进程，不受终端控制，它不需要终端的交互；Linux的大多数服务器就是使用守护进程实现的。比如Web服务器的httpd等。</p>
<h3 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h3>
<p><strong>1. 使用&amp;后台运行程序：</strong></p>
<p>结果会输出到终端</p>
<ul>
<li>
<p>使用Ctrl + C发送SIGINT信号，程序<strong>免疫</strong></p>
</li>
<li>
<p>关闭session发送SIGHUP信号，程序<strong>关闭</strong></p>
</li>
</ul>
<p><strong>2. 使用nohup运行程序：</strong></p>
<p>结果默认会输出到nohup.out</p>
<ul>
<li>
<p>使用Ctrl + C发送SIGINT信号，程序<strong>关闭</strong></p>
</li>
<li>
<p>关闭session发送SIGHUP信号，程序<strong>免疫</strong></p>
</li>
</ul>
<p>因此，平日线上经常使用nohup和&amp;配合来启动程序：<strong>可以同时免疫SIGINT和SIGHUP信号</strong></p>
<p><strong>3. Systemctl：</strong></p>
<p>Systemctl是一个systemd工具，主要负责控制systemd系统和服务管理器。</p>
<p>在终端中输入 <code v-pre>ps ax | grep systemd</code>，看到第一行，其中的数字 1 表示它的进程号是1，也就是说它是 Linux 内核发起的第一个程序。因此，内核一旦检测完硬件并组织好了内存，就会运行 <code v-pre>/usr/lib/systemd/systemd</code> 可执行程序，这个程序会按顺序依次发起其他程序。（ 在还没有 Systemd 的日子里，内核会去运行 <code v-pre>/sbin/init</code>，随后这个程序会在名为 SysVinit 的系统中运行其余的各种启动脚本。）</p>
<h2 id="system" tabindex="-1"><a class="header-anchor" href="#system" aria-hidden="true">#</a> System</h2>
<p>详细讲解一下 Linux 很重要的部分 system</p>
<ul>
<li>参考文章：https://blog.51cto.com/babylater/1895056</li>
</ul>
<h3 id="单元" tabindex="-1"><a class="header-anchor" href="#单元" aria-hidden="true">#</a> 单元</h3>
<p>系统初始化需要做的事情非常多。需要启动后台服务，比如启动 SSHD 服务；需要做配置工作，比如挂载文件系统。这个过程中的每一步都被 systemd 抽象为一个配置单元，即 unit。可以认为一个服务是一个配置单元；一个挂载点是一个配置单元；一个交换分区的配置是一个配置单元；等等。systemd 将配置单元归纳为以下一些不同的类型。然而，systemd 正在快速发展，新功能不断增加。所以配置单元类型可能在不久的将来继续增加。</p>
<ol>
<li>
<p>service：代表一个后台服务进程，比如 mysqld。这是最常用的一类。</p>
</li>
<li>
<p>socket：此类配置单元封装系统和互联网中的一个 套接字 。当下，systemd 支持流式、数据报和连续包的 AF_INET、AF_INET6、AF_UNIX socket 。每一个套接字配置单元都有一个相应的服务配置单元 。相应的服务在第一个&quot;连接&quot;进入套接字时就会启动(例如：nscd.socket 在有新连接后便启动 nscd.service)。</p>
</li>
<li>
<p>device：此类配置单元封装一个存在于 Linux 设备树中的设备。每一个使用 udev 规则标记的设备都将会在 systemd 中作为一个设备配置单元出现。</p>
</li>
<li>
<p>mount：此类配置单元封装文件系统结构层次中的一个挂载点。Systemd 将对这个挂载点进行监控和管理。比如可以在启动时自动将其挂载；可以在某些条件下自动卸载。Systemd 会将 <code v-pre>/etc/fstab</code> 中的条目都转换为挂载点，并在开机时处理。</p>
</li>
<li>
<p>automount：此类配置单元封装系统结构层次中的一个自挂载点。每一个自挂载配置单元对应一个挂载配置单元 ，当该自动挂载点被访问时，systemd 执行挂载点中定义的挂载行为。</p>
</li>
<li>
<p>swap: 和挂载配置单元类似，交换配置单元用来管理交换分区。用户可以用交换配置单元来定义系统中的交换分区，可以让这些交换分区在启动时被激活。</p>
</li>
<li>
<p>target：此类配置单元为其他配置单元进行逻辑分组。它们本身实际上并不做什么，只是引用其他配置单元而已。这样便可以对配置单元做一个统一的控制。这样就可以实现大家都已经非常熟悉的运行级别概念。比如想让系统进入图形化模式，需要运行许多服务和配置命令，这些操作都由一个个的配置单元表示，将所有这些配置单元组合为一个目标(target)，就表示需要将这些配置单元全部执行一遍以便进入目标所代表的系统运行状态。 (例如：multi-user.target 相当于在传统使用 SysV 的系统中运行级别 5)</p>
</li>
<li>
<p>timer：定时器配置单元用来定时触发用户定义的操作，这类配置单元取代了 atd、crond 等传统的定时服务。</p>
</li>
</ol>
<p>每个配置单元都有一个对应的配置文件，系统管理员的任务就是编写和维护这些不同的配置文件，比如一个 MySQL 服务对应一个 <code v-pre>mysql.service</code> 文件。这种配置文件的语法非常简单，用户不需要再编写和维护复杂的系统 5 脚本了。</p>
<h3 id="依赖关系" tabindex="-1"><a class="header-anchor" href="#依赖关系" aria-hidden="true">#</a> 依赖关系</h3>
<p>虽然 systemd 将大量的启动工作解除了依赖，使得它们可以并发启动。但还是存在有些任务，它们之间存在天生的依赖，不能用&quot;套接字激活&quot;(socket activation)、D-Bus activation 和 autofs 三大方法来解除依赖（三大方法详情见后续描述）。比如：挂载必须等待挂载点在文件系统中被创建；挂载也必须等待相应的物理设备就绪。为了解决这类依赖问题，systemd 的配置单元之间可以彼此定义依赖关系。</p>
<p>Systemd 用配置单元定义文件中的关键字来描述配置单元之间的依赖关系。比如：unit A 依赖 unit B，可以在 unit B 的定义中用&quot;require A&quot;来表示。这样 systemd 就会保证先启动 A 再启动 B。</p>
<h3 id="systemd-的并发启动原理" tabindex="-1"><a class="header-anchor" href="#systemd-的并发启动原理" aria-hidden="true">#</a> Systemd 的并发启动原理</h3>
<p>如前所述，在 Systemd 中，所有的服务都并发启动，比如 Avahi、D-Bus、livirtd、X11、HAL 可以同时启动。乍一看，这似乎有点儿问题，比如 Avahi 需要 syslog 的服务，Avahi 和 syslog 同时启动，假设 Avahi 的启动比较快，所以 syslog 还没有准备好，可是 Avahi 又需要记录日志，这岂不是会出现问题？</p>
<h2 id="systemd-的使用" tabindex="-1"><a class="header-anchor" href="#systemd-的使用" aria-hidden="true">#</a> Systemd  的使用</h2>
<p>开发人员需要了解 systemd 的更多细节。比如您打算开发一个新的系统服务，就必须了解如何让这个服务能够被 systemd 管理。这需要您注意以下这些要点：</p>
<ol>
<li>
<p>后台服务进程代码不需要执行两次派生来实现后台精灵进程，只需要实现服务本身的主循环即可。</p>
</li>
<li>
<p>不要调用 setsid()，交给 systemd 处理</p>
</li>
<li>
<p>不再需要维护 pid 文件。</p>
</li>
<li>
<p>Systemd 提供了日志功能，服务进程只需要输出到 stderr 即可，无需使用 syslog。</p>
</li>
<li>
<p>处理信号 SIGTERM，这个信号的唯一正确作用就是停止当前服务，不要做其他的事情。</p>
</li>
<li>
<p>SIGHUP 信号的作用是重启服务。</p>
</li>
<li>
<p>需要套接字的服务，不要自己创建套接字，让 systemd 传入套接字。</p>
</li>
<li>
<p>使用 sd_notify()函数通知 systemd 服务自己的状态改变。一般地，当服务初始化结束，进入服务就绪状态时，可以调用它。</p>
</li>
</ol>
<h3 id="unit-文件的编写" tabindex="-1"><a class="header-anchor" href="#unit-文件的编写" aria-hidden="true">#</a> Unit 文件的编写</h3>
<p>对于开发者来说，工作量最大的部分应该是编写配置单元文件，定义所需要的单元。</p>
<p>举例来说，开发人员开发了一个新的服务程序，比如 httpd，就需要为其编写一个配置单元文件以便该服务可以被 systemd 管理，类似 UpStart 的工作配置文件。在该文件中定义服务启动的命令行语法，以及和其他服务的依赖关系等。</p>
<p>此外我们之前已经了解到，systemd 的功能繁多，不仅用来管理服务，还可以管理挂载点，定义定时任务等。这些工作都是由编辑相应的配置单元文件完成的。我在这里给出几个配置单元文件的例子。</p>
<p><strong>服务的配置单元文件，服务配置单元文件以 <code v-pre>.service</code> 为文件名后缀。</strong></p>
<p>openim 也写了关于自己的服务的一些配置文件 ，比如说 <code v-pre>openim-api.service</code></p>
<h2 id="supervisord" tabindex="-1"><a class="header-anchor" href="#supervisord" aria-hidden="true">#</a> Supervisord</h2>
<p>Supervisord 是用 Python 实现的一款的进程管理工具，supervisord 要求管理的程序是非 daemon 程序，supervisord 会帮你把它转成 daemon 程序，因此如果用 supervisord 来管理进程，进程需要以非daemon的方式启动。</p>
<p>例如：管理nginx 的话，必须在 nginx 的配置文件里添加一行设置 daemon off 让 nginx 以非 daemon 方式启动</p>
<p>安装：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> supervisor <span class="token operator">||</span> yum <span class="token function">install</span> supervisor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装后，可以修改一下最后一行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>files <span class="token operator">=</span> /etc/supervisor/conf.d/*.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>换到 <code v-pre> /opt/supervisord.d/</code> 目录下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>files <span class="token operator">=</span> /opt/supervisord.d/*.ini   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>上述地址可以自定义, 会读取/opt/supervisord.d 文件夹下 所有以 ini结尾的文件 作为配置读取</strong></p>
<p><strong>然后再/opt/supervisord.d/ 下新建一个配置 例如 test.ini</strong></p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token comment">;进程名称 即项目名</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">program:test</span><span class="token punctuation">]</span></span>

<span class="token comment">;脚本目录 运行的进程文件目录</span>
<span class="token key attr-name">directory</span><span class="token punctuation">=</span><span class="token value attr-value">/opt/ytgMateriel/materialBackend</span>

<span class="token comment">;启动命令 此处为java的jar 启动命令</span>
<span class="token key attr-name">command</span><span class="token punctuation">=</span><span class="token value attr-value">/opt/jdk1.8.0_171/bin/java -Xms512m -Xmx1024m -jar -Dspring.profiles.active=prd -Djava.io.tmpdir=./tmp -Dloader.path=lib ytg-material-backend.jar</span>

<span class="token comment">;停止进程的命令 默认 quit</span>
<span class="token key attr-name">stopsignal</span><span class="token punctuation">=</span><span class="token value attr-value">KILL</span>

<span class="token comment">;supervisor启动的时候是否随着同时启动，默认True   </span>
<span class="token comment">;当程序exit的时候，这个program不会自动重启,默认unexpected，设置子进程挂掉后自动重启的情况，有三个选项，false,unexpected和true。如果为false的时候，无论什么情况下，都不会被重新启动，如果为unexpected，只有当进程的退出码不在下面的exitcodes里面定义的 </span>
<span class="token key attr-name">autorestart</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>

<span class="token comment">;这个选项是子进程启动多少秒之后，此时状态如果是running，则我们认为启动成功了。默认值为1</span>
<span class="token key attr-name">startsecs</span><span class="token punctuation">=</span><span class="token value attr-value">3</span>

<span class="token comment">;日志</span>
<span class="token key attr-name">stdout_logfile</span><span class="token punctuation">=</span><span class="token value attr-value">/opt/ytgMateriel/materialBackend/logs/ytg-material-backend.log</span>

<span class="token comment">;stdout日志文件大小，默认 50MB</span>
<span class="token key attr-name">stdout_logfile_maxbytes</span><span class="token punctuation">=</span><span class="token value attr-value">100MB</span>

<span class="token comment">;stdout日志文件备份数</span>
<span class="token key attr-name">stdout_logfile_backups</span><span class="token punctuation">=</span><span class="token value attr-value">50</span>
<span class="token key attr-name">user</span> <span class="token punctuation">=</span> <span class="token value attr-value">root</span>

<span class="token comment">;把stderr重定向到stdout，默认 false</span>
<span class="token key attr-name">redirect_stderr</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启动supervisord</strong></p>
<p>使用supervisor进程管理命令之前先启动 <code v-pre>supervisord</code>，否则程序报错。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>supervisord <span class="token parameter variable">-c</span> /etc/supervisord.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>常用命令</p>
<div class="language-cpp ext-cpp line-numbers-mode"><pre v-pre class="language-cpp"><code>supervisorctl status        <span class="token comment">//查看所有进程的状态</span>
supervisorctl stop 进程名       <span class="token comment">//停止es</span>
supervisorctl start 进程名      <span class="token comment">//启动es</span>
supervisorctl restart 进程名      <span class="token comment">//重启es</span>
supervisorctl update        <span class="token comment">//配置文件修改后使用该命令加载新的配置</span>
supervisorctl reload        <span class="token comment">//重新启动配置中的所有程序</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="systemd与supervisord对比" tabindex="-1"><a class="header-anchor" href="#systemd与supervisord对比" aria-hidden="true">#</a> Systemd与Supervisord对比</h2>
<p>无论是Systemd和Supervisord都可以用于控制进程，实现进程的分组管理和崩溃自动重启.</p>
<p>无论 Supervisord 还是 Systemd，都采用 ini 作为配置文件的格式。跟 Supervisord 不同的是，Systemd 每个程序都要单独开一个 unit 文件。</p>
<p>Supervisord 可以同时启动/停止配置文件中所以的进程（或者某个进程组配置中的进程）。</p>
<p>也就是说，Supervisord 使用“进程组”这个概念来控制多个进程, Systemd 则用用依赖来实现这一点。</p>
<p>我们来看一个简单的Systemd配置文件，实现了进程组管理</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token comment">; group.target</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">Application</span>
<span class="token key attr-name">Wants</span><span class="token punctuation">=</span><span class="token value attr-value">prog1.service prog2.service</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个：</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token comment">; prog1.service</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">prog1</span>
<span class="token key attr-name">PartOf</span><span class="token punctuation">=</span><span class="token value attr-value">group.target</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/prog1</span>
<span class="token key attr-name">Restart</span><span class="token punctuation">=</span><span class="token value attr-value">on-failure</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个：</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token comment">; prog2.service</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">prog2</span>
<span class="token key attr-name">PartOf</span><span class="token punctuation">=</span><span class="token value attr-value">group.target</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/prog2</span>
<span class="token key attr-name">Restart</span><span class="token punctuation">=</span><span class="token value attr-value">on-failure</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>systemctl start group.target</code> ，prog1 和 prog2 也会启动。<code v-pre>systemctl restart group.target</code>，prog1 和 prog2 也会跟着重启</p>
<p>相比起来Supervisord的管理方式就要明了一些了:</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">program:prog1</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">command</span><span class="token punctuation">=</span><span class="token value attr-value">python /home/user/myapp/prog1.py</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">program:prog2</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">command</span><span class="token punctuation">=</span><span class="token value attr-value">python /home/user/myapp/prog2.py</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">group:prog</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">programs</span><span class="token punctuation">=</span><span class="token value attr-value">prog1,prog2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>supervisorctl start prog:*</code>可以启动prog组下的所有进程</p>
<p>不过 supervisord 有一个优点。如果你不知道哪些程序的配置改变了，简单地执行 <code v-pre>supervisorctl update</code>，所有涉及的进程都会被重启。</p>
<p>supervisor与<a href="https://en.wikipedia.org/wiki/Launchd" target="_blank" rel="noopener noreferrer">launchd<ExternalLinkIcon/></a>，<a href="http://cr.yp.to/daemontools.html" target="_blank" rel="noopener noreferrer">daemontools<ExternalLinkIcon/></a>，<a href="http://smarden.org/runit/" target="_blank" rel="noopener noreferrer">runit<ExternalLinkIcon/></a>等程序有着相同的功能，与某些程序不同的是，它并不作为“id 为 1的进程”而替代init。相反，它用于控制应用程序，像启动其它程序一样，通俗理解就是，把Supervisor服务管理的进程程序，它们作为supervisor的子进程来运行，而supervisor是父进程。supervisor来监控管理子进程的启动关闭和异常退出后的自动启动。</p>
<h3 id="多进程模板" tabindex="-1"><a class="header-anchor" href="#多进程模板" aria-hidden="true">#</a> 多进程模板</h3>
<p>对于 <code v-pre>Supervisord</code> 来说，只需要维护一个配置文件而已，而对于 <code v-pre>systemd</code> 来说，需要维护很多个配置文件，配置项也比较复杂。</p>
<p>如果需要创建很多服务，但是服务的配置文件只有 <code v-pre>ExecStart</code> 项有细微区别，那么可以考虑使用模板功能。</p>
<p>比如，创建服务文件<code v-pre>/etc/systemd/system/ping@.service</code></p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">Ping service %i</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Type</span><span class="token punctuation">=</span><span class="token value attr-value">simple</span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/ping %i</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动进程可以这样<code v-pre>systemctl start ping@127.0.0.1.service</code>，实际上，启动服务可以省略<code v-pre>.service</code>后缀，也即是<code v-pre>systemctl start ping@127.0.0.1</code>，如果要一次启动多个服务，可以<code v-pre>systemctl start ping@127.0.0.1 ping@127.0.0.2</code>，停止服务也是类似。</p>
<p>这样，如果想要<code v-pre>ping</code>别的地址，只需要修改命令中<code v-pre>@</code>之后的字符串就好了。</p>
<p>也支持如下这样拼接字符串</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">Ping service %i</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Type</span><span class="token punctuation">=</span><span class="token value attr-value">simple</span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/ping 127.0.0.%i</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>systemctl start ping@1</code>就能执行<code v-pre>ping 127.0.0.1</code>服务</p>
<p>对于配置文件中的<code v-pre>%i</code>其实是有大小写区别的，<code v-pre>%i</code>是转义之后的字符串 <code v-pre>%I</code>是不转义的字符串，对于完整的说明符列表，见<a href="https://www.freedesktop.org/software/systemd/man/systemd.unit.html" target="_blank" rel="noopener noreferrer">systemd.unit (www.freedesktop.org)<ExternalLinkIcon/></a></p>
<h3 id="链式启动-服务依赖" tabindex="-1"><a class="header-anchor" href="#链式启动-服务依赖" aria-hidden="true">#</a> 链式启动（服务依赖）</h3>
<p>有这么一种情况，需要同时启动多个服务，并且他们有启动顺序的限制。那么可以像下面这么配置</p>
<p>假设有 <code v-pre>A进程</code>、 <code v-pre>B进程</code>、 <code v-pre>C进程</code>，想要按顺序依次启动，那么可以这么配置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># cat /etc/systemd/system/C.service</span>
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>C Process
<span class="token assign-left variable">Requires</span><span class="token operator">=</span>B.service
<span class="token assign-left variable">After</span><span class="token operator">=</span>B.service

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>simple
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/export/CProgram

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 B 服务</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token comment"># cat /etc/systemd/system/B.service</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">B Process</span>
<span class="token key attr-name">Requires</span><span class="token punctuation">=</span><span class="token value attr-value">A.service</span>
<span class="token key attr-name">After</span><span class="token punctuation">=</span><span class="token value attr-value">A.service</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Type</span><span class="token punctuation">=</span><span class="token value attr-value">simple</span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/export/BProgram</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 A 服务</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token comment"># cat /etc/systemd/system/A.service</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">A Process</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Type</span><span class="token punctuation">=</span><span class="token value attr-value">simple</span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/export/AProgram</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果是，<code v-pre>systemctl start C.service</code>之后几个进程会依次启动，<code v-pre>Requires</code>指定了几个服务之间的依赖关系，因为通过<code v-pre>After</code>选择指定了服务间启动顺序，所以几个服务是依次启动的。如果没有<code v-pre>After</code>，<strong>启动顺序不被保证</strong></p>
<p>如果，此时<code v-pre>systemctl stop A.service</code>，那么几个服务都会被关闭，因为<code v-pre>Requires</code>要求了前置服务必须存在，否则自身也不应该启动。如果不想自身服务被关闭，那么可以把<code v-pre>Requires</code>(要求)替换成<code v-pre>Wants</code>(想要)。</p>
<p>如果要形成依赖链，除了<code v-pre>After</code>也可以使用<code v-pre>Before</code></p>
<h3 id="查看服务输出-journalctl" tabindex="-1"><a class="header-anchor" href="#查看服务输出-journalctl" aria-hidden="true">#</a> 查看服务输出 - journalctl</h3>
<p><code v-pre>systemd</code>不仅用来运行服务，它同时也有日志服务，用于取代老系统的<code v-pre>syslog</code>。</p>
<p>运行的服务标准输出和错误输出会被交给<code v-pre>journald</code>管理，查看某个服务可以使用这样的命令<code v-pre>journalctl -u ping@1</code> 带<code v-pre>-e</code>参数可以跳到最新一行 <code v-pre>-f</code>参数可以看到实时输出，<code v-pre>-n</code>参数可以指定输出的行数，<code v-pre>-r</code>反序输出。</p>
<p>例如<code v-pre>journalctl -u ping@1 -e</code> 或者 <code v-pre>journalctl -u ping@1 -f</code></p>
<p>如果服务的输出太多，那么可以在<code v-pre>.servive</code>文件中的<code v-pre>[Unit]</code>节区配置<code v-pre>StandardOutput=null</code></p>
<p>也可以通过<code v-pre>systemctl status xx.service</code>查看服务的部分输出</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
<span class="token comment"># 查看所有日志（默认情况下 ，只保存本次启动的日志）</span>
$ <span class="token function">sudo</span> journalctl

<span class="token comment"># 查看内核日志（不显示应用日志）</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-k</span>

<span class="token comment"># 查看系统本次启动的日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-b</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-b</span> <span class="token parameter variable">-0</span>

<span class="token comment"># 查看上一次启动的日志（需更改设置）</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-b</span> <span class="token parameter variable">-1</span>

<span class="token comment"># 查看指定时间的日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">--since</span><span class="token operator">=</span><span class="token string">"2012-10-30 18:17:16"</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">--since</span> <span class="token string">"20 min ago"</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">--since</span> yesterday
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">--since</span> <span class="token string">"2015-01-10"</span> <span class="token parameter variable">--until</span> <span class="token string">"2015-01-11 03:00"</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">--since</span> 09:00 <span class="token parameter variable">--until</span> <span class="token string">"1 hour ago"</span>

<span class="token comment"># 显示尾部的最新10行日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-n</span>

<span class="token comment"># 显示尾部指定行数的日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-n</span> <span class="token number">20</span>

<span class="token comment"># 实时滚动显示最新日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-f</span>

<span class="token comment"># 查看指定服务的日志</span>
$ <span class="token function">sudo</span> journalctl /usr/lib/systemd/systemd

<span class="token comment"># 查看指定进程的日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token assign-left variable">_PID</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token comment"># 查看某个路径的脚本的日志</span>
$ <span class="token function">sudo</span> journalctl /usr/bin/bash

<span class="token comment"># 查看指定用户的日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token assign-left variable">_UID</span><span class="token operator">=</span><span class="token number">33</span> <span class="token parameter variable">--since</span> today

<span class="token comment"># 查看某个 Unit 的日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> nginx.service
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> nginx.service <span class="token parameter variable">--since</span> today

<span class="token comment"># 实时滚动显示某个 Unit 的最新日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> nginx.service <span class="token parameter variable">-f</span>

<span class="token comment"># 合并显示多个 Unit 的日志</span>
$ journalctl <span class="token parameter variable">-u</span> nginx.service <span class="token parameter variable">-u</span> php-fpm.service <span class="token parameter variable">--since</span> today

<span class="token comment"># 查看指定优先级（及其以上级别）的日志，共有8级</span>
<span class="token comment"># 0: emerg</span>
<span class="token comment"># 1: alert</span>
<span class="token comment"># 2: crit</span>
<span class="token comment"># 3: err</span>
<span class="token comment"># 4: warning</span>
<span class="token comment"># 5: notice</span>
<span class="token comment"># 6: info</span>
<span class="token comment"># 7: debug</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-p</span> err <span class="token parameter variable">-b</span>

<span class="token comment"># 日志默认分页输出，--no-pager 改为正常的标准输出</span>
$ <span class="token function">sudo</span> journalctl --no-pager

<span class="token comment"># 以 JSON 格式（单行）输出</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-b</span> <span class="token parameter variable">-u</span> nginx.service <span class="token parameter variable">-o</span> json

<span class="token comment"># 以 JSON 格式（多行）输出，可读性更好</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-b</span> <span class="token parameter variable">-u</span> nginx.serviceqq
 <span class="token parameter variable">-o</span> json-pretty

<span class="token comment"># 显示日志占据的硬盘空间</span>
$ <span class="token function">sudo</span> journalctl --disk-usage

<span class="token comment"># 指定日志文件占据的最大空间</span>
$ <span class="token function">sudo</span> journalctl --vacuum-size<span class="token operator">=</span>1G

<span class="token comment"># 指定日志文件保存多久</span>
$ <span class="token function">sudo</span> journalctl --vacuum-time<span class="token operator">=</span>1years
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="openim-配置-system" tabindex="-1"><a class="header-anchor" href="#openim-配置-system" aria-hidden="true">#</a> OpenIM  配置 System</h2>
<p>在上面的多重考虑中， OpenIM 最终选择的还是 System ，因为我们已经有一套后台的方案。</p>
<p>首先，考虑将各个配置模板化，这是我们第一步要做的。</p>
<p>使用模板，一个模板单元(unit)文件可以创建多个实例化的单元文件，从而简化系统配置。</p>
<p>模板单元文件的文件名中包含一个@符号，@位于单元基本文件名和扩展名之间，比如:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>example@.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当从模板单元文件创建实例单元文件时，在@符号和单元扩展名(包括符号.)之前加入实例名,比如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>example@instance1.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>表明实例单元文件<a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;tf=1&amp;to=example@instance1.service" target="_blank" rel="noopener noreferrer">example@instance1.service<ExternalLinkIcon/></a>实例化自模板单元文件example@.service，其实例名为instance1</p>
<p>实例单元文件一般是模板单元文件的一个符号链接，符号链接命中包含实例名，systemd就会传递实例名给模板单元文件。</p>
<p>在相应的target中创建实例单元文件符号链接之后，需要运行一下命令将其装载：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl daemon-reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>模板标识符/参数</strong></p>
<p>模板单元文件中可以使用一些标识符，当被实例化为实例单元文件并运行时，systemd会将标识符的实际值传递给对应的标识符，比如在模板单元文件中是用<code v-pre>%i</code>，实际运行实例单元文件时，会将实例名传递给 <code v-pre>%i</code> 标识符。(中文意思就是<code v-pre>@</code>之后的字符，<code v-pre>.service</code>之前的字符)</p>
<table>
<thead>
<tr>
<th>占位符</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>%n</td>
<td>在模板文件中出现时，会插入完整的单元名称。</td>
</tr>
<tr>
<td>%N</td>
<td>与上面相同，但会反转任何转义，例如在文件路径模式中存在的转义。</td>
</tr>
<tr>
<td>%p</td>
<td>这引用单元名称前缀。这是单元名称中 @ 符号之前的部分。</td>
</tr>
<tr>
<td>%P</td>
<td>与上面相同，但会反转任何转义。</td>
</tr>
<tr>
<td>%i</td>
<td>这引用实例名称，即在实例单元中 @ 之后的标识符。这是最常用的指定符之一，因为它保证是动态的。使用此标识符鼓励使用配置重要的标识符。例如，服务运行的端口可以用作实例标识符，模板可以使用此指定符来设置端口规范。</td>
</tr>
<tr>
<td>%I</td>
<td>这个指定符与上面相同，但会反转任何转义。</td>
</tr>
<tr>
<td>%f</td>
<td>这将被替换为未转义的实例名称或前缀名称，前面加上一个 /。</td>
</tr>
<tr>
<td>%c</td>
<td>这将指示单元的控制组，移除了标准的父层次结构 <code v-pre>/sys/fs/cgroup/ssytemd/</code>。</td>
</tr>
<tr>
<td>%u</td>
<td>配置为运行单元的用户的名称。</td>
</tr>
<tr>
<td>%U</td>
<td>与上面相同，但作为数字 UID 而不是名称。</td>
</tr>
<tr>
<td>%H</td>
<td>运行该单元的系统的主机名称。</td>
</tr>
<tr>
<td>%%</td>
<td>用于插入文字的百分比符号。</td>
</tr>
</tbody>
</table>
</div></template>


