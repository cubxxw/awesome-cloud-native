<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第26节-oci-cri-runc-containerd-cri-containerd-dockershim等组件解释" tabindex="-1"><a class="header-anchor" href="#第26节-oci-cri-runc-containerd-cri-containerd-dockershim等组件解释" aria-hidden="true">#</a> 第26节 OCI，CRI，runc，containerd，cri-containerd，dockershim等组件解释</h1>
<div><a href = '25.md' style='float:left'>⬆️上一节🔗  </a><a href = '27.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="层级调用关系" tabindex="-1"><a class="header-anchor" href="#层级调用关系" aria-hidden="true">#</a> 层级调用关系</h2>
<p><img src="http://sm.cubxxw.com/sm202302071135076.png" alt="image-20230207113509803"></p>
<h2 id="oci-open-container-initiative" tabindex="-1"><a class="header-anchor" href="#oci-open-container-initiative" aria-hidden="true">#</a> OCI（Open Container Initiative）</h2>
<p>OCI（Open Container Initiative）即开放的容器运行时<code v-pre>规范</code>，目的在于定义一个容器运行时及镜像的相关标准和规范，其中包括</p>
<ul>
<li>runtime-spec：容器的生命周期管理，具体参考<a href="https://github.com/opencontainers/runtime-spec/blob/master/runtime.md" target="_blank" rel="noopener noreferrer">runtime-spec<ExternalLinkIcon/></a>。</li>
<li>image-spec：镜像的生命周期管理，具体参考<a href="https://github.com/opencontainers/image-spec/blob/main/spec.md" target="_blank" rel="noopener noreferrer">image-spec<ExternalLinkIcon/></a>。</li>
</ul>
<p>实现OCI标准的容器运行时有<code v-pre>runc</code>，<code v-pre>kata</code>等。</p>
<h2 id="runc" tabindex="-1"><a class="header-anchor" href="#runc" aria-hidden="true">#</a> RunC</h2>
<p><code v-pre>runc(run container)</code>是一个基于OCI标准实现的一个轻量级容器运行工具，用来创建和运行容器。而Containerd是用来维持通过runc创建的容器的运行状态。即runc用来创建和运行容器，containerd作为常驻进程用来管理容器。</p>
<p>runc包含libcontainer，包括对namespace和cgroup的调用操作。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/opt/vpn/Clash<span class="token comment"># runc --help</span>
USAGE:
   runc <span class="token punctuation">[</span>global options<span class="token punctuation">]</span> <span class="token builtin class-name">command</span> <span class="token punctuation">[</span>command options<span class="token punctuation">]</span> <span class="token punctuation">[</span>arguments<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

VERSION:
   <span class="token number">1.0</span>.0-rc10
commit: dc9208a3303feef5b3839f4323d9beb36df0a9dd
spec: <span class="token number">1.0</span>.1-dev

COMMANDS:
     checkpoint  checkpoint a running container
     create      create a container
     delete      delete any resources held by the container often used with detached container
     events      display container events such as OOM notifications, cpu, memory, and IO usage statistics
     <span class="token builtin class-name">exec</span>        execute new process inside the container
     init        initialize the namespaces and launch the process <span class="token punctuation">(</span>do not call it outside of runc<span class="token punctuation">)</span>
     <span class="token function">kill</span>        <span class="token function">kill</span> sends the specified signal <span class="token punctuation">(</span>default: SIGTERM<span class="token punctuation">)</span> to the container<span class="token string">'s init process
     list        lists containers started by runc with the given root
     pause       pause suspends all processes inside the container
     ps          ps displays the processes running inside a container
     restore     restore a container from a previous checkpoint
     resume      resumes all processes that have been previously paused
     run         create and run a container
     spec        create a new specification file
     start       executes the user defined process in a created container
     state       output the state of a container
     update      update container resource constraints
     help, h     Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --debug             enable debug output for logging
   --log value         set the log file path where internal debug information is written
   --log-format value  set the format used by logs ('</span>text<span class="token string">' (default), or '</span>json<span class="token string">') (default: "text")
   --root value        root directory for storage of container state (this should be located in tmpfs) (default: "/run/runc")
   --criu value        path to the criu binary used for checkpoint and restore (default: "criu")
   --systemd-cgroup    enable systemd cgroup support, expects cgroupsPath to be of form "slice:prefix:name" for e.g. "system.slice:runc:434234"
   --rootless value    ignore cgroup permission errors ('</span><span class="token boolean">true</span><span class="token string">', '</span><span class="token boolean">false</span><span class="token string">', or '</span>auto'<span class="token punctuation">)</span> <span class="token punctuation">(</span>default: <span class="token string">"auto"</span><span class="token punctuation">)</span>
   --help, <span class="token parameter variable">-h</span>          show <span class="token builtin class-name">help</span>
   --version, <span class="token parameter variable">-v</span>       print the version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cantainerd" tabindex="-1"><a class="header-anchor" href="#cantainerd" aria-hidden="true">#</a> cantainerd</h2>
<p>针对 runtime module</p>
<p><code v-pre>containerd（container daemon）</code>是一个daemon进程用来管理和运行容器，可以用来拉取/推送镜像和管理容器的存储和网络。其中可以调用 <code v-pre>runc</code> 来创建和运行容器。</p>
<p><img src="http://sm.cubxxw.com/sm202302071321448.png" alt="image-20230207132129355"></p>
<h2 id="docker与containerd、runc的关系图" tabindex="-1"><a class="header-anchor" href="#docker与containerd、runc的关系图" aria-hidden="true">#</a> docker与containerd、runc的关系图</h2>
<p><img src="http://sm.cubxxw.com/sm202302071322165.png" alt="image-20230207132203099"></p>
<blockquote>
<ul>
<li>最终用户使用docker命令创建并运行容器。</li>
<li>Containerd提取映像，管理网络和存储，并使用runc运行容器。</li>
<li>Runc做低级的“事情”来创建和运行容器化的进程。</li>
</ul>
</blockquote>
<p>更具体的调用逻辑：</p>
<p>Containerd 是在 Docker 1.11 中引入的，用于管理节点上的 runC 容器。如下所示，它为每个容器创建一个containerd-shim，shim管理其对应容器的生命周期。</p>
<p><img src="http://sm.cubxxw.com/sm202302071322276.png" alt="image-20230207132215193"></p>
<h2 id="cri-container-runtime-interface" tabindex="-1"><a class="header-anchor" href="#cri-container-runtime-interface" aria-hidden="true">#</a> CRI（Container Runtime Interface ）</h2>
<p><strong>CRI即容器运行时接口，主要用来定义k8s与容器运行时的API调用</strong>，kubelet通过CRI来调用容器运行时，只要实现了CRI接口的容器运行时就可以对接到k8s的kubelet组件。</p>
<p>Kubernetes 所有项目在所有版本中出产的工件（Kubernetes 二进制文件）都经过了验证。</p>
<p>此外，<a href="https://kind.sigs.k8s.io/" target="_blank" rel="noopener noreferrer">kind<ExternalLinkIcon/></a> 项目使用 containerd 已经有一段时间了，并且提高了其用例的稳定性。 Kind 和 containerd 每天都会被多次使用来验证对 Kubernetes 代码库的任何更改。 其他相关项目也遵循同样的模式，从而展示了其他容器运行时的稳定性和可用性。 例如，OpenShift 4.x 从 2019 年 6 月以来，就一直在生产环境中使用 <a href="https://cri-o.io/" target="_blank" rel="noopener noreferrer">CRI-O<ExternalLinkIcon/></a> 运行时。</p>
<p>至于其他示例和参考资料，你可以查看 containerd 和 CRI-O 的使用者列表， 这两个容器运行时是云原生基金会（<a href="https://cncf.io/" target="_blank" rel="noopener noreferrer">CNCF<ExternalLinkIcon/></a>）下的项目。</p>
<ul>
<li><a href="https://github.com/containerd/containerd/blob/master/ADOPTERS.md" target="_blank" rel="noopener noreferrer">containerd<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cri-o/cri-o/blob/master/ADOPTERS.md" target="_blank" rel="noopener noreferrer">CRI-O<ExternalLinkIcon/></a></li>
</ul>
<h2 id="docker与k8s调用containerd的关系图" tabindex="-1"><a class="header-anchor" href="#docker与k8s调用containerd的关系图" aria-hidden="true">#</a> docker与k8s调用containerd的关系图</h2>
<p><img src="http://sm.cubxxw.com/sm202302071325602.png" alt="img"></p>
<h2 id="cri-containerd" tabindex="-1"><a class="header-anchor" href="#cri-containerd" aria-hidden="true">#</a> cri-containerd</h2>
<p><img src="http://sm.cubxxw.com/sm202302071329741.png" alt="image-20230207132921651"></p>
<h3 id="cri-plugin调用流程" tabindex="-1"><a class="header-anchor" href="#cri-plugin调用流程" aria-hidden="true">#</a> CRI Plugin调用流程</h3>
<p><a href="https://github.com/containerd/cri/blob/release/1.4/docs/architecture.md" target="_blank" rel="noopener noreferrer">Link🔍 <ExternalLinkIcon/></a></p>
<ol>
<li>kubelet调用CRI插件，通过CRI Runtime Service接口创建pod</li>
<li>cri通过CNI接口创建和配置pod的network namespace</li>
<li>cri调用containerd创建sandbox container（<a href="https://www.ianlewis.org/en/almighty-pause-container" target="_blank" rel="noopener noreferrer">pause container<ExternalLinkIcon/></a> ）并将容器放入pod的cgroup和namespace中</li>
<li>kubelet调用CRI插件，通过image service接口拉取镜像，接着通过containerd来拉取镜像</li>
<li>kubelet调用CRI插件，通过runtime service接口运行拉取下来的镜像服务，最后通过containerd来运行业务容器，并将容器放入pod的cgroup和namespace中。</li>
</ol>
<h2 id="k8s对runtime调用的演进" tabindex="-1"><a class="header-anchor" href="#k8s对runtime调用的演进" aria-hidden="true">#</a> k8s对runtime调用的演进</h2>
<p>k3s 也是如此，关于对 Kubernetes 的调用，其中的</p>
<p>由原来通过dockershim调用docker再调用containerd，直接变成通过cri-containerd调用containerd，从而减少了一层docker调用逻辑。</p>
<p><img src="http://sm.cubxxw.com/sm202302071335179.png" alt="image-20230207133512109"></p>
<h3 id="dockershim" tabindex="-1"><a class="header-anchor" href="#dockershim" aria-hidden="true">#</a> dockershim</h3>
<p>这是个被淘汰的家伙。</p>
<p>在旧版本的k8s中，由于docker没有实现CRI接口，因此增加一个Dockershim来实现k8s对docker的调用。（shim：垫片，一般用来表示对第三方组件API调用的适配插件，例如k8s使用Dockershim来实现对docker接口的适配调用）</p>
<p>从 Kubernetes v1.24 开始，Dockershim 已被删除，这对该项目来说是一个积极的举措。然而，上下文对于完全理解某些东西很重要，无论是在社交上还是在软件开发中，这都值得更深入的回顾。除了在 Kubernetes v1.24 中删除 dockershim 之外，我们在社区中看到了一些混乱（有时处于恐慌级别）和对这一决定的不满，这主要是由于缺乏关于此删除的上下文。弃用并最终从 Kubernetes 中删除 dockershim 的决定并不是很快或轻易做出的。尽管如此，它已经存在了很长时间，以至于今天的许多用户比那个决定更新，而且肯定比导致 dockershim 成为必要的选择更新。</p>
<h3 id="cri-o" tabindex="-1"><a class="header-anchor" href="#cri-o" aria-hidden="true">#</a> CRI-O</h3>
<p>cri-o与containerd类似，用来实现容器的管理，可替换containerd的使用。</p>
<p>CRI-O 是一个 Kubernetes 容器运行时，特别为 OCI（Open Container Initiative）容器规范设计的。它的目的是提供一种轻量级、高效的方式来运行容器，同时保持与 Kubernetes 的兼容性。CRI-O 使用 Kubernetes 的 Container Runtime Interface (CRI) 来与 Kubernetes 集群通信，因此可以与 Kubernetes 结合使用，并且能够替代其他常用的容器运行时，如 Docker。</p>
<blockquote>
<p>OCI 是 <a href="https://opencontainers.org/about/overview/" target="_blank" rel="noopener noreferrer">Open Container Initiative<ExternalLinkIcon/></a> 的缩写， 它标准化了容器工具和底层实现之间的大量接口。 它们维护了打包容器镜像（OCI image）和运行时（OCI runtime）的标准规范。 它们还以 <a href="https://github.com/opencontainers/runc" target="_blank" rel="noopener noreferrer">runc<ExternalLinkIcon/></a> 的形式维护了一个 runtime-spec 的真实实现， 这也是 <a href="https://containerd.io/" target="_blank" rel="noopener noreferrer">containerd<ExternalLinkIcon/></a> 和 <a href="https://cri-o.io/" target="_blank" rel="noopener noreferrer">CRI-O<ExternalLinkIcon/></a> 依赖的默认运行时。 CRI 建立在这些底层规范之上，为管理容器提供端到端的标准。</p>
</blockquote>
<h3 id="切换-cri-时-要注意什么" tabindex="-1"><a class="header-anchor" href="#切换-cri-时-要注意什么" aria-hidden="true">#</a> 切换 CRI 时 要注意什么</h3>
<p>虽然 Docker 和大多数 CRI（包括 containerd）之间的底层容器化代码是相同的， 但其周边部分却存在差异。迁移时要考虑如下常见事项：</p>
<ul>
<li>日志配置</li>
<li>运行时的资源限制</li>
<li>调用 docker 或通过其控制套接字使用 Docker Engine 的节点配置脚本</li>
<li>需要 <code v-pre>docker</code> 命令或 Docker Engine 控制套接字的 <code v-pre>kubectl</code> 插件</li>
<li>需要直接访问 Docker Engine 的 Kubernetes 工具（例如：已弃用的 'kube-imagepuller' 工具）</li>
<li>配置 <code v-pre>registry-mirrors</code> 和不安全的镜像仓库等功能</li>
<li>保障 Docker Engine 可用、且运行在 Kubernetes 之外的脚本或守护进程（例如：监视或安全代理）</li>
<li>GPU 或特殊硬件，以及它们如何与你的运行时和 Kubernetes 集成</li>
</ul>
<p>如果你只是用了 Kubernetes 资源 <strong>请求/限制</strong> 或基于文件的日志收集 DaemonSet，它们将继续稳定工作， 但是如果你用了自定义了 dockerd 配置，则可能需要为新的容器运行时做一些适配工作。</p>
<p>另外还有一个需要关注的点，那就是当创建镜像时，系统维护或嵌入容器方面的任务将无法工作。 对于前者，可以用 <a href="https://github.com/kubernetes-sigs/cri-tools" target="_blank" rel="noopener noreferrer"><code v-pre>crictl</code><ExternalLinkIcon/></a> 工具作为临时替代方案 (参阅<a href="https://kubernetes.io/zh-cn/docs/tasks/debug/debug-cluster/crictl/#mapping-from-docker-cli-to-crictl" target="_blank" rel="noopener noreferrer">从 docker cli 到 crictl 的映射<ExternalLinkIcon/></a>)。 对于后者，可以用新的容器创建选项，例如 <a href="https://github.com/genuinetools/img" target="_blank" rel="noopener noreferrer">img<ExternalLinkIcon/></a>、 <a href="https://github.com/containers/buildah" target="_blank" rel="noopener noreferrer">buildah<ExternalLinkIcon/></a>、 <a href="https://github.com/GoogleContainerTools/kaniko" target="_blank" rel="noopener noreferrer">kaniko<ExternalLinkIcon/></a> 或 <a href="https://github.com/vmware-tanzu/buildkit-cli-for-kubectl" target="_blank" rel="noopener noreferrer">buildkit-cli-for-kubectl<ExternalLinkIcon/></a>， 他们都不需要 Docker。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<p><strong>参考：</strong></p>
<ul>
<li>https://opencontainers.org/about/overview/</li>
<li>https://github.com/opencontainers/runtime-spec</li>
<li>https://github.com/kubernetes/kubernetes/blob/242a97307b34076d5d8f5bbeb154fa4d97c9ef1d/docs/devel/container-runtime-interface.md</li>
<li>https://github.com/containerd/containerd/blob/main/docs/cri/architecture.md</li>
<li>https://www.tutorialworks.com/difference-docker-containerd-runc-crio-oci/</li>
<li>https://kubernetes.io/zh/docs/setup/production-environment/container-runtimes/</li>
<li><a href="https://stackoverflow.com/questions/54753515/how-to-build-a-container-image-from-scratch-as-a-non-root-user" target="_blank" rel="noopener noreferrer">use non root OR rootless build image<ExternalLinkIcon/></a></li>
</ul>
<hr>
<ul><li><div><a href = '25.md' style='float:left'>⬆️上一节🔗  </a><a href = '27.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


