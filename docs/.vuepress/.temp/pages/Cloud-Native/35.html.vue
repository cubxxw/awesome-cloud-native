<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第35节-学习、加入开源的阶段性" tabindex="-1"><a class="header-anchor" href="#第35节-学习、加入开源的阶段性" aria-hidden="true">#</a> 第35节 学习、加入开源的阶段性</h1>
<div><a href = '34.md' style='float:left'>⬆️上一节🔗  </a><a href = '36.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<p>✨ 熟悉我的人都知道，我是一名不折不扣的开源爱好者，从大一开始接触到 GitHub 后，逐渐的沉迷于 开源世界 ~ 今天这篇文章很特别，算是自己参考并且总结出来的开源阶段，以及学习开源项目的步骤和心得。未来自己也是按照自己的规划来进行成长。
同<a href="https://www.notion.so/CloudNative-Kubernetes-2f278e98ed274999829333272415c72d" target="_blank" rel="noopener noreferrer">学习 Kubernetes 的成长轨迹<ExternalLinkIcon/></a>一样，这篇文章将会<a href="https://www.notion.so/f8854a0f60d346d98b9eb2ccb6eaef8f" target="_blank" rel="noopener noreferrer">长期更新，也可以参与贡献<ExternalLinkIcon/></a> ~</p>
<p>目前我是处于第一阶段，处于一种对开源世界和对知识的沉淀与积累的过程中，这个阶段的主要表现是我们开始学一些基础。但是我喜欢做笔记将它们记录下来，供自己日后翻阅和复习，当然也是制作自己的内容价值。</p>
<p><a href="https://github.com/cubxxw/cs-awesome-Block_Chain" target="_blank" rel="noopener noreferrer">GitHub - cubxxw/awesome-cs-cloudnative-blockchain: 📚 菜鸟成长手册🚀  CS系列 、云原生系列、区块链系列、web3系列🔥、Golang系列💡......<ExternalLinkIcon/></a></p>
<p>这一阶段，并不是意味着我开始迈入第二阶段，第一阶段就 come to an end.</p>
<p>我认为以下所讲的所有阶段就像是人生轨迹，并不是意味着你当爸爸了就不是父母的孩子，你依旧可以扮演着多种角色，并且不断完善和改进自己的角色。开源项目也是如此，类比我们的成长经历，在后一阶段我依旧会扮演好前一阶段的角色。所以我会坚持做自己的内容创作和知识共享 ~</p>
<blockquote>
<p>✨ 下面开始介绍适合大多数人的开源项目的不同阶段，为了方便定位，我将上面知识积累称呼为 0 阶段知识积累阶段。下面开始从第一阶段开始讲起~</p>
</blockquote>
<h2 id="第一阶段-简单看源码阶段" tabindex="-1"><a class="header-anchor" href="#第一阶段-简单看源码阶段" aria-hidden="true">#</a> 第一阶段：简单看源码阶段</h2>
<aside>
💦 在这一个层次的我们，是一个刚毕业或者没毕业的大学生，又或者是刚刚踏入职场，我们是一个新手，对于开源项目保持一心热血但是不知道从何开始。
   </aside>
<p><strong>方法：</strong> 简单看源码</p>
<p><strong>说明：</strong> 简单看源码、文档、跑跑样例代码</p>
<p><strong>学习效果：</strong> 1 ~ 2</p>
<p><strong>有产出：</strong> 没有产出</p>
<p><strong>是否达成学习闭环：</strong> 尽量问题驱动看源码，从问题出发学源码回归问题，达成闭环</p>
<p><strong>Get 到的技能点</strong>： 阅读源码的技能</p>
<p><strong>案例：</strong> 阅读 sealer、sealos、Kubernetes、k3s、horizoncd 的源码，并且测试</p>
<table>
<thead>
<tr>
<th>阶段</th>
<th>第一阶段：简单看源码阶段</th>
</tr>
</thead>
<tbody>
<tr>
<td>方法</td>
<td>简单看源码</td>
</tr>
<tr>
<td>说明</td>
<td>简单看源码、文档、跑跑样例代码</td>
</tr>
<tr>
<td>学习效果</td>
<td>1 ~ 2</td>
</tr>
<tr>
<td>有产出</td>
<td>没有产出</td>
</tr>
<tr>
<td>是否达成学习闭环</td>
<td>尽量问题驱动看源码，从问题出发学源码回归问题，达成闭环</td>
</tr>
<tr>
<td>技能点</td>
<td>阅读源码的技能</td>
</tr>
<tr>
<td>案例</td>
<td>阅读 sealer、sealos、Kubernetes、k3s、horizoncd 的源码，并且测试</td>
</tr>
</tbody>
</table>
<p>第一阶段的建议是简单地看源码、文档、跑跑样例代码来学习。这个阶段的主要目的是积累基础知识，建议尽量问题驱动看源码，从问题出发学源码回归问题，达成闭环。阅读源码的技能是这个阶段最重要的技能点。建议阅读一些开源项目，例如 sealer、sealos、Kubernetes、k3s、horizoncd 等，并进行测试。</p>
<h2 id="第二阶段-整理源代码" tabindex="-1"><a class="header-anchor" href="#第二阶段-整理源代码" aria-hidden="true">#</a> 第二阶段：整理源代码</h2>
<aside>
💦 在这一阶段的我们很特别，这是跟进一步的学习和整理，效果更好一些、不过也更消耗时间。第二阶段的建议是整理源代码，仔细阅读源代码，整理出项目结构和流程。
</aside>
<ul>
<li><strong>方法：</strong> 整理源代码</li>
<li><strong>说明：</strong> 仔细阅读源代码，整理出项目结构和流程，将所有源代码或者部分源代码整理一遍，包括将包名全部改掉，编译/测试/运行 通过</li>
<li><strong>学习效果：</strong> 2 ~ 3</li>
<li><strong>有产出</strong>：  没有产出（加入没有输出分享）</li>
<li><strong>是否达成学习闭环：</strong> 整理出项目结构和流程后，进行总结和复盘</li>
<li><strong>Get 到的技能点</strong>：整理源代码的能力、更细粒度的源码阅读能力</li>
<li><strong>案例：</strong> 整理出 Kubernetes 的项目结构和流程，对 sealos 项目进行整理和输出。</li>
</ul>
<table>
<thead>
<tr>
<th>阶段</th>
<th>第二阶段：整理源代码</th>
</tr>
</thead>
<tbody>
<tr>
<td>方法</td>
<td>整理源代码</td>
</tr>
<tr>
<td>说明</td>
<td>仔细阅读源代码，整理出项目结构和流程，将所有源代码或者部分源代码整理一遍，包括将包名全部改掉，编译/测试/运行 通过</td>
</tr>
<tr>
<td>学习效果</td>
<td>2 ~ 3</td>
</tr>
<tr>
<td>有产出</td>
<td>整理出项目结构和流程</td>
</tr>
<tr>
<td>是否达成学习闭环</td>
<td>整理出项目结构和流程后，进行总结和复盘</td>
</tr>
<tr>
<td>技能点</td>
<td>整理源代码的能力</td>
</tr>
<tr>
<td>案例</td>
<td>整理出 Kubernetes 的项目结构和流程</td>
</tr>
</tbody>
</table>
<p>第二阶段的建议是整理源代码，仔细阅读源代码，整理出项目结构和流程。这个阶段的主要目的是更深入地了解项目，掌握项目的整体框架和流程。建议整理出项目结构和流程后，进行总结和复盘。整理源代码的能力是这个阶段最重要的技能点。建议整理一些大型的开源项目，例如 Kubernetes，并进行总结和复盘。</p>
<h2 id="第三阶段-整理-输出分享" tabindex="-1"><a class="header-anchor" href="#第三阶段-整理-输出分享" aria-hidden="true">#</a> 第三阶段：整理 + 输出分享</h2>
<aside>
💦 我们在上一阶段已经看到了缺陷，是的我们没有做内容的输出分享。第三阶段相当于是对 第二阶段的补充和升级。第三阶段在第二阶段的基础上总结出源码分析或者是架构设计文档 / PPT，或者是架构图，在个人博客和社区分享。之前有遇到过一个架构师大佬，当初在学习 Istio 这个项目的时候，花了一周的时间对 Envoy 的项目阅读源码并且学习，将所有的笔记整理在 notion，在笔记中整理出系统架构图和设计方案。</aside>
<ul>
<li><strong>方法：</strong> 整理 + 输出分享</li>
<li><strong>说明：</strong> 总结出源码分析、架构设计文档/PPT或架构图，并在个人博客和社区分享。</li>
<li><strong>学习效果：</strong> 3 ~ 5</li>
<li><strong>有产出：</strong> 有产出，如博客文章、PPT、架构图等</li>
<li><strong>是否达成学习闭环：</strong> 输出分享后，进行总结和复盘</li>
<li><strong>Get 到的技能点：</strong> 输出分享的能力、更深入的源码阅读能力、技术、整理、输出和分享能力。</li>
<li><strong>案例：</strong> 总结出 Envoy 的系统架构图和设计方案，并在个人博客和社区分享。画出 sealer 、 sealos 的系统设计和架构方案，Push 到个人博客和社区。Youtube 上也有很多做内容分享的，其中的过程特别特别值得参考和学习。</li>
</ul>
<table>
<thead>
<tr>
<th>阶段</th>
<th>第三阶段：整理 + 输出分享</th>
</tr>
</thead>
<tbody>
<tr>
<td>方法</td>
<td>整理 + 输出分享</td>
</tr>
<tr>
<td>说明</td>
<td>总结出源码分析、架构设计文档/PPT或架构图，并在个人博客和社区分享</td>
</tr>
<tr>
<td>学习效果</td>
<td>3 ~ 5</td>
</tr>
<tr>
<td>有产出</td>
<td>有产出，如博客文章、PPT、架构图等</td>
</tr>
<tr>
<td>是否达成学习闭环</td>
<td>输出分享后，进行总结和复盘</td>
</tr>
<tr>
<td>技能点</td>
<td>输出分享的能力、更深入的源码阅读能力、技术、整理、输出和分享能力。</td>
</tr>
<tr>
<td>案例</td>
<td>总结出 Envoy 的系统架构图和设计方案，并在个人博客和社区分享。</td>
</tr>
</tbody>
</table>
<p>第三阶段的建议是总结出源码分析、架构设计文档/PPT或架构图，并在个人博客和社区分享。这个阶段的主要目的是通过输出分享来巩固自己的知识，并为其他人提供帮助。输出分享的能力是这个阶段最重要的技能点。建议总结一些大型的开源项目，例如 Envoy，并进行输出分享，在分享的过程中不断总结和复盘，加深对项目的理解。</p>
<p>⚠️ 这个过程还可以配合视频讲解，我提供一个方案，在阅读源码后写出自己的阅读笔记，总结出自己的阅读笔记，画出架构图和思维导图，在 bilibili OR youtube 上进行讲解，这样印象更加深刻。建议每个月都对一个开源项目进行一次源码的解析文章，并且发表在 个人博客 和 GitHub 中。我觉得这个习惯是非常不错的。</p>
<h2 id="第四阶段-开发克隆版" tabindex="-1"><a class="header-anchor" href="#第四阶段-开发克隆版" aria-hidden="true">#</a> 第四阶段：开发克隆版</h2>
<aside>
💦 这个阶段就很好理解了，比如说 sealos 从 sealer 分割出来。当然远远不止这些，包括很多二次开发项目，用 Go语言 重构 Java、 用 Go语言 重构 PHP。我们把这些重构的项目可以开源并且分享到社区（GitHub） 中。
</aside>
<ul>
<li><strong>方法：</strong> 开发克隆版</li>
<li><strong>说明：</strong> 开发自己的克隆版，如 sealos 从 sealer 分割出来。开源并且分享到社区（GitHub） 中。用 Go语言 重构 Java 项目或者是 PHP 项目，或者项目模仿开发~</li>
<li><strong>学习效果：</strong> 5 ~ 10</li>
<li><strong>有产出：</strong> 有产出，如开源项目、GitHub 项目等</li>
<li><strong>是否达成学习闭环：</strong> 开源并且分享到社区后，进行总结和复盘</li>
<li><strong>Get 到的技能点：</strong> 独立开发能力、深度对源码的阅读和理解，技术、项目开发技能</li>
<li><strong>案例：</strong> 开发自己的克隆版，如 sealos 从 sealer 分割出来。开源并且分享到社区（GitHub） 中。再比如说 k3s 也是 对 Kubernetes 发行版的精炼。</li>
</ul>
<table>
<thead>
<tr>
<th>阶段</th>
<th>第四阶段：开发克隆版</th>
</tr>
</thead>
<tbody>
<tr>
<td>方法</td>
<td>开发克隆版</td>
</tr>
<tr>
<td>说明</td>
<td>开发自己的克隆版，如 sealos 从 sealer 分割出来。开源并且分享到社区（GitHub） 中。用 Go语言 重构 Java 项目或者是 PHP 项目，或者项目模仿开发~</td>
</tr>
<tr>
<td>学习效果</td>
<td>5 ~ 10</td>
</tr>
<tr>
<td>有产出</td>
<td>有产出，如开源项目、GitHub 项目等</td>
</tr>
<tr>
<td>是否达成学习闭环</td>
<td>开源并且分享到社区后，进行总结和复盘</td>
</tr>
<tr>
<td>技能点</td>
<td>独立开发能力、深度对源码的阅读和理解，技术、项目开发技能</td>
</tr>
<tr>
<td>案例</td>
<td>开发自己的克隆版，如 sealos 从 sealer 分割出来。开源并且分享到社区（GitHub） 中</td>
</tr>
</tbody>
</table>
<p>第四阶段的建议是开发自己的克隆版，如 sealos 从 sealer 分割出来。这个阶段的主要目的是通过独立开发项目来巩固自己的知识，并且为其他人提供帮助。有时候我们觉得某个项目并不简单，比如说  <a href="https://github.com/cubxxw/iam" target="_blank" rel="noopener noreferrer">iam<ExternalLinkIcon/></a> 项目，项目很优质，我们可以进行再次开发，从而深入学习 iam 的项目设计。</p>
<h2 id="第五阶段-生产化落地" tabindex="-1"><a class="header-anchor" href="#第五阶段-生产化落地" aria-hidden="true">#</a> 第五阶段：生产化落地</h2>
<aside>
💦 这个阶段就是处于一个高层了，源码经过整理输出，并且能够生产化落地，在公司中也能承担业务流量，并且能根据业务需要进行定制或者自研。这个阶段学习的效果是非常好的，我们通过企业级项目实战经验学习到的一般都能让我们终身难忘。
</aside>
<ul>
<li>学习如何对项目进行性能优化，如何提高项目的稳定性和可靠性</li>
<li>学习如何进行容器化部署和管理，如 Kubernetes</li>
<li>学习如何进行持续集成和持续部署，如 Jenkins、GitLab CI/CD、Travis CI 等</li>
<li>学习如何进行监控和日志分析，如 Prometheus、Grafana、ELK 等</li>
<li>学习如何进行安全防护和漏洞修复，如 OWASP Top 10、云原生安全等</li>
</ul>
<p>建议通过实际项目来进行学习，例如可以参与公司的项目实施，或者通过个人项目来进行实践。在实践过程中，可以不断总结和复盘，加深对知识的理解和掌握。</p>
<p>最后，要注意在实际项目中遵循规范和标准，如代码规范、安全规范、架构规范等。同时也要注重团队协作和沟通，与同事进行交流和分享，不断提升自己的技能和能力。</p>
<table>
<thead>
<tr>
<th>阶段</th>
<th>第五阶段：生产化落地</th>
</tr>
</thead>
<tbody>
<tr>
<td>方法</td>
<td>实际项目实践</td>
</tr>
<tr>
<td>说明</td>
<td>将学到的知识应用到实际生产中，通过企业级项目实战经验来巩固和提升自己的技能</td>
</tr>
<tr>
<td>学习效果</td>
<td>10+</td>
</tr>
<tr>
<td>有产出</td>
<td>有产出，如企业级项目实战经验、性能优化、容器化部署和管理、持续集成和持续部署、监控和日志分析、安全防护和漏洞修复等</td>
</tr>
<tr>
<td>是否达成学习闭环</td>
<td>在实践过程中不断总结和复盘</td>
</tr>
<tr>
<td>技能点</td>
<td>实际项目实践能力、性能优化、容器化部署和管理、持续集成和持续部署、监控和日志分析、安全防护和漏洞修复等</td>
</tr>
<tr>
<td>案例</td>
<td>参与公司的项目实施、通过个人项目来进行实践</td>
</tr>
</tbody>
</table>
<p>这个阶段的主要目的是将学到的知识应用到实际生产中，并且能够根据业务需要进行定制或自研。建议在公司中承担业务流量，通过企业级项目实战经验来巩固和提升自己的技能。</p>
<p>👀 当然这个阶段，生产化落地的时候，我们肯定要对开源项目进行深度的定制，并没有完美并且最适合业务的项目，这个过程需要我们不断地去探索。这个过程中我们可以吸收到很多牛人的经验，比如说在监控领域、Kubernetes 的网络、可观测性方向的大佬对开源项目不断研究的过程，并且研究出自己的开源项目，这是非常不容易的，这个过程可以帮助你成为国内 ××领域顶级专家。</p>
<h2 id="第六阶段-开发知识产品" tabindex="-1"><a class="header-anchor" href="#第六阶段-开发知识产品" aria-hidden="true">#</a> 第六阶段：开发知识产品</h2>
<aside>
💦 第六阶段更通俗来说也是和第五阶段在同一层次的，第六阶段将开源项目完全吸收的情况下，开发克隆项目、或者开发开源应用演示项目，并且制作成付费产品（视频 / 书籍 / 文档），发布到开源社区。
</aside>
<p>这个阶段的目标是将自己学到的知识转化为实际的产品，并且通过分享来帮助其他人。建议开发一些实用的工具或者演示项目，例如 Kubernetes 集群部署工具、云原生应用示例项目等。制作产品的过程中，需要注意产品的质量和用户体验，同时也要注重宣传和推广，将产品推向更广泛的用户群体。</p>
<p>在实际制作产品的过程中，可以不断总结和复盘，加深对知识的理解和掌握。同时也要注意与其他开源社区成员的交流和合作，不断提升自己的技能和能力，让自己成为开源社区的中坚力量。</p>
<table>
<thead>
<tr>
<th>阶段</th>
<th>第六阶段：开发知识产品</th>
</tr>
</thead>
<tbody>
<tr>
<td>方法</td>
<td>开发克隆项目或者开源应用演示项目，并将其制作成付费产品（视频/书籍/文档）</td>
</tr>
<tr>
<td>说明</td>
<td>将自己学到的知识转化为实际的产品，并通过分享来帮助其他人</td>
</tr>
<tr>
<td>学习效果</td>
<td>10+</td>
</tr>
<tr>
<td>有产出</td>
<td>有产出，如付费视频、付费书籍、付费文档等</td>
</tr>
<tr>
<td>是否达成学习闭环</td>
<td>制作产品的过程中不断总结和复盘</td>
</tr>
<tr>
<td>技能点</td>
<td>产品设计和制作能力、宣传和推广能力、交流和合作能力</td>
</tr>
<tr>
<td>案例</td>
<td>开发 Kubernetes 集群部署工具、云原生应用示例项目等</td>
</tr>
</tbody>
</table>
<p>💡 这个阶段我们不仅仅获取到了知识产品设计和开发技能，同样还有无形的财富，比如说行业影响力。</p>
<h2 id="第七阶段-开发自己的开源项目" tabindex="-1"><a class="header-anchor" href="#第七阶段-开发自己的开源项目" aria-hidden="true">#</a> 第七阶段：开发自己的开源项目</h2>
<aside>
💦 第七阶段在国内可能很少见到，但是其实在欧美国家很常见，国内开源氛围不是很浓厚。第七阶段 是一个需要慢慢沉淀的阶段，前期需要大量的积累，在 吸收开源项目 + 企业落地实践的基础上，沉淀出自己的开源项目，并且持续推动开源社区的建设。
</aside>
<ul>
<li><strong>方法：</strong> 开发自己的开源项目</li>
<li><strong>说明：</strong> 在吸收开源项目 + 企业落地实践的基础上，沉淀出自己的开源项目，并且持续推动开源社区的建设。</li>
<li><strong>学习效果：</strong> 10+</li>
<li><strong>有产出：</strong> 有产出，如开源项目、GitHub 项目等、有社区反馈（issue），有持续改进（PR）</li>
<li><strong>是否达成学习闭环：</strong> 持续推动开源社区的建设，进行总结和复盘</li>
<li><strong>Get 到的技能点：</strong> 独立开发能力、深度对源码的阅读和理解、项目开发技能、开源社区管理和推广等， <strong>当然还有更多的是行业影响力，跳槽的最佳姿势（GitHub is your resume, let HR find you !)</strong></li>
<li><strong>案例：</strong> 开发自己的开源项目，如很牛逼的 <a href="https://github.com/labring/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a> 项目发起人 方海涛， 在 Cloud Native 领域有很高的知名度。</li>
</ul>
<table>
<thead>
<tr>
<th>阶段</th>
<th>第七阶段：开发自己的开源项目</th>
</tr>
</thead>
<tbody>
<tr>
<td>方法</td>
<td>开发自己的开源项目</td>
</tr>
<tr>
<td>说明</td>
<td>在吸收开源项目 + 企业落地实践的基础上，沉淀出自己的开源项目，并且持续推动开源社区的建设。</td>
</tr>
<tr>
<td>学习效果</td>
<td>10+</td>
</tr>
<tr>
<td>有产出</td>
<td>有产出，如开源项目、GitHub 项目等</td>
</tr>
<tr>
<td>是否达成学习闭环</td>
<td>持续推动开源社区的建设，进行总结和复盘</td>
</tr>
<tr>
<td>技能点</td>
<td>独立开发能力、深度对源码的阅读和理解、项目开发技能、开源社区管理和推广等</td>
</tr>
<tr>
<td>案例</td>
<td>开发自己的开源项目，如很牛逼的https://github.com/labring/sealos项目发起人 方海涛， 在 Cloud Native 领域有很高的知名度。</td>
</tr>
</tbody>
</table>
<p>这个阶段的主要目的是沉淀出自己的开源项目，并且持续推动开源社区的建设。在此过程中，需要不断地学习和掌握独立开发能力、深度对源码的阅读和理解、项目开发技能，以及开源社区管理和推广等方面的技能点。</p>
<p>建议通过吸收开源项目和企业落地实践的经验，进行总结和复盘，沉淀出自己的开源项目。在开源社区中推广和维护自己的项目，不断提升自己的技能和能力，并且为开源社区的建设做出贡献。</p>
<p>😏 再比如说这里还有一个知名大佬，吴晟，参考他的博客：<a href="https://wu-sheng.github.io/me/" target="_blank" rel="noopener noreferrer">https://wu-sheng.github.io/me/<ExternalLinkIcon/></a>，以及他的 GitHub 地址：https://github.com/wu-sheng/me</p>
<h2 id="第八阶段-商业化自己的开源项目" tabindex="-1"><a class="header-anchor" href="#第八阶段-商业化自己的开源项目" aria-hidden="true">#</a> 第八阶段：商业化自己的开源项目</h2>
<aside>
💦 到这个阶段，是非常非常困难的，sealos 目前正在处于这一阶段，docker 是这个阶段的成功案例，更多的还有 TiDB、Kafka 等等，在这一阶段的回报率特别高，100 + ，有完全的产出和企业客户闭环。在自己的开源项目产品基础上，持续推进社区生态建设，并且逐渐走向商业化服务道路。
</aside>
<table>
<thead>
<tr>
<th>阶段</th>
<th>第八阶段：商业化自己的开源项目</th>
</tr>
</thead>
<tbody>
<tr>
<td>方法</td>
<td>在自己的开源项目产品基础上，持续推进社区生态建设，并且逐渐走向商业化服务道路</td>
</tr>
<tr>
<td>说明</td>
<td>利用开源项目为核心，打造商业化产品和服务，为用户提供高质量、可靠的解决方案</td>
</tr>
<tr>
<td>学习效果</td>
<td>100+</td>
</tr>
<tr>
<td>有产出</td>
<td>有完全的产出和企业客户闭环</td>
</tr>
<tr>
<td>是否达成学习闭环</td>
<td>持续推进社区生态建设</td>
</tr>
<tr>
<td>技能点</td>
<td>商业化运营能力、项目管理能力、团队协作和领导能力</td>
</tr>
<tr>
<td>案例</td>
<td>TiDB、Kafka 等等</td>
</tr>
</tbody>
</table>
<p>这个阶段是比较困难的，需要在前几个阶段的基础上不断地积累、总结和沉淀。在自己的开源项目产品基础上，持续推进社区生态建设，并且逐渐走向商业化服务道路。利用开源项目为核心，打造商业化产品和服务，为用户提供高质量、可靠的解决方案。</p>
<p>在这个阶段中，需要不断提升自己的商业化运营能力、项目管理能力、团队协作和领导能力等方面的技能点。需要建立高效的团队协作机制，同时注重项目管理和风险控制，确保商业化服务的高质量和可靠性。</p>
<p>在商业化服务的过程中，需要注重用户体验和客户服务，建立良好的用户关系，不断改进和优化产品和服务。同时还需要积极参与开源社区的建设和推广，为开源社区的发展做出贡献。</p>
<p>这个阶段的回报率非常高，有完全的产出和企业客户闭环，达到了100+的学习效果。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>这篇文章详细介绍了从学习开源到商业化的八个阶段，让你逐步成为开源领域的大佬。但是，如果你认为这是一条轻松愉快的道路，那你就大错特错了。这个过程需要不断的学习和总结，以及对知识的深度理解。但是，如果你能一步步走到商业化阶段，那么回报肯定是非常可观的。总之，跨越这八个阶段需要勇气、毅力和耐心，但是这个过程也会让你成为行业中的佼佼者。</p>
<aside>
⚠️ 1. 输出要有输出，学习要有产出。
2. 闭环反馈 + 持续改进，用户越多，反馈越多，学习效果越好。最好你的学习效果能够量化。
3. 如果你要真正的理解某个 人 / 物，那么你就要尝试改变 他/她/它 ，学习开源项目也是这样。
4. 要一举多得，投入时间 →  有价值产出 → 个人沉淀积累 → 社区贡献 → 提升影响力 → 真正学到东西。</aside>
<p>这个周期会更长，即使我是从大一开始准备的，也依旧遥不可及。我一直在探索 复利曲线 的那个拐点~</p>
<p>对于我们来说，不管是谋事在人，成事在天。又或者是 谋事在天，成事在人，我们现在处于一个大背景的时代，可以兼容各类各样的人才，硬实力（技术）代表着硬性指标。包括更多的软实力，比如：能力、情商（沟通力、影响力、领导力）。在这个架构上，影响这一因素的包括我们的三观：人生观、价值观、世界观。从而影响我们的格局（眼界+行动力 + 胸襟、胆识、等心理要素的内在布局）和人脉~</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '34.md' style='float:left'>⬆️上一节🔗  </a><a href = '36.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


