<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第73节-微服务与治理篇" tabindex="-1"><a class="header-anchor" href="#第73节-微服务与治理篇" aria-hidden="true">#</a> 第73节 微服务与治理篇</h1>
<div><a href = '72.md' style='float:left'>⬆️上一节🔗  </a><a href = '74.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="什么是微服务" tabindex="-1"><a class="header-anchor" href="#什么是微服务" aria-hidden="true">#</a> 什么是微服务</h2>
<h3 id="微服务起源" tabindex="-1"><a class="header-anchor" href="#微服务起源" aria-hidden="true">#</a> 微服务起源</h3>
<p>你是不是经常听到别人在讲 SOA（面向服务的架构模式）它和微服务又是什么关系？</p>
<p>SOA你可以把微服务想成是 SOA 的一种实践。微服务架构有如下几个特点:</p>
<ul>
<li>
<p>小即是美：小的服务代码少，bug 也少，易测试，易维护，也更容易不断迭代完善的精致进而美妙。</p>
</li>
<li>
<p>单一职责：一个服务也只需要做好一件事，专注才能做好。</p>
</li>
<li>
<p>尽可能早地创建原型：尽可能早的提供服务 API，建立服务契约，达成服务间沟通的一致性约定，至于实现和完善可以慢慢再做。</p>
</li>
<li>
<p>可移植性比效率更重要：服务间的轻量级交互协议在效率和可移植性二者间，首要依然考虑兼容性和移植性。</p>
</li>
</ul>
<h3 id="什么是微服务-1" tabindex="-1"><a class="header-anchor" href="#什么是微服务-1" aria-hidden="true">#</a> 什么是微服务</h3>
<p><strong>微服务（Microservices）</strong> 是一种软件开发技术和组织方法。专业地讲，微服务架构是一种将一个单一应用程序设计为一组小的、松耦合的、单一功能的服务，这些服务可以独立地开发、部署和扩展。每个微服务都运行在其自己的进程中，并与其他服务通过通常是轻量级的通讯机制（如 HTTP/REST、gRPC等）进行通讯。</p>
<p>为了更好地理解和识别Go语言项目是否为微服务项目，以下是一些指标：</p>
<ol>
<li><strong>模块化和解耦</strong>: 如果一个Go项目被拆分成了多个独立的、可独立部署和扩展的服务，则它很可能是微服务项目。</li>
<li><strong>通讯机制</strong>: 微服务通常使用HTTP/REST、gRPC或其他轻量级通讯机制进行相互通讯。如果你在项目中看到类似的通讯方式，这也是一个指标。</li>
<li><strong>独立部署</strong>: 每个微服务都可以独立于其他服务部署。这意味着每个服务可能都有自己的Docker容器、Kubernetes部署配置等。</li>
<li><strong>数据库解耦</strong>: 在微服务架构中，通常推荐每个服务都有自己的私有数据库，而不是所有服务共享一个数据库。</li>
<li><strong>服务发现</strong>: 由于微服务环境中的服务数量可能会很多，因此服务发现机制（如Consul、etcd、Zookeeper等）是很常见的。</li>
<li><strong>弹性和容错</strong>: 微服务通常设计为可以应对失败的。这意味着你可能会看到像断路器（Circuit Breaker）这样的模式，或者使用Hystrix、Resilience4j等库。</li>
<li><strong>配置中心</strong>: 微服务通常需要动态配置，因此配置中心（如Spring Cloud Config Server、Consul KV）也是常见的组件。</li>
<li><strong>日志和监控</strong>: 由于微服务涉及到多个独立服务的交互，集中的日志和监控系统（如ELK堆栈、Prometheus、Grafana等）也是常见的。</li>
</ol>
<p>其实可以这样理解。微服务本质等同于，多个微服务组合（compose）完成了一个完整的用户场景。</p>
<p>而微服务，让业务更加解耦，（You build it, you fix it）</p>
<p><strong>大前端（移动端/web/Android） –&gt;  网关接入 –&gt;  业务服务 –&gt;  平台服务 –&gt;  基础设施（Pass/Saas)</strong></p>
<p>开发团队对软件在生产的环境的运行负全部责任。</p>
<h2 id="微服务的去中心化" tabindex="-1"><a class="header-anchor" href="#微服务的去中心化" aria-hidden="true">#</a> 微服务的去中心化</h2>
<p>每一个服务面临的业务场景不同，可以针对性的选择合适的技术解决方案，但也需要避免过度多样化，需要结合团队的实际情况取舍。</p>
<ol>
<li><strong>数据去中心化</strong>:
<ul>
<li>每个微服务通常都有自己的数据库或数据存储，这意味着每个服务管理并控制自己的数据。这种去中心化的数据管理方法避免了多个服务访问同一数据库实例的复杂性。</li>
</ul>
</li>
<li><strong>代码和服务去中心化</strong>:
<ul>
<li>微服务推崇每个服务应该独立于其他服务进行开发、部署和扩展。这种去中心化的方式意味着团队可以独立地工作在自己的服务上，而不会影响其他服务。</li>
</ul>
</li>
<li><strong>去中心化的团队结构</strong>:
<ul>
<li>微服务通常鼓励建立跨功能的团队，每个团队负责一个或多个服务的完整生命周期。这些团队有权决定技术、工具和实践，这种组织结构进一步推动了去中心化的思想。</li>
</ul>
</li>
<li><strong>去中心化的治理</strong>:
<ul>
<li>由于每个微服务团队可以选择最适合其服务的技术栈，因此微服务环境可能包含多种语言、框架和工具。这与传统的中心化治理方法不同，后者通常要求所有应用程序或服务使用同一组技术。</li>
</ul>
</li>
<li><strong>去中心化的服务发现</strong>:
<ul>
<li>在微服务环境中，由于服务数量可能会非常多，所以通常需要动态的服务发现机制，如Consul、etcd或Zookeeper，而不是静态的、中心化的服务注册。</li>
</ul>
</li>
<li><strong>去中心化的决策制定</strong>:
<ul>
<li>微服务鼓励团队根据他们对自己的服务的理解来做决策，这与传统的顶级决策制定方式形成对比。</li>
</ul>
</li>
</ol>
<h2 id="基础设施的自动化" tabindex="-1"><a class="header-anchor" href="#基础设施的自动化" aria-hidden="true">#</a> 基础设施的自动化</h2>
<p>在微服务架构中，基础设施的自动化是至关重要的。随着服务数量的增加，手动管理和部署每个服务将变得既费时又容易出错。因此，自动化不仅可以提高生产效率，还可以降低错误率和提高系统的可靠性。</p>
<p>以下是微服务中基础设施自动化的一些关键方面：</p>
<ol>
<li><strong>容器化</strong>:
<ul>
<li>使用工具如Docker，将服务容器化可以确保一致性和可移植性，从开发到生产环境。</li>
</ul>
</li>
<li><strong>容器编排</strong>:
<ul>
<li>使用Kubernetes、Docker Swarm或Amazon ECS等工具来自动化容器部署、管理和扩展。</li>
</ul>
</li>
<li><strong>持续集成/持续部署 (CI/CD)</strong>:
<ul>
<li>使用Jenkins、GitLab CI、CircleCI等工具自动化代码构建、测试和部署流程。</li>
</ul>
</li>
<li><strong>配置管理</strong>:
<ul>
<li>使用Ansible、Puppet、Chef或SaltStack等工具自动化配置管理，确保所有环境中的配置是一致的。</li>
</ul>
</li>
<li><strong>服务发现与注册</strong>:
<ul>
<li>使用Consul、etcd或Zookeeper等工具自动化服务的注册和发现，确保服务间的通信是流畅的。</li>
</ul>
</li>
<li><strong>网络和负载均衡</strong>:
<ul>
<li>使用工具如Istio、Linkerd或Traefik自动化服务间的网络流量管理和负载均衡。</li>
</ul>
</li>
<li><strong>日志管理和监控</strong>（ELK）:
<ul>
<li>使用ELK堆栈（Elasticsearch、Logstash、Kibana）或Prometheus和Grafana等工具自动化日志收集、分析和监控。</li>
</ul>
</li>
<li><strong>测试环境的搭建（单元测试、集群测试、API 自动化测试）</strong></li>
<li><strong>自动扩展和自我修复</strong>:
<ul>
<li>使用Kubernetes的Horizontal Pod Autoscaling或其他相似工具自动化服务的扩展和修复。</li>
</ul>
</li>
<li><strong>基础设施即代码 (Infrastructure as Code, IaC)</strong>:
<ul>
<li>使用Terraform、CloudFormation或Pulumi等工具将基础设施的定义和配置编写为代码，从而实现完全的自动化部署和管理。</li>
</ul>
</li>
<li><strong>安全自动化</strong>:
<ul>
<li>使用工具如Vault进行秘钥和凭证的管理，以及自动化的安全策略和规则应用。</li>
</ul>
</li>
</ol>
<h2 id="微服务中可用性和兼容性设计" tabindex="-1"><a class="header-anchor" href="#微服务中可用性和兼容性设计" aria-hidden="true">#</a> 微服务中可用性和兼容性设计</h2>
<h3 id="可用性设计" tabindex="-1"><a class="header-anchor" href="#可用性设计" aria-hidden="true">#</a> 可用性设计:</h3>
<ol>
<li><strong>服务冗余</strong>: 对关键服务进行多实例部署，这样当一个实例失败时，其他实例可以继续提供服务。</li>
<li><strong>健康检查</strong>: 使用健康检查端点来定期监测服务状态，以及及时删除不健康的实例。</li>
<li><strong>断路器模式</strong>: 当服务出现问题时，使用断路器防止雪崩效应，允许服务有时间恢复。</li>
<li><strong>超时和重试</strong>: 设置合理的超时和在合适的情况下自动重试，以增加对瞬时故障的容错性。</li>
<li><strong>负载均衡</strong>: 使用负载均衡器分散请求，确保流量均匀分配到各个服务实例。</li>
<li><strong>数据备份和恢复</strong>: 定期备份数据，并确保在数据丢失或损坏时可以快速恢复。</li>
<li><strong>故障转移</strong>: 在多个地理区域部署服务，当一个区域出现问题时，流量可以转移到其他健康的区域。</li>
</ol>
<h3 id="兼容性设计" tabindex="-1"><a class="header-anchor" href="#兼容性设计" aria-hidden="true">#</a> 兼容性设计:</h3>
<ol>
<li><strong>后向兼容性</strong>: 当为服务添加新功能或修改现有功能时，确保新版本不会破坏与旧版本的互操作性。</li>
<li><strong>版本控制</strong>: 使用明确的版本号来标识服务API的变更，这可以帮助消费者知道他们所依赖的API版本。</li>
<li><strong>渐进式部署</strong>: 通过如金丝雀部署或蓝绿部署来逐步推出新版本，确保新版本的稳定性再进行全面部署。</li>
<li><strong>契约测试</strong>: 定期测试服务之间的交互，确保它们遵循预期的契约或API规范。</li>
<li><strong>API网关</strong>: 使用API网关来管理和路由请求，同时提供API版本管理、请求转换等功能，以确保不同版本之间的兼容性。</li>
<li><strong>避免数据库模式的破坏性变更</strong>: 当需要修改数据库模式时，使用添加字段或表的方式，而避免删除或更改现有结构，这样可以确保数据的向后兼容性。</li>
<li><strong>弃用策略</strong>: 当需要弃用某个API或功能时，提供明确的通知和足够的过渡时间，允许消费者进行必要的调整。</li>
</ol>
<h2 id="api-gateway" tabindex="-1"><a class="header-anchor" href="#api-gateway" aria-hidden="true">#</a> API Gateway</h2>
<p>微服务架构是一个设计方法，在这种架构中，应用程序由多个小而松散耦合的服务组成，每个服务都负责一个特定的业务功能。而在微服务架构中，API Gateway是一个核心组件，它充当了所有服务的统一入口。</p>
<p>以下是关于API Gateway在微服务中的几个主要角色和特点：</p>
<ol>
<li><strong>请求路由</strong>：API Gateway负责将客户端的请求路由到适当的微服务。例如，一个客户端请求可能需要从几个不同的服务中检索数据，API Gateway将会负责将这些请求指向正确的服务。</li>
<li><strong>负载均衡</strong>：API Gateway可以负责将请求分散到多个服务实例之间，从而提供负载均衡。</li>
<li><strong>认证与授权</strong>：通常，只有API Gateway直接与客户端通信。因此，它可以负责处理认证和授权的功能，然后将已验证和已授权的请求传递给下游的微服务。</li>
<li><strong>请求与响应的转换</strong>：API Gateway可以转换请求和响应的格式，以适应特定的客户端或后端服务的需要。</li>
<li><strong>限速与配额管理</strong>：为了保护微服务不被过度的请求所淹没，API Gateway可以为每个客户端或API键设置速率限制或配额。</li>
<li><strong>缓存</strong>：API Gateway可以缓存请求的结果，从而减少对下游服务的负载并加速响应时间。</li>
<li><strong>服务发现</strong>：随着微服务的数量增加和减少，API Gateway可以与服务发现系统（例如Consul或Eureka）集成，动态地知道哪些服务是活跃的，并将请求路由到这些服务。</li>
<li><strong>监控与日志</strong>：API Gateway可以记录所有进出的请求和响应，这样在进行性能监测、调试或审计时，将会非常有用。</li>
<li><strong>故障隔离和断路器模式</strong>：API Gateway可以实现断路器模式，当下游的服务变得不稳定或响应时间变长时，它可以阻止对该服务的进一步请求，从而防止故障的蔓延。</li>
</ol>
<p>当选择或设计一个API Gateway时，应考虑其与其他组件、如服务发现、配置中心、监控和日志系统的集成能力。市面上已有多种API Gateway解决方案，如Kong、Apigee、AWS API Gateway等。</p>
<p>随着系统的增长，一个单一的 API Gateway 可能会遇到性能、管理和开发瓶颈。在这种情况下，您可能会考虑将 API Gateway 拆分为多个更小、更专注的 Gateway。这种策略可以帮助组织更好地缩放其微服务架构，并允许不同的团队或服务拥有自己的专用 Gateway。</p>
<ol>
<li><strong>按业务领域拆分</strong>：如果您的系统是按业务领域划分的，您可以为每个业务领域创建一个专用的 Gateway。这样，每个领域的团队都可以管理其自己的 Gateway，并根据其特定需求进行优化。</li>
<li><strong>按功能拆分</strong>：例如，可以有一个专门处理身份验证和授权的 Gateway，另一个处理数据转换和缓存，另一个处理特定的业务逻辑等。</li>
<li><strong>按客户端类型或用户群体拆分</strong>：如果您有多种客户端（例如 web、移动、IoT 设备等），您可以为每种客户端类型创建一个专用的 Gateway。这允许为特定的客户端或用户群体优化性能和功能。</li>
<li><strong>地理位置拆分</strong>：对于全球分布的用户，您可以在不同的地理位置部署多个 API Gateway，以减少延迟并满足特定地区的合规性和数据主权要求。</li>
<li><strong>按流量或容量拆分</strong>：如果某些服务比其他服务的流量或数据负载要大，考虑为这些高流量的服务设置单独的 Gateway。</li>
<li><strong>混合策略</strong>：您还可以结合上述策略，为系统创建多个层次或类型的 Gateway。</li>
</ol>
<h2 id="grpc-服务发现" tabindex="-1"><a class="header-anchor" href="#grpc-服务发现" aria-hidden="true">#</a> gRPC &amp; 服务发现</h2>
<p>我们的 微服务 之前的通信肯定是需要轻量级的，之前我们的各个微服务之前主要是 http，http 会有很大的问题，两个服务之间通过 http，节点之间有服务发现，A 在 Kubernetes 中注册到 Consul，B 也在 Kubernetes 中注册到 Consul。当 A 想要与 B 通信时，它首先需要询问 Consul：“B 在哪里？” Consul 会返回 B 的地址，然后 A 才能开始与 B 通信。这种机制确实有效，但它也引入了很多不必要的网络开销，特别是当服务数量众多时。</p>
<p>此外，HTTP 协议的问题不仅限于服务发现。HTTP 是一种基于文本的协议，它的通信效率不如二进制协议。而且，HTTP 处理错误的方式和重试机制也不适合所有的微服务场景。此外，HTTP/1.1 协议不支持真正的并发，每个请求都需要一个单独的连接。</p>
<p>为了解决这些问题，gRPC 成为了一个非常受欢迎的选择。gRPC 是一个高性能、开源的远程过程调用 (RPC) 框架，由 Google 开发。gRPC 使用 Protocol Buffers（简称 Protobuf）作为其接口描述语言，它是一种语言中立、平台中立、可扩展的序列化结构数据的协议。</p>
<p>与 HTTP 相比，gRPC 的优势如下：</p>
<ol>
<li><strong>效率</strong>: 由于使用 Protobuf 和二进制协议，gRPC 的数据传输效率非常高。</li>
<li><strong>并发</strong>: gRPC 基于 HTTP/2，支持真正的并发和多路复用。</li>
<li><strong>流</strong>: gRPC 支持双向流，允许客户端和服务器互相发送消息流。</li>
<li><strong>错误处理</strong>: gRPC 有内置的错误处理机制，更易于调试和处理错误。</li>
</ol>
<p>当涉及到服务发现时，gRPC 可以和 Consul、Kubernetes 或其他服务发现工具轻松集成。通过利用 gRPC 的内置负载均衡器和健康检查功能，服务发现变得更为强大和灵活。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '72.md' style='float:left'>⬆️上一节🔗  </a><a href = '74.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


