<template><div><h1 id="☁️docker系统架构" tabindex="-1"><a class="header-anchor" href="#☁️docker系统架构" aria-hidden="true">#</a> ☁️docker系统架构</h1>
<p>[toc]</p>
<h2 id="docker-的总架构图" tabindex="-1"><a class="header-anchor" href="#docker-的总架构图" aria-hidden="true">#</a> Docker 的总架构图</h2>
<img src="https://s2.loli.net/2022/05/08/AWZcyjfvLDJmEnq.jpg" alt="img" style="zoom: 33%;" />
<h3 id="图解" tabindex="-1"><a class="header-anchor" href="#图解" aria-hidden="true">#</a> 图解</h3>
<p><strong>docker 是一个 C/S 模式的架构，后端是一个松耦合架构，模块各司其职。</strong></p>
<p><strong>C/S：client-server</strong></p>
<ol>
<li>用户是使用 Docker Client 与 Docker Daemon 建立通信，并发送请求给后者。</li>
<li>Docker Daemon 作为 Docker 架构中的主体部分，首先提供 Server 的功能使其可以接受 Docker Client 的请求；</li>
<li>Engine 执行 Docker 内部的一系列工作，每一项工作都是以一个 Job 的形式的存在(redis,mysql….)。</li>
<li>Job 的运行过程中，当需要容器镜像时，则从 Docker Registry 中下载镜像，并通过镜像管理驱动 graphdriver 将下载镜像以 Graph 的形式存储；</li>
<li>当需要为 Docker 创建网络环境时，通过网络管理驱动 networkdriver 创建并配置 Docker 容器网络环境；</li>
<li>当需要限制 Docker 容器运行资源或执行用户指令等操作时，则通过 execdriver 来完成。</li>
<li>libcontainer 是一项独立的容器管理包，networkdriver 以及 execdriver 都是通过 libcontainer 来实现具体对容器进行的操作。</li>
</ol>
<h2 id="docker-各模块组件分析" tabindex="-1"><a class="header-anchor" href="#docker-各模块组件分析" aria-hidden="true">#</a> Docker 各模块组件分析</h2>
<h3 id="docker-client【发起请求】" tabindex="-1"><a class="header-anchor" href="#docker-client【发起请求】" aria-hidden="true">#</a> Docker Client【发起请求】</h3>
<ol>
<li>Docker Client 是和 Docker Daemon 建立通信的客户端。用户使用的可执行文件为 docker（类似可执行脚本的命令），docker 命令后接参数的形式来实现一个完整的请求命令（例如 docker images，docker 为命令不可变，images 为参数可变）。</li>
<li>Docker Client 可以通过以下三种方式和 Docker Daemon 建立通信：tcp://host:port，unix://path_to_socket 和 fd://socketfd。</li>
<li>Docker Client 发送容器管理请求后，由 Docker Daemon 接受并处理请求，当 Docker Client 接收到返回的请求相应并简单处理后，Docker Client 一次完整的生命周期就结束了。[一次完整的请求：发送请求→处理请求→返回结果]，与传统的 C/S 架构请求流程并无不同。</li>
</ol>
<h3 id="docker-daemon【后台守护进程】" tabindex="-1"><a class="header-anchor" href="#docker-daemon【后台守护进程】" aria-hidden="true">#</a> Docker Daemon【后台守护进程】</h3>
<ul>
<li>
<p>Docker Daemon 的架构图</p>
<p><img src="https://s2.loli.net/2022/05/08/JFbxhyeoDKrEcYv.jpg" alt="img"></p>
</li>
</ul>
<h4 id="docker-server【调度分发请求】" tabindex="-1"><a class="header-anchor" href="#docker-server【调度分发请求】" aria-hidden="true">#</a> Docker Server【调度分发请求】</h4>
<ul>
<li>Docker Server 的架构图</li>
</ul>
<p><img src="https://s2.loli.net/2022/05/08/wmt5A9KnYLIuaCs.jpg" alt="img"></p>
<ol>
<li>Docker Server 相当于 C/S 架构的服务端。功能为接受并调度分发 Docker Client 发送的请求。接受请求后，Server 通过路由与分发调度，找到相应的 Handler 来执行请求。</li>
<li>在 Docker 的启动过程中，通过包 gorilla/mux，创建了一个 mux.Router，提供请求的路由功能。在 Golang 中，gorilla/mux 是一个强大的 URL 路由器以及调度分发器。该 mux.Router 中添加了众多的路由项，每一个路由项由 HTTP 请求方法（PUT、POST、GET 或 DELETE）、URL、Handler 三部分组成。</li>
<li>创建完 mux.Router 之后，Docker 将 Server 的监听地址以及 mux.Router 作为参数，创建一个 httpSrv=http.Server{}，最终执行 httpSrv.Serve() 为请求服务。</li>
<li>在 Server 的服务过程中，Server 在 listener 上接受 Docker Client 的访问请求，并创建一个全新的 goroutine 来服务该请求。在 goroutine 中，首先读取请求内容，然后做解析工作，接着找到相应的路由项，随后调用相应的 Handler 来处理该请求，最后 Handler 处理完请求之后回复该请求。</li>
</ol>
<h4 id="engine" tabindex="-1"><a class="header-anchor" href="#engine" aria-hidden="true">#</a> Engine</h4>
<ol>
<li>Engine 是 Docker 架构中的运行引擎，同时也 Docker 运行的核心模块。它扮演 Docker container 存储仓库的角色，并且通过执行 job 的方式来操纵管理这些容器。</li>
<li>在 Engine 数据结构的设计与实现过程中，有一个 handler 对象。该 handler 对象存储的都是关于众多特定 job 的 handler 处理访问。举例说明，Engine 的 handler 对象中有一项为：{&quot;create&quot;: daemon.ContainerCreate,}，则说明当名为 &quot;create&quot; 的 job 在运行时，执行的是 daemon.ContainerCreate 的 handler。</li>
</ol>
<h4 id="job" tabindex="-1"><a class="header-anchor" href="#job" aria-hidden="true">#</a> job</h4>
<ol>
<li>一个 Job 可以认为是 Docker 架构中 Engine 内部最基本的工作执行单元。Docker 可以做的每一项工作，都可以抽象为一个 job。例如：在容器内部运行一个进程，这是一个 job；创建一个新的容器，这是一个 job。Docker Server 的运行过程也是一个 job，名为 serveapi。</li>
<li>Job 的设计者，把 Job 设计得与 Unix 进程相仿。比如说：Job 有一个名称，有参数，有环境变量，有标准的输入输出，有错误处理，有返回状态等。</li>
</ol>
<h3 id="docker-registry【镜像注册中心】" tabindex="-1"><a class="header-anchor" href="#docker-registry【镜像注册中心】" aria-hidden="true">#</a> Docker Registry【镜像注册中心】</h3>
<ol>
<li>Docker Registry 是一个存储容器镜像的仓库（注册中心），可理解为云端镜像仓库，按 repository 来分类，docker pull 按照 [repository]:[tag] 来精确定义一个 image。</li>
<li>在 Docker 的运行过程中，Docker Daemon 会与 Docker Registry 通信，并实现搜索镜像、下载镜像、上传镜像三个功能，这三个功能对应的 job 名称分别为 &quot;<code v-pre>search</code>&quot;，&quot;<code v-pre>pull</code>&quot; 与 &quot;<code v-pre>push</code>&quot;。</li>
<li>可分为公有仓库（docker hub）和私有仓库。</li>
</ol>
<h3 id="graph【docker-内部数据库】" tabindex="-1"><a class="header-anchor" href="#graph【docker-内部数据库】" aria-hidden="true">#</a> Graph【docker 内部数据库】</h3>
<p>Graph 的架构图</p>
<img src="https://s2.loli.net/2022/05/08/RgSq5sTlQA3v6ck.jpg" alt="img" style="zoom:67%;" />
<h4 id="repository" tabindex="-1"><a class="header-anchor" href="#repository" aria-hidden="true">#</a> Repository</h4>
<ol>
<li>已下载镜像的保管者（包括下载镜像和 dockerfile 构建的镜像）。</li>
<li>一个 repository 表示某类镜像的仓库（例如 Ubuntu），同一个 repository 内的镜像用 tag 来区分（表示同一类镜像的不同标签或版本）。一个 registry 包含多个 repository，一个 repository 包含同类型的多个 image。</li>
<li>镜像的存储类型有 aufs，devicemapper,Btrfs，Vfs 等。其中 centos 系统使用 devicemapper 的存储类型。</li>
<li>同时在 Graph 的本地目录中，关于每一个的容器镜像，具体存储的信息有：该容器镜像的元数据，容器镜像的大小信息，以及该容器镜像所代表的具体 rootfs。</li>
</ol>
<h4 id="graphdb" tabindex="-1"><a class="header-anchor" href="#graphdb" aria-hidden="true">#</a> GraphDB</h4>
<ol>
<li>已下载容器镜像之间关系的记录者。</li>
<li>GraphDB 是一个构建在 SQLite 之上的小型图数据库，实现了节点的命名以及节点之间关联关系的记录</li>
</ol>
<h3 id="driver【执行部分】" tabindex="-1"><a class="header-anchor" href="#driver【执行部分】" aria-hidden="true">#</a> Driver【执行部分】</h3>
<p>Driver 是 Docker 架构中的驱动模块。通过 Driver 驱动，Docker 可以实现对 Docker 容器执行环境的定制。即 Graph 负责镜像的存储，Driver 负责容器的执行。</p>
<ol>
<li>
<h4 id="graphdriver" tabindex="-1"><a class="header-anchor" href="#graphdriver" aria-hidden="true">#</a> graphdriver</h4>
<ul>
<li>
<p>graphdriver 架构图</p>
<img src="https://s2.loli.net/2022/05/08/AHdQ2EIVw3xtWYU.jpg" alt="img" style="zoom:50%;" />
</li>
</ul>
<ol>
<li>graphdriver 主要用于完成容器镜像的管理，包括存储与获取。</li>
<li>存储：docker pull 下载的镜像由 graphdriver 存储到本地的指定目录（Graph 中）。</li>
<li>获取：docker run（create）用镜像来创建容器的时候由 graphdriver 到本地 Graph 中获取镜像。</li>
</ol>
</li>
<li>
<h4 id="networkdriver" tabindex="-1"><a class="header-anchor" href="#networkdriver" aria-hidden="true">#</a> networkdriver</h4>
<ul>
<li>
<p>networkdriver 的架构图</p>
<img src="https://s2.loli.net/2022/05/08/8znfrJvIRK4OYAp.jpg" alt="img" style="zoom:50%;" />
</li>
</ul>
<ol>
<li>networkdriver 的用途是完成 Docker 容器网络环境的配置，其中包括
<ul>
<li>Docker 启动时为 Docker 环境创建网桥；</li>
<li>Docker 容器创建时为其创建专属虚拟网卡设备；</li>
<li>Docker 容器分配 IP、端口并与宿主机做端口映射，设置容器防火墙策略等。</li>
</ul>
</li>
</ol>
</li>
<li>
<h4 id="execdriver" tabindex="-1"><a class="header-anchor" href="#execdriver" aria-hidden="true">#</a> execdriver</h4>
<ul>
<li>
<p>execdriver 的架构图</p>
<img src="https://s2.loli.net/2022/05/08/zxtojRYDAZ21k6P.jpg" alt="img" style="zoom:50%;" />
</li>
</ul>
<ol>
<li>execdriver 作为 Docker 容器的执行驱动，负责创建容器运行命名空间，负责容器资源使用的统计与限制，负责容器内部进程的真正运行等。</li>
</ol>
</li>
<li>
<p>现在 execdriver 默认使用 native 驱动，不依赖于 LXC。</p>
</li>
</ol>
<h3 id="libcontainer【函数库】" tabindex="-1"><a class="header-anchor" href="#libcontainer【函数库】" aria-hidden="true">#</a> libcontainer【函数库】</h3>
<ul>
<li>
<p>libcontainer 的架构图</p>
<img src="https://s2.loli.net/2022/05/08/xnWCdfLy5REp7UV.jpg" alt="img" style="zoom:50%;" />
</li>
</ul>
<ol>
<li>libcontainer 是 Docker 架构中一个使用 Go 语言设计实现的库，设计初衷是希望该库可以不依靠任何依赖，直接访问内核中与容器相关的 API。</li>
<li><strong>Docker 可以直接调用 libcontainer，而最终操纵容器的 namespace、cgroups、apparmor、网络设备以及防火墙规则等。</strong></li>
<li>libcontainer 提供了一整套标准的接口来满足上层对容器管理的需求。或者说，libcontainer 屏蔽了 Docker 上层对容器的直接管理。</li>
</ol>
<h3 id="docker-container【服务交付的最终形式】" tabindex="-1"><a class="header-anchor" href="#docker-container【服务交付的最终形式】" aria-hidden="true">#</a> docker container【服务交付的最终形式】</h3>
<ul>
<li>
<p>container 架构</p>
<img src="https://s2.loli.net/2022/05/08/IA1V6OFJQTNGyPj.jpg" alt="img" style="zoom:50%;" />
</li>
</ul>
<ol>
<li>Docker container（Docker 容器）是 Docker 架构中服务交付的最终体现形式。</li>
<li>Docker 按照用户的需求与指令，订制相应的 Docker 容器：
<ul>
<li>用户通过指定容器镜像，使得 Docker 容器可以自定义 rootfs 等文件系统；</li>
<li>用户通过指定计算资源的配额，使得 Docker 容器使用指定的计算资源；</li>
<li>用户通过配置网络及其安全策略，使得 Docker 容器拥有独立且安全的网络环境；</li>
<li>用户通过指定运行的命令，使得 Docker 容器执行指定的工作。</li>
</ul>
</li>
</ol>
</div></template>


