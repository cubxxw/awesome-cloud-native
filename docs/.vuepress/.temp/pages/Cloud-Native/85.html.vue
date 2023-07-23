<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第85节-devops-openim-的标准设计-1" tabindex="-1"><a class="header-anchor" href="#第85节-devops-openim-的标准设计-1" aria-hidden="true">#</a> 第85节 DevOps OpenIM 的标准设计 (1)</h1>
<div><a href = '84.md' style='float:left'>⬆️上一节🔗  </a><a href = '86.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="devops" tabindex="-1"><a class="header-anchor" href="#devops" aria-hidden="true">#</a> DevOps</h2>
<p><a href="https://en.wikipedia.org/wiki/DevOps" target="_blank" rel="noopener noreferrer">DevOps<ExternalLinkIcon/></a></p>
<p>🔥 DevOps是一种软件开发和运营的文化和方法论，旨在通过自动化和协作来缩短软件开发周期和提高软件质量。</p>
<p><strong>DevOps</strong>（Development和Operations的<a href="https://zh.wikipedia.org/wiki/%E6%B7%B7%E6%88%90%E8%A9%9E" target="_blank" rel="noopener noreferrer">混成词<ExternalLinkIcon/></a>）是一种重视“软件开发人员（Dev）”和“IT运维技术人员（Ops）”之间沟通合作的文化、运动或惯例。通过自动化“软件交付”和“架构变更”的流程，来使得构建、测试、发布软件能够更加地快捷、频繁和可靠。</p>
<p><strong>为什么 OpenIM 需要 DevOps？</strong></p>
<blockquote>
<p>我想用一句话来概括，DevOps 能解决 OpenIM 当前的团队管理，能高效组织团队，并且能通过 <strong>自动化</strong> 工具协作于沟通。</p>
</blockquote>
<p>从而实现用更少的浪费、更频繁的交付更稳定的产品。</p>
<p><strong>最开始的 OpenIM 是什么样子的？</strong></p>
<p>找到了之前的一个很古老的版本，链接是：<a href="https://github.com/OpenIMSDK/Open-IM-Server/tree/test-tuoyun" target="_blank" rel="noopener noreferrer">https://github.com/OpenIMSDK/Open-IM-Server/tree/test-tuoyun<ExternalLinkIcon/></a></p>
<p>几乎存在 commit 信息丢失，因为信息不全导致代码无法跟踪问题，导致文档缺失，代码不规范等一系列的问题。</p>
<p><strong>我们跨越了从原始社会到传统的协作方式，再到后面的 devops</strong></p>
<p>为什么说及时到现在，我依旧没有将 OpenIM 转变为 devops，一个很明显的判断标准，每一次运维和交互工作依旧需要我手动去做，无疑是区分了  dev 和 ops 的职责。不仅仅让成本变高，效率变低，更重要的是团队没有了更清晰的定位。</p>
<p>那么我后面的计划如何？</p>
<p>不管是 prow, actions, 等等 CI 工具，以及各种 ops（gitops, aiops, chatops,） 也不管是各种设计的 自动化 以及 自动化管理工具，自动化交互工具。</p>
<p><strong>无疑他们是一套体系：</strong></p>
<p>提供无感知的开发环境，无论交付是否频繁，每一个 feature 的 PR 都能快速的，规范并且经过大量自动化测试，更加快速上线，也能更快地响应客户需求。每一次发布的变更变少，所以风险，以及合并的冲突，工作量就变少。而且代码 code review 更方便，代码质量和团队水平提升很高的档次。</p>
<p>🔥 OpenIM 当时我的设计理念是 main 分支作为一个类似于传统的 dev 分支，保证代码的最新以及基本可靠，release-v* 分支作为稳定的分支。
DevOps 最重要的就是自动化，和自动化运维。非常鼓励自动化，甚至可以让开发者即使不会任何运维也能去走整套自动化的流程。</p>
<p>OpenIM 的团队约束制定：<a href="https://www.notion.so/OpenIM-standardization-ebd0c1529ab54e4fb92840e67a73aac1?pvs=21" target="_blank" rel="noopener noreferrer">https://traveling-thistle-a0c.notion.site/OpenIM-standardization-ebd0c1529ab54e4fb92840e67a73aac1?pvs=4<ExternalLinkIcon/></a></p>
<h2 id="敏捷体系" tabindex="-1"><a class="header-anchor" href="#敏捷体系" aria-hidden="true">#</a> 敏捷体系</h2>
<p>提到 DevOps，我们最开始想到的非常有名气的 <strong>敏捷开发体系</strong></p>
<blockquote>
<p><a href="https://learn.microsoft.com/zh-cn/devops/plan/what-is-agile" target="_blank" rel="noopener noreferrer">敏捷<ExternalLinkIcon/></a> 开发是一个术语，用于描述迭代软件开发。 迭代软件开发通过在短增量完成工作（通常称为 <em>冲刺</em>）来缩短 DevOps 生命周期。 冲刺通常长达一到四周。 敏捷开发通常与传统或瀑布式开发形成鲜明对比，后者会提前规划大型项目，并根据计划完成它们。</p>
</blockquote>
<p><strong>四个核心价值观定义了 什么是敏捷， 而十二个原则 则是实施敏捷的 十二个指导</strong></p>
<h3 id="四个核心价值观" tabindex="-1"><a class="header-anchor" href="#四个核心价值观" aria-hidden="true">#</a> 四个核心价值观</h3>
<p>四个核心价值观是敏捷开发宣言的重要组成部分，于2001年被一组软件开发者共同提出，用于指导敏捷软件开发方法的实践</p>
<ol>
<li>
<p><strong>个体和互动</strong> 胜过 流程和工具
这意味着强调团队内成员之间的沟通、协作和理解的重要性，认为人员之间的有效交流比过度强调繁重的流程和工具更加关键。</p>
<p>对于 OpenIM 来说，流程是非常明确，并且工具很单一，就比如只有 github（issue、pr、wiki、projects） 以及 Google （docs、form、table、drive）</p>
</li>
<li>
<p><strong>工作的软件</strong> 胜过 面面俱到的文档
这一价值观强调实际可工作的软件产物比详尽的文档更有价值。尽管文档的重要性不可忽视，但优先考虑交付功能性的软件产品。</p>
</li>
<li>
<p><strong>客户合作</strong> 胜过 合同谈判
强调与客户的紧密合作和持续交流，以满足客户需求，并在项目开发过程中不断适应变化，而不是过度依赖合同和谈判。</p>
</li>
<li>
<p><strong>响应变化</strong> 胜过 遵循计划
这一价值观强调敏捷团队应该对需求变化持开放态度，能够灵活调整计划，以便更好地适应不断变化的环境和需求。</p>
</li>
</ol>
<p><strong>这里我需要额外解释一下 OpenIM 的版本驱动，以及如何设计遵守自己的 语义化 2.0.0 的思路</strong></p>
<p>一般第一个 语义号 为 0 的所有版本默认为 API 是不稳定的。第一个语义化版本作为 API 不兼容的版本。</p>
<p>用 <strong>milestone 和 roadmap</strong> 作为第二个版本的驱动，比如说我 <strong>milestone</strong> 设置为 v1.0，那么这个是针对 release-v1.0 分支的，针对 v1.0 里程碑的所有 bug issue都将修复到 release-v1.0，所有的 feature issue 都将放入到 v1.1, 未来发布到 release-v1.1</p>
<blockquote>
<p>roadmap 其实并不好规划，我不确定什么时候进行第二个语义化版本的升级，我将所有重要的特性写入到 roadmap，在 2-4 周内做详细的计划，在 1 ~3 个月内做粗略的计划，将 1 年左右的放入到 大致计划，后面就作为想法 ~</p>
</blockquote>
<p>按照 <strong>时间</strong> 或者一些重要 <strong>bug</strong> 作为第三个版本的驱动，比如说我在 openim <code v-pre>release-3.0</code> 发布后的一段时间，我解决了很多小 bug ，这些 bug 放到了 v3.0 里程碑，然后 feature 放入到 v3.1 里程碑，我后面会计划一周，或者是 两周 ，把所有 v3.0 里程碑已经 close 的 issue 全部提取出来，并且 merge 到 <code v-pre>release-v3.0</code> branch。</p>
<h3 id="十二个原则" tabindex="-1"><a class="header-anchor" href="#十二个原则" aria-hidden="true">#</a> 十二个原则</h3>
<p>十二个原则是进一步扩展和解释了敏捷开发宣言的指导原则。它们为实施敏捷开发提供了更具体的指导，用于引导团队在项目中的行为和决策。</p>
<ol>
<li><strong>最高优先权</strong>：满足客户通过尽早、持续地交付有价值的软件。</li>
<li><strong>欢迎变化</strong>：随时欢迎客户的需求变化，即使在项目后期也是如此。敏捷流程能够灵活适应变化，以使客户获得竞争优势。</li>
<li><strong>频繁交付</strong>：尽可能地以几周或几个月的间隔，提供可以工作的软件，以便客户可以快速获取业务价值。</li>
<li><strong>合作无间</strong>：业务人员和开发者必须在整个项目中紧密合作，共同努力实现共同的目标。</li>
<li><strong>激发团队</strong>：创建一个支持和激发团队成员的环境，给予他们所需的工具和资源，以完成工作。</li>
<li><strong>面对面沟通</strong>：最有效和高效的沟通是面对面的交流，可以减少误解和信息丢失。</li>
<li><strong>可工作软件</strong>：持续地交付有价值的软件是项目的首要目标。</li>
<li><strong>持续进展</strong>：敏捷流程强调持续不断地进展，以使团队能够迅速适应变化，并为客户创造更多价值。</li>
<li><strong>技术卓越</strong>：通过良好的设计、精良的工艺和技术实践，提高软件开发的质量和敏捷性。</li>
<li><strong>简洁为要</strong>：尽量简化开发过程，避免不必要的复杂性，以提高生产效率。</li>
<li><strong>自我组织</strong>：鼓励团队成员自我组织，让他们决定如何完成工作，以提高创造力和效率。</li>
<li><strong>反思调整</strong>：定期反思团队的工作方式，通过持续改进来优化过程和效率。</li>
</ol>
<h2 id="敏捷开发框架" tabindex="-1"><a class="header-anchor" href="#敏捷开发框架" aria-hidden="true">#</a> 敏捷开发框架</h2>
<p>很多人听说过 **Scrum Master ，**oh，我很好奇 Scrum Master 是什么？</p>
<p><strong>Scrum 是迭代式增量软件开发过程</strong></p>
<p>🔥 Sprint 是 Scrum 比较重要的部分，Sprint 可以理解为一个迭代，一个 Spring 一般是 2 ~ 4 周，不允许延长或者缩短。一般 OpenIM 以两周和四周（双周会时间段为基准）</p>
<p>Scrum 是橄榄球里的用语，正常翻译是并列争球的意思，现在被引用到敏捷实践中，代表一种敏捷框架。Scrum 并不是一个特定产品开发的流程或技术，而是一个容纳其它流程和技术的框架，是一个迭代和增量的产品开发框架！通常来说，Scrum 由 3355 原则组成的全流程框架，所谓 5533 值得是 Scrum 中的3种工件、3 种角色、5 个会议以及5种价值观。</p>
<table>
<thead>
<tr>
<th>Scrum原则</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>3种工件</td>
<td>- 产品待办项(Product Backlog): 包含所有待开发功能、需求、优化和修复任务。</td>
</tr>
<tr>
<td></td>
<td>- 冲刺待办项(Sprint Backlog): 冲刺中选定的产品待办项子集，表示团队的工作。</td>
</tr>
<tr>
<td></td>
<td>- 增量(Increment): 冲刺中完成的所有产品待办项的总和，是一个完整的产品版本。</td>
</tr>
<tr>
<td>3种角色</td>
<td>- Scrum Master: 负责指导团队实践Scrum，解决障碍，确保高效工作。</td>
</tr>
<tr>
<td></td>
<td>- 产品负责人 PO (Product Owner): 代表利益相关者，管理产品待办项，并提供反馈。</td>
</tr>
<tr>
<td></td>
<td>- 开发团队(Development Team): 负责实际开发工作，自组织、跨职能。负责在 Sprint 结束时可以完成工作。</td>
</tr>
<tr>
<td>5个会议</td>
<td>- 冲刺计划会议(Sprint Planning Meeting): 计划下一个冲刺要完成的工作。</td>
</tr>
<tr>
<td></td>
<td>- 每日站会(Daily Scrum): 汇报进度、讨论问题和计划下一步工作。</td>
</tr>
<tr>
<td></td>
<td>- 冲刺评审会议(Sprint Review Meeting): 展示冲刺成果，接受利益相关者反馈。</td>
</tr>
<tr>
<td></td>
<td>- 冲刺回顾会议(Sprint Retrospective Meeting): 自省并改进过程。</td>
</tr>
<tr>
<td></td>
<td>- 产品待办项修正会议(Product Backlog Refinement Meeting): 细化产品待办项。</td>
</tr>
<tr>
<td>5种价值观</td>
<td>- 承诺(Commitment): 在冲刺计划会议中共同承诺完成工作。</td>
</tr>
<tr>
<td></td>
<td>- 勇气(Courage): 面对挑战和困难时保持勇气。</td>
</tr>
<tr>
<td></td>
<td>- 专注(Focus): 将注意力集中在当前冲刺目标上。</td>
</tr>
<tr>
<td></td>
<td>- 开放(Openness): 保持开放的沟通和透明度。</td>
</tr>
<tr>
<td></td>
<td>- 尊重(Respect): 相互尊重，理解差异，支持团队发展。</td>
</tr>
</tbody>
</table>
<p><strong>这里要讲一讲 OpenIM 的 Owner 文化：</strong></p>
<p><strong>Owner文化</strong>。这个太重要的了，但是，这并不是在说，如果一个事没有owner，就会像“三个和尚”那样，事情就进了没人管的地步。这是因为很多人在工作中都是比较 nice 的，比较 nice 的人通常来说都不好意思跳出来对别人发号施令。所以，Owner 文化就是要求每件事都要定义一个Owner，而这个Owner是有权对其它人发号施令的，其他人也有义务要配合他。当然，Owner 的权利越大，责任也会越大！</p>
<h2 id="敏捷-vs-devops" tabindex="-1"><a class="header-anchor" href="#敏捷-vs-devops" aria-hidden="true">#</a> 敏捷 VS DevOps</h2>
<p>我们讲了 敏捷 也说了 DevOps，那么TM如果发生碰撞后会产生什么样的火花？</p>
<p>🔥 我认为 DevOps 是可以看做敏捷思想从开发端到系统维护端的延伸</p>
<ul>
<li>敏捷解决客户以及 IT 部门的问题和矛盾。</li>
<li>DevOps：解决 IT 内部，开发和运维之间的矛盾。</li>
</ul>
<p>所以敏捷 和 DevOps 应该是相辅相成，共同创造优质团队。</p>
<table>
<thead>
<tr>
<th>敏捷宣言的四个核心价值观</th>
<th>解释</th>
</tr>
</thead>
<tbody>
<tr>
<td>个体和互动 胜过 流程和工具</td>
<td>强调团队成员之间的交流和合作，认为人与人之间的有效互动比繁琐的流程和工具更重要。</td>
</tr>
<tr>
<td>可以工作的软件 胜过 面面俱到的文档</td>
<td>重视软件的实际运行效果，强调可执行的代码和实际可用的产品比过多的文档和规范更具价值。</td>
</tr>
<tr>
<td>客户合作 胜过 合同谈判</td>
<td>强调与客户之间积极的合作关系，认为与客户的互动和理解客户需求比严格的合同谈判更有利于项目的成功。</td>
</tr>
<tr>
<td>响应变化 胜过 遵循计划</td>
<td>接受需求和环境的变化是不可避免的，更看重对变化快速响应和灵活调整比严格遵循计划更有价值。</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>DevOps的三种方法</th>
<th>解释</th>
</tr>
</thead>
<tbody>
<tr>
<td>协作与沟通</td>
<td>DevOps强调软件开发和运维团队之间的紧密协作与有效沟通。通过消除信息孤岛和促进交流，团队成员能够更好地理解彼此的工作和需求，从而提高整体效率。</td>
</tr>
<tr>
<td>自动化</td>
<td>自动化是DevOps的核心原则之一，通过工具和脚本实现自动化可以减少手动操作和潜在的错误，从而提高交付速度和质量。自动化测试、部署、监控等环节都是DevOps自动化的重要组成部分。</td>
</tr>
<tr>
<td>持续交付</td>
<td>持续交付是DevOps的目标之一，意味着持续地将软件交付到生产环境，实现快速、稳定的发布。借助持续集成、持续部署和自动化测试等实践，团队能够更快速地响应需求变更和问题修复。</td>
</tr>
</tbody>
</table>
<p><a href="https://learn.microsoft.com/zh-cn/devops/develop/what-is-continuous-integration" target="_blank" rel="noopener noreferrer">持续集成<ExternalLinkIcon/></a> 和 <a href="https://learn.microsoft.com/zh-cn/devops/deliver/what-is-continuous-delivery" target="_blank" rel="noopener noreferrer">持续交付<ExternalLinkIcon/></a> (CI/CD) 为敏捷开发快速步伐设置团队。 尽快自动执行生成、测试和部署管道。 将自动化设置为团队在启动新项目时处理的第一项任务之一。</p>
<p>借助自动化，团队可避免速度缓慢、容易出错且耗时的手动部署过程。 由于团队发布每个冲刺，因此无需手动执行这些任务。</p>
<p>CI/CD 也会影响软件体系结构。 它可确保交付可生成和可部署的软件。 当团队实现难以部署的功能时，如果生成和部署失败，他们就会立即意识到。 CI/CD 强制团队解决部署问题。 然后，该产品始终准备好交付。</p>
<p>有一些关键 CI/CD 活动对于有效的敏捷开发至关重要。</p>
<ol>
<li><strong>单元测试。</strong> 单元测试是针对人为错误的第一个防御。 考虑单元测试编码的一部分。 使用代码检查测试。 使单元测试每个生成中的一部分。 失败的单元测试意味着生成失败。</li>
<li><strong>生成自动化。</strong> 生成系统应在生成运行时直接从源代码管理拉取代码和测试。</li>
<li><strong>分支和生成策略。</strong> 配置分支和生成策略，以在团队将代码签入到特定分支时自动生成。</li>
<li><strong>部署到环境中。</strong> 设置一个发布管道，该管道会自动将生成的项目部署到模拟生产环境。</li>
</ol>
<h2 id="精益理论体系知识" tabindex="-1"><a class="header-anchor" href="#精益理论体系知识" aria-hidden="true">#</a> 精益理论体系知识</h2>
<p>边学边写边补充，对于 <strong>精益理论体系</strong> 是有些底气不足的，因为这个体系太过于庞大，个人显得太过于渺小。</p>
<p>可能更多的需要去实践出感悟，并且每个人的感悟各有不同。精益生产体系是很难用语言表达清楚的，要想习得随心所欲的无相神功，还得摸着石头过河，所谓一步一个脚印，欲速则不达也。</p>
<p>🔥 精益思想是人、过程和技术的集成</p>
<ul>
<li><strong>精确的定义特定产品的价值；</strong></li>
<li><strong>识别出每种产品的价值流；</strong></li>
<li><strong>使价值不间断的流动；</strong></li>
<li><strong>让客户拉动生产者的价值流；</strong></li>
<li><strong>永远追求尽善尽美。</strong></li>
</ul>
<h3 id="精益和-devops" tabindex="-1"><a class="header-anchor" href="#精益和-devops" aria-hidden="true">#</a> 精益和 DevOps</h3>
<p>精益的本质：高质量、低成本地实现产品的价值交付</p>
<p>DevOps 核心原则：快速交付可工作的软件来实现预期的价值收益</p>
<p><strong>可以将 DevOps 看成是成功的精益管理实践</strong></p>
<h2 id="项目管理工具" tabindex="-1"><a class="header-anchor" href="#项目管理工具" aria-hidden="true">#</a> 项目管理工具</h2>
<table>
<thead>
<tr>
<th>品名称</th>
<th>产品介绍</th>
<th>官网网址</th>
<th>开源地址</th>
<th>优缺点</th>
</tr>
</thead>
<tbody>
<tr>
<td>Trello</td>
<td>Trello 是一款简单直观的项目管理工具，以看板的形式组织任务和项目。支持添加卡片、列表和成员，适合个人和小团队使用。</td>
<td>https://trello.com/</td>
<td>无开源</td>
<td>优点：易于上手、直观简洁。缺点：功能相对简单，适合小型项目。</td>
</tr>
<tr>
<td>Jira</td>
<td>Jira 是一款强大的项目管理和问题跟踪工具，特别适合大型软件开发团队。支持敏捷开发、缺陷管理、任务分配等功能。</td>
<td>https://www.atlassian.com/software/jira</td>
<td>无开源</td>
<td>优点：功能全面，适用于复杂项目。缺点：学习曲线较陡，界面相对复杂。</td>
</tr>
<tr>
<td>Asana</td>
<td>Asana 是一个团队协作工具，结合了任务管理、日历和项目追踪功能。适用于协调团队成员、跟踪项目进度。</td>
<td>https://asana.com/</td>
<td>无开源</td>
<td>优点：简洁直观，适合中小型团队。缺点：高级功能需要付费订阅。</td>
</tr>
<tr>
<td>Redmine</td>
<td>Redmine 是一款开源的项目管理和问题跟踪工具，支持多项目管理、Gantt 图表、自定义工作流等功能。</td>
<td>https://www.redmine.org/</td>
<td>https://github.com/redmine/redmine</td>
<td>优点：开源免费，功能可扩展。缺点：界面设计较旧，需要一定技术知识进行部署和配置。</td>
</tr>
<tr>
<td>ClickUp</td>
<td>ClickUp 是一款集任务管理、文档分享、日历规划等功能于一体的项目管理工具。适用于个人和团队使用。</td>
<td>https://clickup.com/</td>
<td>无开源</td>
<td>优点：功能全面，界面美观。缺点：免费版功能有限，高级功能需付费。</td>
</tr>
</tbody>
</table>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '84.md' style='float:left'>⬆️上一节🔗  </a><a href = '86.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


