<template><div><h1 id="云原生领域中github开源go项目的自动化测试实践与策略" tabindex="-1"><a class="header-anchor" href="#云原生领域中github开源go项目的自动化测试实践与策略" aria-hidden="true">#</a> 云原生领域中GitHub开源Go项目的自动化测试实践与策略</h1>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>作为 Github 上的 热门项目 OpenIM，如何在云原生时代中创造出价值，这是非常重要的，OpenIM 是一个优质的小团队，我们在自动化中并没有特别深入的见解。</p>
<ol>
<li><strong>使用 GitHub Actions 进行持续集成和持续交付 (CI/CD)</strong>:
<ul>
<li>GitHub Actions 提供了一个平台，可以自动构建和测试 Go 语言项目。通过配置 GitHub Actions 工作流，你可以在代码更改时自动运行测试，确保代码的质量和<a href="https://docs.github.com/en/actions/automating-builds-and-tests" target="_blank" rel="noopener noreferrer">功能<ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li><strong>KubeVela 项目实践</strong>:
<ul>
<li>KubeVela 是一个 Go 语言的云原生和开源项目，它展示了如何在云原生环境中组织 CI/CD 过程，包括自动化测试。KubeVela 使用声明性工作流来协调 CI/CD 过程，你可以参考 KubeVela 的 GitHub 仓库来理解和应用这些<a href="https://www.alibabacloud.com/blog/kubevela-one-of-the-hottest-golang-cloud-native-and-open-source-project_597465" target="_blank" rel="noopener noreferrer">实践3<ExternalLinkIcon/></a><a href="https://github.com/kubevela/kubevela" target="_blank" rel="noopener noreferrer">4<ExternalLinkIcon/></a>[5](https://github.com/kubevela/workflow#:~:text=KubeVela Workflow is an open,engine in your own repository)。</li>
</ul>
</li>
<li><strong>云原生测试框架与工具</strong>:
<ul>
<li>在云原生开发中，合约测试（Contract Testing）是一种常见的测试实践，它确保服务间的通信符合预定义的 API 协议。例如，Cloud-Native Toolkit 中使用 Pact 进行合约测试。通过编写和集成测试，你可以验证服务间的通信是否符合预期<a href="https://develop.cloudnativetoolkit.dev/learning/testing/" target="_blank" rel="noopener noreferrer">6<ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li><strong>代码覆盖率检查</strong>:
<ul>
<li>在进行自动化测试时，检查代码覆盖率是一个好的实践。许多测试框架内置了代码覆盖率检查功能，可以配置它们来报告测试的代码覆盖率。例如，使用 SonarQube 工具来读取和报告代码覆盖率信息<a href="https://develop.cloudnativetoolkit.dev/learning/testing/" target="_blank" rel="noopener noreferrer">6<ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li><strong>利用开源工具和框架</strong>:
<ul>
<li>你可以利用开源工具和框架来进行测试，例如使用 Cypress 进行云原生应用的测试[7](https://dev.to/litmus-chaos/cloud-native-application-testing-automation-2bh5#:~:text=Cloud Native Application %26 Testing,Testing Using Cypress for)。还有其他的项目和资源，例如在 GitHub 上的 learning-cloud-native-go/myapp 仓库，提供了云原生 Go 项目的完成示例，你可以参考这些示例来理解和应用云原生测试实践[8](https://medium.com/learning-cloud-native-go/lets-get-it-started-dc4634ef03b#:~:text=The completed project can be,The completed API)。</li>
</ul>
</li>
<li><strong>自定义自动化测试流程</strong>:
<ul>
<li>通过结合 GitHub Actions 和开源工具，你可以定制项目的 CI/CD 流程，包括自动化测试和验证步骤<a href="https://github.blog/2020-10-09-devops-cloud-testing" target="_blank" rel="noopener noreferrer">9<ExternalLinkIcon/></a>。</li>
</ul>
</li>
</ol>
<h2 id="自动化测试的价值量化" tabindex="-1"><a class="header-anchor" href="#自动化测试的价值量化" aria-hidden="true">#</a> 自动化测试的价值量化</h2>
<p>自动化很明显，是后期的手动成本很低，也就是说，随着时间的推移，自动化运行的次数增多，自动化的价值 ROI 变高</p>
<p><img src="http://sm.nsddd.top/sm202310151019816.png" alt="image-20231015101916672"></p>
<p>除了开发成本，还有维护成本。自动化测试开发出来后，还需要维护版本升级、诊断错误、优化结构等等的工作，这笔成本是需要持续投入的。</p>
<p>所以，得出公式如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>产出 / 投入 <span class="token operator">=</span> <span class="token number">0.5</span>*N/<span class="token punctuation">(</span><span class="token number">8</span>+ 维护成本）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>
<p>ROI 大于 1 就是赚了，小于 1 就是亏了。那么，给定一个测试案例，要不要对它做自动化，判断的依据是（自动化测试）预期 ROI 至少要大于 1。</p>
</li>
<li>
<p>自动化测试是一个长收益模式。在理想情况下，是一次性投入（投入为开发成本），之后每运行一次，就会增加一份产出。所以，时间越长，次数越多，收到的回报就会越大。</p>
</li>
<li>
<p>关于开发成本（包括开发成本 d 和维护成本 m），类似估算软件开发工作量，代码行法、功能点法，我们也可以引入到估算开发工作量里，比较好掌握。但维护成本就有点模糊了，这里包含了多种可变因素，是自动化测试项目风险的主要来源。</p>
</li>
</ol>
<h3 id="自动化测试是用来做回归测试的" tabindex="-1"><a class="header-anchor" href="#自动化测试是用来做回归测试的" aria-hidden="true">#</a> 自动化测试是用来做回归测试的</h3>
<blockquote>
<p>回归测试（Regression Testing）是软件测试的一种类型，它的目的是在对软件进行修改（例如修复bug、添加新功能或代码重构）后验证现有功能是否仍然正常工作。它能帮助确保最近的代码更改没有破坏或影响已有的功能。</p>
</blockquote>
<p>在GitHub项目中，回归测试和PR过程可以相互配合，例如：</p>
<ul>
<li>在PR过程中，当开发人员提交一个新的PR时，可以配置GitHub Actions自动触发回归测试，执行测试套件以验证代码更改的影响。</li>
<li>回归测试的结果可以作为PR审查的一部分，帮助团队成员评估代码更改的质量和影响。如果回归测试失败，可能需要修复代码并再次运行测试，直到所有测试通过。</li>
<li>一旦所有的回归测试通过，并且代码得到团队成员的批准，PR就可以合并到主分支。</li>
</ul>
<h3 id="自动化测试的开始" tabindex="-1"><a class="header-anchor" href="#自动化测试的开始" aria-hidden="true">#</a> 自动化测试的开始</h3>
<p>实践中，冒烟测试是你自动化的开始</p>
<blockquote>
<p>冒烟测试通常是在软件构建或发布到测试环境后的第一轮测试。它主要是为了确保软件的基本功能正常运行，而不是在细节上进行深入的测试。冒烟测试的主要目标是：</p>
</blockquote>
<ul>
<li>识别是否存在阻止软件基本功能运行的严重问题。</li>
<li>确保软件在基本层面上是“健康”的，可以进一步测试。</li>
</ul>
<p>冒烟测试通常覆盖：</p>
<ul>
<li>核心功能的基本测试，例如软件是否能正常启动和运行。</li>
<li>主要的接口和交互是否能正常工作。</li>
<li>任何其他被认为是“破坏性”的基本问题。</li>
</ul>
<p>在实践中，可以设定目标，冒烟测试 100% 自动化。这时，自动化测试就可以和手工测试配合，形成一个新版本发布 + 冒烟测试的简单流水线。</p>
<h3 id="最优自动化实施截面" tabindex="-1"><a class="header-anchor" href="#最优自动化实施截面" aria-hidden="true">#</a> 最优自动化实施截面</h3>
<p>制定策略，能够让这个自动化测试设计获得尽可能大的 ROI。</p>
<p>我们知道不同的阶段，测试的时间以及测试的频率是不同的。</p>
<p><strong>测试 ROI 金字塔</strong></p>
<p>在测试设计领域，经常提到的方法是分层。具体就是给定一个系统，结构上划分三个层级，单元在最小圈；服务包含多个单元，在中圈；而系统又包含多个服务，是外部的最大圈。结构图如下：</p>
<img src="http://sm.nsddd.top/sm202310151032767.png" alt="image-20231015103231709" style="zoom:50%;" />
<p>在实践中，这三种测试该怎么组合安排呢？迈克·科恩在 2009 年他的新书《敏捷成功之道》中首次提出了测试金字塔模型。单元测试自动化在金字塔底部，接口测试自动化在中部，而 UI 测试自动化在金字塔顶部。</p>
<img src="http://sm.nsddd.top/sm202310151032517.png" alt="image-20231015103245476" style="zoom:50%;" />
<p>为什么是金字塔？要是不去理解规律背后这个“为什么”，你就用不好这个规律。上一讲我们知道了“ROI 其实是自动化测试的隐式命脉”，现在我们就利用 ROI 思维，分析一下测试金字塔规律。</p>
<img src="http://sm.nsddd.top/sm202310151033215.png" alt="image-20231015103316990" style="zoom:50%;" />
<p>下面，我们分别看看每层的 ROI。单元测试可以在开发人员每次 code commit 触发运行，回归频率高；接口测试在每轮集成测试运行，回归频率中；UI 自动化测试在用户验收测试，回归频率低。</p>
<p>按照 ROI 模型，我们可以得出 3 种类型自动化测试的 ROI 排序，如下表：</p>
<p><img src="http://sm.nsddd.top/sm202310151035602.png" alt="image-20231015103511548"></p>
<p>对照测试金字塔不难发现，实际上三类自动化测试的 ROI 是自底向上由高到低的。</p>
<p>那么，我们应该优先投入精力做 ROI 最高的单元测试，再做 ROI 中的接口测试，最后完成 UI 测试。</p>
<h3 id="分层测试为啥会-内卷" tabindex="-1"><a class="header-anchor" href="#分层测试为啥会-内卷" aria-hidden="true">#</a> 分层测试为啥会“内卷”</h3>
<p>分层测试中，我们需要写的最多的是单元测试：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"testing"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">TestValidateCredentials</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    valid <span class="token operator">:=</span> <span class="token function">validateCredentials</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">,</span> <span class="token string">"password"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token operator">!</span>valid <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"expected valid credentials"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>接口测试：</strong></p>
<p>接口测试主要针对应用程序的API接口。我们可能会有一个API端点来处理登录请求。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> tests

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"testing"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">TestLoginEndpoint</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">Post</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">,</span> <span class="token string">"application/json"</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span><span class="token string">`{"username":"username","password":"password"}`</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"could not send request: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> resp<span class="token punctuation">.</span>StatusCode <span class="token operator">!=</span> http<span class="token punctuation">.</span>StatusOK <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"unexpected status: got (%v) want (%v)"</span><span class="token punctuation">,</span> resp<span class="token punctuation">.</span>StatusCode<span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>端到端测试 (E2E Testing)：</strong></p>
<p>端到端测试验证整个系统的工作流程。我们可以使用工具如Selenium来模拟用户的登录过程。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// 使用 Selenium 或类似工具进行端到端测试
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>Selenium 是一个强大的工具，用于控制Web浏览器通过程序进行自动化测试。它支持多种浏览器，包括Chrome、Firefox、IE和Safari。通过Selenium，测试人员可以编写脚本来模拟用户交互，验证应用程序的行为，并确保应用程序按预期工作。以下是Selenium的一些主要特点和组件</p>
</blockquote>
<p><strong>UI测试 (UI Testing)</strong></p>
<p>UI测试主要针对应用程序的用户界面。我们同样可以使用Selenium或其他工具来模拟用户交互，并验证登录页面的UI元素。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// 使用 Selenium 或类似工具进行UI测试
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到，一个请求，从浏览器页面发起，进入 API 网关，再传递到服务里的 Login 函数，经过了 UI 测试、API 测试和单元测试三个测试截面。</p>
<p><img src="http://sm.nsddd.top/sm202310151100216.png" alt="image-20231015110008134"></p>
<p>三个测试截面测的是一个请求在不同层面上的形态，那么每一个截面都可以测试全部的案例，也可以测试部分的案例。就像 3 个人负责 1 个项目一样，如果没有经过事先的协调和安排，3 个人可能做了重复的事情，造成浪费，也可能存在一件事 3 个人都没干，形成测试盲区。</p>
<h3 id="需求-策略矩阵" tabindex="-1"><a class="header-anchor" href="#需求-策略矩阵" aria-hidden="true">#</a> 需求 / 策略矩阵</h3>
<p>咱们先看看测试需求是什么，用 FURPS 模型来理一下需求。FURPS 是用 5 个维度来描述一个软件的功能需求，FURPS 这个单词对应着每个需求的英文首字母：</p>
<ul>
<li>F=Function 功能</li>
<li>U=Usability 易用性</li>
<li>R=Reliability 可靠性</li>
<li>P=Performance 性能</li>
<li>S=Supportability 可支持性</li>
</ul>
<h2 id="选择工具框架" tabindex="-1"><a class="header-anchor" href="#选择工具框架" aria-hidden="true">#</a> 选择工具框架</h2>
<p>工具选型很重要，在大型企业中，无论你是作为评审者，还是方案建议人。不过常常出现的场景就是，方案建议人讲了一通新工具 A 如何优秀强大，从问题分析到方案解决一应俱全。但参会专家并不是全都熟悉这个新工具，就会问出一堆类似“为什么你不用工具 B”的问题。</p>
<p><img src="http://sm.nsddd.top/sm202310151150865.png" alt="image-20231015115013681"></p>
<p>通过这个模型，我们得到一个重要结论：一个自动化测试案例的开发工作量，在给定条件下，什么经验的工程师用什么工具，需要多长时间完成，这是可以估算的定值。但维护工作量包含了多种可变因素，是自动化测试项目的风险所在。</p>
<h3 id="录制和回放" tabindex="-1"><a class="header-anchor" href="#录制和回放" aria-hidden="true">#</a> 录制和回放</h3>
<p>第一代的自动化测试工具大多基于录制回放，像最早的 WinRunner 就是录制桌面 UI 应用的。目前代表工具就是 Selenium IDE。</p>
<p>要生成测试代码很简单，开启浏览器 Selenium 的插件，打开测试的网页，比如 http://www.youtube.com 点击视频</p>
<p>通过录制产生自动化脚本的这种方法，优点是速度快、零编码，对测试人员技术要求低。缺点是规模一旦扩大，维护工作量几乎无法承受，比如和 CICD 集成、自定制报告、多环境支持等等。</p>
<h3 id="方法二-关键字驱动" tabindex="-1"><a class="header-anchor" href="#方法二-关键字驱动" aria-hidden="true">#</a> 方法二：关键字驱动</h3>
<p>不过，录制回放产生的脚本，还是面向过程的一个个函数，还需要测试人员有一定代码基础，才能扩展和维护这些函数。</p>
<p>那么，有没有办法，让没有代码经验的人也能编辑、维护脚本呢？关键字驱动方式应运而生了，它增加了页面控件对象的概念，调用对象的方法就是操作对象运行，在这种机制下，对象、对象的行为、输入的数据和描述信息，这些内容都能用一个表格的形式呈现。业务人员只需要编辑表格，就能修改运行逻辑了，这就叫做关键字驱动。</p>
<p><img src="http://sm.nsddd.top/sm202310151152295.png" alt="image-20231015115240280"></p>
<p>相比录制回放，关键字驱动框架的优势在于降低了测试开发人员的技术要求。而且测试开发人员对代码还有了更多的逻辑控制能力，比如增加循环结构、wait time、log 输出，只要框架提供足够丰富的关键字就行。</p>
<p>但你也不难看出，编辑表格的人和维护关键字仓库的人，并不是同一拨人。前者是对业务了解的测试人员，后者是技术能力强的开发人员，这样开发维护起来会增加难度。</p>
<h3 id="方法三-模块库开发" tabindex="-1"><a class="header-anchor" href="#方法三-模块库开发" aria-hidden="true">#</a> 方法三：模块库开发</h3>
<p>随着软件技术的发展，自动化测试人员的技术水平也在提高，要解决的问题也更加复杂。比如自动化测试的代码怎么能够有效地复用，有没有好的扩展能力等等。这个扩展能力是二维的，分为水平功能扩展和垂直层级扩展。</p>
<p>水平功能扩展指的是测试功能增多，自动化测试代码就借鉴了软件的模块设计思维，一个应用的测试场景可以切分成多个功能模块。比如订餐的流程可以分成登录模块、下单模块、快递模块，模块之间通过调用关系连接起来，组成测试场景。</p>
<p><img src="http://sm.nsddd.top/sm202310151208198.png" alt="image-20231015120834151"></p>
<p>而在技术层面上，又可以垂直切分出功能案例库和通用库。比如页面的组件可以形成复用库、page 对象、button 对象、link 对象等等，把和开发技术耦合的技术层封装在复用库里，而和测试相关的业务功能实现在功能案例库里。</p>
<p><img src="http://sm.nsddd.top/sm202310151208653.png" alt="image-20231015120850603"></p>
<p>这样的设计，遵循了高内聚低耦合的软件设计思想，未来自动化测试规模扩展时也很方便。比方说增加一个支付功能，就可以把支付页面的对象写到复用库里，新创建一个支付测试案例，前面和下单模块衔接，后面和快递模块对接，就能跑起来了。</p>
<p><img src="http://sm.nsddd.top/sm202310151211541.png" alt="image-20231015121109504"></p>
<h3 id="方法四-bdd-混合框架" tabindex="-1"><a class="header-anchor" href="#方法四-bdd-混合框架" aria-hidden="true">#</a> 方法四：BDD 混合框架</h3>
<p>还有一种方法是 BDD 混合框架。BDD 全称是 Behavior Drive Development，行为驱动开发，它通过 Gherkin 语法定义测试场景。</p>
<p>Gherkin 语法包含一套类自然语言的关键字：when、given、then，given 描述条件，when 描述行为，then 描述结果。这样一个场景的 3 要素：上下文、动作和结果就说明白了。</p>
<p>所以，Gherkin 语法描述出来的测试场景，能够同时被非技术和技术人员理解。客户、需求人员、开发人员和测试人员从 BDD 案例各取所需，需求人员得到用户手册，开发人员得到 Use Case，测试人员得到测试案例。这些都有 BDD 框架支持生成代码，比如 Cucumber。</p>
<h3 id="方法五-更高-roi-的探索-自动化前沿技术" tabindex="-1"><a class="header-anchor" href="#方法五-更高-roi-的探索-自动化前沿技术" aria-hidden="true">#</a> 方法五：更高 ROI 的探索，自动化前沿技术</h3>
<p>最后，我要说一下目前比较火，听起来也很酷的自动化前沿技术。</p>
<p>AI 测试曾被寄予厚望，我们期待由它发展出一套自动化测试全栈解决方案，可以自动生成测试案例和代码，而且维护工作量为零。不能说这些全都是镜花水月，我相信目前 AI 只在一小部分测试领域里落地，比如图像识别的 Applitools，可以用作图片验证；游戏领域里的监督学习，用来行为克隆等等。</p>
<p>我也曾看过一些 AI 根据规则自动生成测试案例的演示，但演示只是演示，它演示的方案需要的很多条件，现实还不具备，比如基于非常理想的数据模型等等。所以，我认为 AI“落地”的定义是，它的形式是产品，而不是个人业余的项目或者一段开源代码。</p>
<p>相比 AI 测试，我更看好另外一种自动化生成测试的思路，就是基于规则化或可以模式化的业务场景，把案例的生成和代码生成一并自动化，形成一种可以量化的案例发现方案。我会在第 5 讲带你了解这个思路如何实现。</p>
<p>记住，测试工作是要能证明软件功能的成败，其方法论基石是确定论，而不是未知论。说得通俗一点，测试是在编网，虽然网会漏鱼，但我很确信只要投入人手和时间，就能把网编到什么程度，网住什么鱼。 而不是今天我捉到一条鱼，明天不知道鱼在哪里。这是我不认为 AI 能完全替代手工测试工作的原因。</p>
<p><img src="http://sm.nsddd.top/sm202310151212869.png" alt="image-20231015121227807"></p>
<h3 id="脚本复用-什么样的代码才值得写" tabindex="-1"><a class="header-anchor" href="#脚本复用-什么样的代码才值得写" aria-hidden="true">#</a> 脚本复用：什么样的代码才值得写</h3>
<p>我们看一下下一段用 go 语言写的代码：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/tebeka/selenium"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> webDriver selenium<span class="token punctuation">.</span>WebDriver
	<span class="token keyword">var</span> err <span class="token builtin">error</span>
	caps <span class="token operator">:=</span> selenium<span class="token punctuation">.</span>Capabilities<span class="token punctuation">{</span><span class="token string">"browserName"</span><span class="token punctuation">:</span> <span class="token string">"chrome"</span><span class="token punctuation">}</span>
	<span class="token keyword">if</span> webDriver<span class="token punctuation">,</span> err <span class="token operator">=</span> selenium<span class="token punctuation">.</span><span class="token function">NewRemote</span><span class="token punctuation">(</span>caps<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> webDriver<span class="token punctuation">.</span><span class="token function">Quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	err <span class="token operator">=</span> webDriver<span class="token punctuation">.</span><span class="token function">MaximizeWindow</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> webDriver<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"https://www.example.com/users/sign_in"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	username<span class="token punctuation">,</span> err <span class="token operator">:=</span> webDriver<span class="token punctuation">.</span><span class="token function">FindElement</span><span class="token punctuation">(</span>selenium<span class="token punctuation">.</span>ByID<span class="token punctuation">,</span> <span class="token string">"user_name"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	password<span class="token punctuation">,</span> err <span class="token operator">:=</span> webDriver<span class="token punctuation">.</span><span class="token function">FindElement</span><span class="token punctuation">(</span>selenium<span class="token punctuation">.</span>ByID<span class="token punctuation">,</span> <span class="token string">"user_password"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	login<span class="token punctuation">,</span> err <span class="token operator">:=</span> webDriver<span class="token punctuation">.</span><span class="token function">FindElement</span><span class="token punctuation">(</span>selenium<span class="token punctuation">.</span>ByXPATH<span class="token punctuation">,</span> <span class="token string">`//button[normalize-space(text())="登录"]`</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> username<span class="token punctuation">.</span><span class="token function">SendKeys</span><span class="token punctuation">(</span><span class="token string">"openim@example.com"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> password<span class="token punctuation">.</span><span class="token function">SendKeys</span><span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> login<span class="token punctuation">.</span><span class="token function">Click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段Go代码中：</p>
<ol>
<li>我们首先导入了<code v-pre>github.com/tebeka/selenium</code>包，它是一个提供Selenium WebDriver绑定的Go库。</li>
<li>在<code v-pre>login</code>函数中，我们创建了一个新的<code v-pre>WebDriver</code>实例，并使用<code v-pre>ChromeDriver</code>来启动一个新的浏览器会话。</li>
<li>然后，我们最大化了浏览器窗口，打开了登录页面，并找到了用户名、密码和登录按钮的元素。</li>
<li>最后，我们输入了用户名和密码，并点击了登录按钮。</li>
</ol>
<h3 id="提高复用率-一份代码-多浏览器运行" tabindex="-1"><a class="header-anchor" href="#提高复用率-一份代码-多浏览器运行" aria-hidden="true">#</a> 提高复用率：一份代码，多浏览器运行</h3>
<p>可以看到，脚本运行的测试案例只在 chrome 上，但作为一个 web 应用，一般是要支持市面上主流的浏览器，看一下 <a href="https://help.aliyun.com/document_detail/211434.html" target="_blank" rel="noopener noreferrer">阿里云网站<ExternalLinkIcon/></a> 支持 12 种浏览器，列表如下：</p>
<p><img src="http://sm.nsddd.top/sm202310151426520.png" alt="image-20231015142646429"></p>
<p>那么，有没有办法让我们的脚本能够一下子测试 12 种浏览器呢？此时我们需要修改脚本，支持调用多个浏览器 driver：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">main</span>

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/tebeka/selenium"</span>
	<span class="token string">"github.com/tebeka/selenium/chrome"</span>
<span class="token punctuation">)</span>

func <span class="token function">login</span><span class="token punctuation">(</span>driver <span class="token class-name"><span class="token namespace">selenium<span class="token punctuation">.</span></span>WebDriver</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	err <span class="token operator">:</span><span class="token operator">=</span> <span class="token class-name"><span class="token namespace">driver<span class="token punctuation">.</span></span>MaximizeWindow</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">driver<span class="token punctuation">.</span></span>Get</span><span class="token punctuation">(</span><span class="token string">"https://www.example.com/users/sign_in"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	username<span class="token punctuation">,</span> err <span class="token operator">:</span><span class="token operator">=</span> <span class="token class-name"><span class="token namespace">driver<span class="token punctuation">.</span></span>FindElement</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">selenium<span class="token punctuation">.</span></span>ByID</span><span class="token punctuation">,</span> <span class="token string">"user_name"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	password<span class="token punctuation">,</span> err <span class="token operator">:</span><span class="token operator">=</span> <span class="token class-name"><span class="token namespace">driver<span class="token punctuation">.</span></span>FindElement</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">selenium<span class="token punctuation">.</span></span>ByID</span><span class="token punctuation">,</span> <span class="token string">"user_password"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	login<span class="token punctuation">,</span> err <span class="token operator">:</span><span class="token operator">=</span> <span class="token class-name"><span class="token namespace">driver<span class="token punctuation">.</span></span>FindElement</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">selenium<span class="token punctuation">.</span></span>ByXPATH</span><span class="token punctuation">,</span> `<span class="token comment">//button[normalize-space(text())="登录"]`)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">username<span class="token punctuation">.</span></span>SendKeys</span><span class="token punctuation">(</span><span class="token string">"openim@example.com"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">password<span class="token punctuation">.</span></span>SendKeys</span><span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">login<span class="token punctuation">.</span></span>Click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

func <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	drivers <span class="token operator">:</span><span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">"chrome"</span><span class="token punctuation">,</span> <span class="token string">"firefox"</span><span class="token punctuation">}</span>  <span class="token comment">// 此处列举了两种浏览器驱动，可以根据实际需求添加更多驱动</span>

	<span class="token keyword">for</span> _<span class="token punctuation">,</span> driverName <span class="token operator">:</span><span class="token operator">=</span> range drivers <span class="token punctuation">{</span>
		<span class="token keyword">var</span> webDriver <span class="token class-name"><span class="token namespace">selenium<span class="token punctuation">.</span></span>WebDriver</span>
		<span class="token keyword">var</span> err error

		<span class="token keyword">switch</span> driverName <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token string">"chrome"</span><span class="token operator">:</span>
			caps <span class="token operator">:</span><span class="token operator">=</span> <span class="token class-name"><span class="token namespace">selenium<span class="token punctuation">.</span></span>Capabilities</span><span class="token punctuation">{</span><span class="token string">"browserName"</span><span class="token operator">:</span> <span class="token string">"chrome"</span><span class="token punctuation">}</span>
			webDriver<span class="token punctuation">,</span> err <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">selenium<span class="token punctuation">.</span></span>NewRemote</span><span class="token punctuation">(</span>caps<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
				<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token keyword">case</span> <span class="token string">"firefox"</span><span class="token operator">:</span>
			caps <span class="token operator">:</span><span class="token operator">=</span> <span class="token class-name"><span class="token namespace">selenium<span class="token punctuation">.</span></span>Capabilities</span><span class="token punctuation">{</span><span class="token string">"browserName"</span><span class="token operator">:</span> <span class="token string">"firefox"</span><span class="token punctuation">}</span>
			webDriver<span class="token punctuation">,</span> err <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">selenium<span class="token punctuation">.</span></span>NewRemote</span><span class="token punctuation">(</span>caps<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
				<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token keyword">default</span><span class="token operator">:</span>
			<span class="token class-name"><span class="token namespace">fmt<span class="token punctuation">.</span></span>Printf</span><span class="token punctuation">(</span><span class="token string">"Unsupported driver: %s\n"</span><span class="token punctuation">,</span> driverName<span class="token punctuation">)</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>

		defer <span class="token class-name"><span class="token namespace">webDriver<span class="token punctuation">.</span></span>Quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token function">login</span><span class="token punctuation">(</span>webDriver<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段Go代码中：</p>
<ol>
<li>我们定义了一个<code v-pre>login</code>函数，它接受一个<code v-pre>selenium.WebDriver</code>实例作为参数。这个<code v-pre>login</code>函数执行了与Java代码中相同的登录步骤。</li>
<li>在<code v-pre>main</code>函数中，我们创建了一个<code v-pre>drivers</code>数组，包含了我们想要测试的浏览器驱动名。我们遍历这个数组，并为每个驱动名创建一个新的<code v-pre>WebDriver</code>实例。</li>
<li>对于每个<code v-pre>WebDriver</code>实例，我们调用<code v-pre>login</code>函数来执行登录测试。</li>
</ol>
<p>driver 的数目有多少个，就运行多少次，每次运行从 iteration 数组里取得 driver 的名字，交给脚本去启动相应的浏览器。</p>
<h3 id="提高复用率-一份代码-多数据运行" tabindex="-1"><a class="header-anchor" href="#提高复用率-一份代码-多数据运行" aria-hidden="true">#</a> 提高复用率：一份代码，多数据运行</h3>
<p>刚才已经迈出了第一步，不错，我们再继续看脚本，还有没有可以改进的地方。现在，我们的脚本只能测试一组用户数据，用户名 <code v-pre>openim</code>，密码是 <code v-pre>123456</code>。在测试方法论中，一个测试案例应该有多组测试数据，那合法的用户名的数据格式不止这么多，按照字符类型划分等价类，至少有 5 组：</p>
<ol>
<li>ASCII 字符</li>
<li>数字</li>
<li>特殊字符</li>
<li>拉丁文字符</li>
<li>中文字符</li>
</ol>
<p>密码一般是数字，ASCII 字符加特殊字符 3 种。我们至少可以开发出 5*3=15 种合法的用户名密码组合，作为测试用例。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/tebeka/selenium"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> UserPassword <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	username <span class="token builtin">string</span>
	password <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">login</span><span class="token punctuation">(</span>driver selenium<span class="token punctuation">.</span>WebDriver<span class="token punctuation">,</span> credentials UserPassword<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	err <span class="token operator">:=</span> driver<span class="token punctuation">.</span><span class="token function">MaximizeWindow</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"https://www.example.com/users/sign_in"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	usernameField<span class="token punctuation">,</span> err <span class="token operator">:=</span> driver<span class="token punctuation">.</span><span class="token function">FindElement</span><span class="token punctuation">(</span>selenium<span class="token punctuation">.</span>ByID<span class="token punctuation">,</span> <span class="token string">"user_name"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	passwordField<span class="token punctuation">,</span> err <span class="token operator">:=</span> driver<span class="token punctuation">.</span><span class="token function">FindElement</span><span class="token punctuation">(</span>selenium<span class="token punctuation">.</span>ByID<span class="token punctuation">,</span> <span class="token string">"user_password"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	loginButton<span class="token punctuation">,</span> err <span class="token operator">:=</span> driver<span class="token punctuation">.</span><span class="token function">FindElement</span><span class="token punctuation">(</span>selenium<span class="token punctuation">.</span>ByXPATH<span class="token punctuation">,</span> <span class="token string">`//button[normalize-space(text())="登录"]`</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> usernameField<span class="token punctuation">.</span><span class="token function">SendKeys</span><span class="token punctuation">(</span>credentials<span class="token punctuation">.</span>username<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> passwordField<span class="token punctuation">.</span><span class="token function">SendKeys</span><span class="token punctuation">(</span>credentials<span class="token punctuation">.</span>password<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> loginButton<span class="token punctuation">.</span><span class="token function">Click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	drivers <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"chrome"</span><span class="token punctuation">,</span> <span class="token string">"firefox"</span><span class="token punctuation">}</span>
	userPasswords <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>UserPassword<span class="token punctuation">{</span>
		<span class="token punctuation">{</span><span class="token string">"xxxx"</span><span class="token punctuation">,</span> <span class="token string">"123456"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token string">"测试用户"</span><span class="token punctuation">,</span> <span class="token string">"Welcome1"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// ... other user-password combinations</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> driverName <span class="token operator">:=</span> <span class="token keyword">range</span> drivers <span class="token punctuation">{</span>
		<span class="token keyword">var</span> webDriver selenium<span class="token punctuation">.</span>WebDriver
		<span class="token keyword">var</span> err <span class="token builtin">error</span>

		caps <span class="token operator">:=</span> selenium<span class="token punctuation">.</span>Capabilities<span class="token punctuation">{</span><span class="token string">"browserName"</span><span class="token punctuation">:</span> driverName<span class="token punctuation">}</span>
		webDriver<span class="token punctuation">,</span> err <span class="token operator">=</span> selenium<span class="token punctuation">.</span><span class="token function">NewRemote</span><span class="token punctuation">(</span>caps<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">defer</span> webDriver<span class="token punctuation">.</span><span class="token function">Quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> credentials <span class="token operator">:=</span> <span class="token keyword">range</span> userPasswords <span class="token punctuation">{</span>
			<span class="token function">login</span><span class="token punctuation">(</span>webDriver<span class="token punctuation">,</span> credentials<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段Go代码中：</p>
<ol>
<li>我们定义了一个<code v-pre>UserPassword</code>结构体来保存用户名和密码的组合。</li>
<li><code v-pre>login</code>函数现在接受一个<code v-pre>selenium.WebDriver</code>实例和一个<code v-pre>UserPassword</code>实例作为参数。</li>
<li>在<code v-pre>main</code>函数中，我们创建了两个数组，一个用于保存要测试的浏览器驱动名，另一个用于保存要测试的用户名和密码的组合。</li>
<li>我们遍历每个浏览器驱动名，为每个驱动名创建一个新的<code v-pre>WebDriver</code>实例。然后，我们遍历每个用户名和密码的组合，并对每个组合调用<code v-pre>login</code>函数来执行登录测试。</li>
</ol>
<h3 id="提高复用率-一份代码-多环境运行" tabindex="-1"><a class="header-anchor" href="#提高复用率-一份代码-多环境运行" aria-hidden="true">#</a> 提高复用率：一份代码，多环境运行</h3>
<p>现在我们已经摸着道了，提高 ROI，那就是让一份自动化测试程序，尽可能多复用在不同的测试场景中。这些测试场景本来就是有效的测试需求，转换成自动化也是一劳多得。</p>
<p>还有没有其他场景呢？当然有，举个例子，在我们的产品发布 pipeline 里，贯穿了从开发环境、测试环境、准生产环境到生产环境，由低向高的交付过程。</p>
<p>那你的测试脚本需要兼容每一个环境，在所有需要运行它的环境里都可以直接跑，不需要做任何修改。一份脚本，运行在 dev，test，stage，productin 4 种环境下，我们的 n3=4, n=n1+n2+n3=15+12+4=31 次</p>
<p>如何做到同一个测试程序跑多个环境，最好的方式就是提取出配置文件：</p>
<p>我们的自动化测试也可以实现类似的机制。聪明的你，可以考虑自开发一个测试配置文件加载模块，代码不需要多，但会直接增加 ROI。</p>
<p>另外，如果你的产品支持多国语言，那么一份代码跑多国语言版本，也是一个会显著增加自动化测试 ROI 的好主意。</p>
<p>像上面的代码，当前只支持中文页面。假设我们的产品要求支持 9 种语言，那可以让页面控件加载不同语言的 label text。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/tebeka/selenium"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Credentials <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	username <span class="token builtin">string</span>
	password <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Profile <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	url <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Label <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	loginText <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">login</span><span class="token punctuation">(</span>driver selenium<span class="token punctuation">.</span>WebDriver<span class="token punctuation">,</span> credentials Credentials<span class="token punctuation">,</span> profile Profile<span class="token punctuation">,</span> language <span class="token builtin">string</span><span class="token punctuation">,</span> label Label<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	err <span class="token operator">:=</span> driver<span class="token punctuation">.</span><span class="token function">MaximizeWindow</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> driver<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>profile<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	usernameField<span class="token punctuation">,</span> err <span class="token operator">:=</span> driver<span class="token punctuation">.</span><span class="token function">FindElement</span><span class="token punctuation">(</span>selenium<span class="token punctuation">.</span>ByID<span class="token punctuation">,</span> <span class="token string">"user_name"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	passwordField<span class="token punctuation">,</span> err <span class="token operator">:=</span> driver<span class="token punctuation">.</span><span class="token function">FindElement</span><span class="token punctuation">(</span>selenium<span class="token punctuation">.</span>ByID<span class="token punctuation">,</span> <span class="token string">"user_password"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	loginButton<span class="token punctuation">,</span> err <span class="token operator">:=</span> driver<span class="token punctuation">.</span><span class="token function">FindElement</span><span class="token punctuation">(</span>selenium<span class="token punctuation">.</span>ByXPATH<span class="token punctuation">,</span> <span class="token string">`//button[normalize-space(text())="`</span><span class="token operator">+</span>label<span class="token punctuation">.</span>loginText<span class="token operator">+</span><span class="token string">`"]`</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> usernameField<span class="token punctuation">.</span><span class="token function">SendKeys</span><span class="token punctuation">(</span>credentials<span class="token punctuation">.</span>username<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> passwordField<span class="token punctuation">.</span><span class="token function">SendKeys</span><span class="token punctuation">(</span>credentials<span class="token punctuation">.</span>password<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> loginButton<span class="token punctuation">.</span><span class="token function">Click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	drivers <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"chrome"</span><span class="token punctuation">,</span> <span class="token string">"firefox"</span><span class="token punctuation">}</span>
	credentialsList <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>Credentials<span class="token punctuation">{</span>
		<span class="token punctuation">{</span><span class="token string">"xxxx"</span><span class="token punctuation">,</span> <span class="token string">"123456"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token string">"测试用户"</span><span class="token punctuation">,</span> <span class="token string">"Welcome1"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// ... other user-password combinations</span>
	<span class="token punctuation">}</span>
	profiles <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>Profile<span class="token punctuation">{</span>
		<span class="token punctuation">{</span>url<span class="token punctuation">:</span> <span class="token string">"auto-dev.yml"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span>url<span class="token punctuation">:</span> <span class="token string">"auto-test.yml"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span>url<span class="token punctuation">:</span> <span class="token string">"auto-prod.yml"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// ... other profiles</span>
	<span class="token punctuation">}</span>
	languages <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"en"</span><span class="token punctuation">,</span> <span class="token string">"zh_CN"</span><span class="token punctuation">,</span> <span class="token string">"zh_TW"</span><span class="token punctuation">,</span> <span class="token string">"FR"</span><span class="token punctuation">}</span>
	labels <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>Label<span class="token punctuation">{</span>
		<span class="token punctuation">{</span>loginText<span class="token punctuation">:</span> <span class="token string">"登录"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// ... other labels</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> driverName <span class="token operator">:=</span> <span class="token keyword">range</span> drivers <span class="token punctuation">{</span>
		<span class="token keyword">var</span> webDriver selenium<span class="token punctuation">.</span>WebDriver
		<span class="token keyword">var</span> err <span class="token builtin">error</span>

		caps <span class="token operator">:=</span> selenium<span class="token punctuation">.</span>Capabilities<span class="token punctuation">{</span><span class="token string">"browserName"</span><span class="token punctuation">:</span> driverName<span class="token punctuation">}</span>
		webDriver<span class="token punctuation">,</span> err <span class="token operator">=</span> selenium<span class="token punctuation">.</span><span class="token function">NewRemote</span><span class="token punctuation">(</span>caps<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">defer</span> webDriver<span class="token punctuation">.</span><span class="token function">Quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> credentials <span class="token operator">:=</span> <span class="token keyword">range</span> credentialsList <span class="token punctuation">{</span>
			<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> profile <span class="token operator">:=</span> <span class="token keyword">range</span> profiles <span class="token punctuation">{</span>
				<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> language <span class="token operator">:=</span> <span class="token keyword">range</span> languages <span class="token punctuation">{</span>
					<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> label <span class="token operator">:=</span> <span class="token keyword">range</span> labels <span class="token punctuation">{</span>
						<span class="token function">login</span><span class="token punctuation">(</span>webDriver<span class="token punctuation">,</span> credentials<span class="token punctuation">,</span> profile<span class="token punctuation">,</span> language<span class="token punctuation">,</span> label<span class="token punctuation">)</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段Go代码中：</p>
<ol>
<li>定义了几个结构体和类型来表示测试方法的参数。</li>
<li><code v-pre>login</code>函数现在接受五个参数，每个参数对应一个<code v-pre>@Iteration</code>注解。</li>
<li>在<code v-pre>main</code>函数中，创建了几个数组来保存每个<code v-pre>@Iteration</code>注解的值。使用嵌套循环来遍历这些数组，并为每个参数组合调用<code v-pre>login</code>函数。</li>
<li>在<code v-pre>login</code>函数中，使用参数值执行登录测试。</li>
</ol>
<p>现在一份脚本经过了多浏览器、多数据、多环境和多语言 4 轮打磨，运行的次数 n=n1+n2+n3+n4=12+15+4+9=40 次。如果各个场景有关联关系，比如页面的语言和测试数据有耦合，英文页面的 encoding 和数据的 charset 有关联，那么两个场景的次数就是完全组合，采用乘法，15*9=135 次。</p>
<p>而且，从脚本的变化可以看到，脚本第一版本里的 hard code 也一个个被消除了，取而代之的是数据驱动。消除 hard code 是提升 ROI 的结果。</p>
<h3 id="还有哪些工作值得做" tabindex="-1"><a class="header-anchor" href="#还有哪些工作值得做" aria-hidden="true">#</a> 还有哪些工作值得做？</h3>
<p>维护工作量的不确定性是自动化测试的一个重要风险，所以我们有必要看一下维护的工作量都花在哪里了。</p>
<ol>
<li>被测截面发生变化带来的维护工作量。比如 UI 自动化测试的产品页面发生了变化，API 自动化测试的接口做了重构。</li>
<li>诊断自动化测试的工作量，如果把自动化测试结果分为真阳，假阳，真阴，假阴。那假阳和假阴都是需要诊断的。</li>
</ol>
<h2 id="auto-gen-auto-所有测试工作即代码" tabindex="-1"><a class="header-anchor" href="#auto-gen-auto-所有测试工作即代码" aria-hidden="true">#</a> Auto Gen Auto：所有测试工作即代码</h2>
<p>我们前面用了 4 讲篇幅，讨论 ROI 模型和由此衍生出来的一套实践原则，从分层测试、选型思路和具体代码多个角度探索提升 ROI 的方法。</p>
<p>这些方法还都是基于常规的自动化测试开发流程，先有测试需求，再设计测试案例，然后做自动化。以登录测试为例：</p>
<p><img src="http://sm.nsddd.top/sm202310151448753.png" alt="image-20231015144845702"></p>
<p>自动化测试的开发成本，就是把测试需求转变成自动化测试代码这个过程花费的时间。在我们的图里，它是从左向右，所以我管它叫做水平开发成本。</p>
<p><img src="http://sm.nsddd.top/sm202310151452286.png" alt="image-20231015145252236"></p>
<p>当登录功能测试需求发生变化时，就会重新走一遍这个流程，出现了多个版本的测试需求，也会带来多个版本的自动化测试案例。从下图可见，这个版本是自上向下增加，所以我管它叫做垂直维护成本。</p>
<p><img src="http://sm.nsddd.top/sm202310151453839.png" alt="image-20231015145304785"></p>
<p>我们现在可以直观地看到开发成本和维护成本了。好，问题来了，有没有办法从流程上动手术，来降低这两个成本呢？</p>
<p>这就是我们今天要讲的 Automation Generate Automation，也叫自动化产生自动化测试代码，为了方便起见，下面的篇幅用缩写 Auto Gen Auto 来指代。</p>
<h3 id="auto-gen-auto-技术" tabindex="-1"><a class="header-anchor" href="#auto-gen-auto-技术" aria-hidden="true">#</a> Auto Gen Auto 技术</h3>
<p>常规的自动化测试，是指用代码实现设计好的 TestCase，而 Auto Gen Auto 的目的是让 Test Case 生成也自动化，如下图所示。</p>
<p><img src="http://sm.nsddd.top/sm202310151454180.png" alt="image-20231015145419121"></p>
<p>因为从测试需求到自动化测试案例是完全自动化的，每次需求改变的时候，只需运行一次 Auto Gen Auto 即可生成新的自动化案例，垂直维护成本为零。所以 Auto Gen Auto 技术如果能落地，ROI 就会大大提高。</p>
<h3 id="从何处下手" tabindex="-1"><a class="header-anchor" href="#从何处下手" aria-hidden="true">#</a> 从何处下手</h3>
<p>业界熟知的测试方法是黑盒测试和白盒测试。白盒测试从测试案例设计开始，需要我们先了解代码逻辑结果，一个函数里有几个判断分支，处理那些数据。基于这些了解，再设计案例验证函数输出和达成代码覆盖率。</p>
<p>在白盒测试里，Auto Gen Auto 不是啥稀奇事，XUnit 框架都提供了不少开发 IDE 的 plugin，可以扫描一个 class 的函数，直接产生 test 方法。开发人员只需补充少量代码，test 方法就可以运转起来了。</p>
<p>与之对应的是黑盒测试，测试案例设计不基于产品代码，而是用户规格说明。比如，用户在订餐系统上完成一个订单，用户该怎么操作，下单成功后应该收到物流单号等等，设计这些测试案例的目的是验证业务能够完成，不需要去看代码。</p>
<p>今天，我们要关注的是在黑盒测试领域的 Auto Gen Auto，这个更有挑战性，也更有探索价值。因为，作为测试人员花了大量时间来设计黑盒测试案例，而且还要手工维护这些测试案例的变化，这个过程要是都能自动化了，就会省去很大的重复又枯燥的工作量。</p>
<h3 id="如何实现" tabindex="-1"><a class="header-anchor" href="#如何实现" aria-hidden="true">#</a> 如何实现</h3>
<p>怎么做到 Auto Gen Auto 呢？用代码生成代码，前提是测试需求得有一定的规则或模式，然后代码才能解析规则，根据规则生成最终的测试代码。</p>
<p>这个实现思路，在开发中是很常用的，比如 Maven Archetype 使用模版自动生成项目代码，Soap 使用 WSDL 来生成调用桩等等，原理图如下。</p>
<p><img src="http://sm.nsddd.top/sm202310151458728.png" alt="image-20231015145823666"></p>
<p>所以，要做 Auto Gen Auto，我们的目标是先要找出测试需求里的这些规则，并把它们表达出来，放在一个规则文件里。我们看看下面的例子。</p>
<h3 id="测试等价类的规则" tabindex="-1"><a class="header-anchor" href="#测试等价类的规则" aria-hidden="true">#</a> 测试等价类的规则</h3>
<p>远在天边，近在眼前，我们在测试案例设计中经常用到的等价类和边价值方法，就可以作为 Auto Gen Auto 的规则。</p>
<p>等价类是指某个输入域的子集合，在同一个子集合里的所有元素对于测试的效果都是等价的。</p>
<p>我们要测试一个订餐系统的用户名，首先要了解用户名上的约束。从长度上来看，假设用户名最大长度是 255 个字节，根据这个约束，至少能产生 2 个测试等价类：有效等价类是小于 255 字节的用户名，无效等价类是大于 255 字节的用户名。测试用户注册功能时，就可以用到这 2 个等价类了。</p>
<p>用同样的思路看用户名的另外一个约束，那就是字符类型的限制，假设用户名只能由英文字母和数字组成，根据这个约束，又可以产生多个等价类，中文字符、ASCII 字符、数字、High ASCII 等等。</p>
<p>如果能让测试案例和等价类自动对应，然后依据规则动态产生测试案例，这些问题就会迎刃而解。不过，我们得先把这些约束规则外化表达出来，在这里，我用一个 user-rule.yaml 文件来表达这些规则。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> user name rules
  <span class="token key atrule">appliedTestCase</span><span class="token punctuation">:</span> register<span class="token punctuation">,</span> login
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
    <span class="token key atrule">lengthRule</span><span class="token punctuation">:</span>
      <span class="token key atrule">express</span><span class="token punctuation">:</span> &lt;=255 chars
    <span class="token key atrule">characterRule</span><span class="token punctuation">:</span>
      <span class="token key atrule">express</span><span class="token punctuation">:</span> value<span class="token punctuation">></span>=97 and value&lt;=122
      <span class="token key atrule">express</span><span class="token punctuation">:</span> value<span class="token punctuation">></span>=48 and value&lt;=57
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们写一段代码，从这个 YAML 文件中直接把规则加载进来，在内存中形成一个分类树。</p>
<p><img src="http://sm.nsddd.top/sm202310151510385.png" alt="image-20231015151026332"></p>
<h3 id="业务的逻辑规则" tabindex="-1"><a class="header-anchor" href="#业务的逻辑规则" aria-hidden="true">#</a> 业务的逻辑规则</h3>
<p>用等价类的规则表达小试牛刀后，我们尝到了甜头。看来，只要能把规则表达出来，生成测试案例这个工作就可以交给代码去做。我们再找一个更加实用的场景，来看看怎么落地。</p>
<p>在做 API 测试的时候，restAPI 的接口一般是通过 Open API 规范来描述。在设计阶段，开发先定义要实现的 API 接口，Client 要发送什么样的 Request，Server 要返回什么样的 Response。</p>
<p>比如下面的 <code v-pre>user-restapi.yaml</code> 文件，就是遵循 Open API 规范，定义了一个根据 name 查询 User 的 RestAPI。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">/api/users</span><span class="token punctuation">:</span>
    <span class="token key atrule">get</span><span class="token punctuation">:</span>
      <span class="token key atrule">description</span><span class="token punctuation">:</span> 通过name查询用户.
      <span class="token key atrule">parameters</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> username
          <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">description</span><span class="token punctuation">:</span> 用户name
      <span class="token key atrule">responses</span><span class="token punctuation">:</span>
        <span class="token key atrule">'200'</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> 成功返回符合查询条件的用户列表.
          <span class="token key atrule">schema</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> array
            <span class="token key atrule">items</span><span class="token punctuation">:</span>
              <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/definitions/User'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个接口很简单，但它也声明了一个简单的契约，Client 要想查询 User，它需要向 server 发送一个 http get 请求，发送的 url 格式如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>http://<span class="token punctuation">{</span>host<span class="token punctuation">}</span>:<span class="token punctuation">{</span>port<span class="token punctuation">}</span>/api/users?username<span class="token operator">=</span>openim
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而 server 如果查询到了 User，它应该返回这样一个 http status code 为 200 的 response，内容如下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">{</span>
        <span class="token key atrule">"items"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token key atrule">"ID"</span><span class="token punctuation">:</span> <span class="token string">"123456"</span><span class="token punctuation">,</span>
            <span class="token key atrule">"name"</span><span class="token punctuation">:</span> <span class="token string">"liusheng"</span><span class="token punctuation">,</span>
            <span class="token key atrule">"age"</span><span class="token punctuation">:</span> <span class="token number">18</span>
          <span class="token punctuation">}</span>
          <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>YAML 文件里定义接口所用到的关键字，像 get、description、parameters 等等，它们都是 Open API 里定义好的，含义也是明确的，那么 YAML 表达出来的规则内容也是可以解析出来的。因此，我们同样可以根据规则内容，直接生成测试代码。</p>
<p>实际上，业界已经有了现成的工具，对于 Go 语言，有几个类似于 OpenAPI Generator 的工具，可以用于从 OpenAPI 规范生成客户端库、服务器存根和其他资源。以下是其中一些工具：</p>
<ol>
<li><strong>GoSwagger</strong>：
<ul>
<li>GoSwagger 是 Go 语言的 Swagger 2.0 实现。它似乎是 Go 社区中用于从 Swagger 规范生成代码的流行工具。该工具可以在 <a href="https://github.com/go-swagger/go-swagger" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a> 上找到，更多信息可以在其<a href="https://goswagger.io/" target="_blank" rel="noopener noreferrer">官方网站<ExternalLinkIcon/></a>上找到。</li>
</ul>
</li>
<li><strong>openapi-generator-go</strong>：
<ul>
<li>这是专为 Go 语言设计的官方 OpenAPI Generator 的变体。它为许多字段提供了 getter，使得定义和处理模型的接口更加容易。此生成器还对枚举（包括使验证枚举更容易的实用方法）、数组和 <code v-pre>allOf</code> 有更好的支持。</li>
</ul>
</li>
<li><strong>oapi-codegen</strong>：
<ul>
<li>oapi-codegen 是一个从 OpenAPI 规范生成 Go 应用程序服务器代码的工具。此工具提供了生成类型和服务器代码的命令，使得基于给定的 OpenAPI 规范轻松构建 Go 服务器变得更容易。</li>
</ul>
</li>
<li><strong>APIMatic 为 Go SDKs 提供的代码生成器</strong>：
<ul>
<li>APIMatic 提供了一个为 Go SDKs 的代码生成器，该生成器从 OpenAPI 定义生成强类型的 SDK 以及完整的 API 引用。如果您想为您的 REST API 创建一个 SDK，这个工具会特别有用。</li>
</ul>
</li>
</ol>
<p>另外，有了一份定义完备详细的接口设计文档，Auto Gen Auto 解决方案才可能实现。它不仅能够生成 API test，还可以生成 performance test 等等。</p>
<h2 id="左移-右移-测试如何在dev和ops领域大展身手" tabindex="-1"><a class="header-anchor" href="#左移-右移-测试如何在dev和ops领域大展身手" aria-hidden="true">#</a> 左移&amp;右移：测试如何在Dev和Ops领域大展身手？</h2>
<p>所以，你要找到更多的土壤让自动化测试落地生长。如果你想在工作中推广自动化测试，哪些落地场景更容易出业绩呢？除了之前说过的回归测试领域，我们不妨把眼光从测试工作放宽到更多的领域，Dev 和 Ops 领域，自动化测试在这些领域里一样可以发挥价值，我叫它自动化测试左移和自动化测试右移。</p>
<h3 id="自动化测试左移" tabindex="-1"><a class="header-anchor" href="#自动化测试左移" aria-hidden="true">#</a> 自动化测试左移</h3>
<p>如果把软件的生命周期的一个个阶段，软件需求分析、软件设计、软件开发、单元测试、集成测试、系统测试，从左向右排列，开发活动在左侧，测试在后面也就是右侧。如下图：</p>
<p><img src="http://sm.nsddd.top/sm202310151527474.png" alt="image-20231015152729411"></p>
<p>测试左移，就是说本来在生命周期后期的测试活动提前，在软件开发阶段就参与进来，能让软件质量内建到开发阶段，而不是在后期通过软件测试去发现。比如在需求分析阶段参与需求评审和规范制定，在软件设计阶段就开始测试案例设计。形象地看，是测试活动从右侧向左侧移动，即测试左移。</p>
<p><img src="http://sm.nsddd.top/sm202310151527891.png" alt="image-20231015152743823"></p>
<p>测试左移后，当然也会带动自动化测试的变化。在传统模式下，按照软件生命周期顺序，自动化测试是这么安排的：编码完成之后运行单元测试，集成阶段运行接口测试，系统阶段运行 UI 自动化测试。</p>
<p><img src="http://sm.nsddd.top/sm202310151529112.png" alt="image-20231015152904051"></p>
<p>这种流水线做法只能说中规中矩，那还有优化提升空间么？从图上看到，我们如果在编码阶段引入了 bug，影响接口的 bug 要等到集成测试阶段才能发现，影响 UI 的 bug 要等到系统阶段才能发现。我们既然已经有了接口和 UI 自动化测试，可不可以把它们利用起来，尽早测试呢？</p>
<p>现在我提出一个新概念，自动化测试左移，在构建阶段建立一个冒烟测试集合的概念，包括单元测试和部分接口测试，甚至部分 UI 自动化测试，它们一起运行，来验证版本的每一次构建甚至代码的每一次提交。只要这个冒烟测试集合足够快和稳定，就可以被开发人员接受。</p>
<p><img src="http://sm.nsddd.top/sm202310151529821.png" alt="image-20231015152959751"></p>
<p>自动化测试左移都有哪些好处呢？</p>
<p>最直观的好处是提早确认代码的变更，满足最终需求，尽早发现回归 bug。软件测试领域有一个理论，叫做验证和确认，在每个软件阶段，都要做两种测试工作：第一是验证当前阶段做好了本阶段要求的事情。比如，编码阶段要把详细设计实现；第二是确认当前阶段实现的功能，可以满足最终的用户需求。</p>
<p>应用到具体场景里，在编码阶段做单元测试这叫验证，在编码阶段运行接口测试和 UI 自动化测试则是确认，都是有价值的测试活动。</p>
<p>此外，自动化测试就像一辆赛车，需要运行调试、持续保养维护，才能调整到最佳状态。</p>
<p>我见过一些团队，只在软件产品发布的时候，才把开发出来的 UI 自动化测试作为验收测试运行一次。这样 UI 自动化测试大概率会失败，测试人员不得不花时间一一解决。不难猜到，在整个发布周期里，UI 功能都变化了很多，相应的漏洞更是不可胜数。久而久之，测试人员就对自动化测试产生了厌烦，把它看成摆设、负担，又重归手工测试的状态。</p>
<p>而自动化测试左移到开发的日常活动中，开发人员每天做一次 code commit，做一次版本构建就会触发自动化测试，运行频率随之提高。一旦自动化测试运行失败，要么是发现了回归 bug，要么是自动化测试需要维护了，问题发现得越早，修复越快，自动化测试就越健康，越稳定可用。在磨合调试的动态过程里，自动化测试越跑越稳定高效，团队也能实实在在体会到它的用处。</p>
<p>所以，自动化测试左移在结果上提高了 ROI，丰富了运行场景，也锻炼了自动化测试项目和人马。火炼真金，大浪淘沙，方能走向成功。</p>
<h3 id="自动化测试右移" tabindex="-1"><a class="header-anchor" href="#自动化测试右移" aria-hidden="true">#</a> 自动化测试右移</h3>
<p>既然有左移，那也存在右移。测试的右移是什么？测试阶段结束，产品就会上线，也就进入了线上运维阶段。所以测试右移是指测试活动介入线上运维，用户画像等工作。这里我说的自动化测试右移，意思是自动化测试也可以在生产环境里运行，起到一个自动检查监测的作用。</p>
<p>你可能会问，线上观测已经有了一套 Ops 流程和工具了，比如 Newrelic 和 Splunk 等，都能监测 Web 服务、API 网关，数据库等全栈环境了。自动化测试线上运行的价值在哪里？</p>
<h3 id="部署后验证测试" tabindex="-1"><a class="header-anchor" href="#部署后验证测试" aria-hidden="true">#</a> 部署后验证测试</h3>
<p>Ops 工具看似很强大，能输出一堆软件服务的各种度量指标，告诉我们软件服务在生产环境里是健康运行的，但是有一个关键的事情，我们无法从 Ops 那里得知：那就是服务是不是按照客户的期望运行的，这对产品价值非常重要，但只有运行测试才能知道。</p>
<p>结合具体场景，我们分析一下这个问题是怎么产生和解决的。</p>
<p>线上升级常用的做法是红绿部署（也叫蓝绿部署）。红绿部署的机制是这样的，当准备升级软件服务时，保持原有的服务红色环境不变，部署一套新的服务绿色环境。在路由层面，把流量切换到绿色环境，完成软件的升级。这样做的好处是，软件升级对用户影响微小，风险也可控。</p>
<p><img src="http://sm.nsddd.top/sm202310151536246.png" alt="image-20231015153632189"></p>
<p>通过 Post Deployment Test 的通过与否，来设定环境是绿色还是红色。像下图：</p>
<p><img src="http://sm.nsddd.top/sm202310151537915.png" alt="image-20231015153714856"></p>
<h3 id="生产环境定时监测" tabindex="-1"><a class="header-anchor" href="#生产环境定时监测" aria-hidden="true">#</a> 生产环境定时监测</h3>
<p>部署升级后，生产环境就开始运行了，直到下一次升级为止。在这段线上运行的时间里，是不是就不再需要测试了呢？</p>
<p>按照传统测试理论，测试的生命周期到正式发布为止，也有的到 Beta 测试为止，而部署到生产环境后，就进入了运维阶段，就是 Ops 工程师的事了，测试人员就不需要关注了。</p>
<p>但在云时代情况发生了变化。软件开发方不仅交付软件服务，而且也控制着服务器的运行环境。因此测试人员的责任从“在软件发布之前发现 bug”变成了“在客户之前发现 bug”。</p>
<p>有很多 bug，在测试环境里是发现不了的，只有生产环境才能暴露。这些跟客户的行为、生产环境的数据、特定的错误扩散模式都有关系。只要我们在客户遇到 bug 之前发现它，测试工作仍然是有价值的。</p>
<p>这时我们可以建立一个机制，通过自动化测试来定时监测生产环境。每天定时触发自动化测试任务的运行，去检测生产环境的业务功能是否正常，然后生成测试报告。</p>
<p><img src="http://sm.nsddd.top/sm202310151538433.png" alt="image-20231015153805363"></p>
<p>对于自动化测试生成的结果报告，我们还可以把它集成到 Ops 的 Oncall 流程里去。当自动化测试任务出了错误，触发 Event 时，就会进入到 Oncall 系统。Oncall 系统会找出值守的测试人员，发送通知，让测试人员来处理测试错误，判断是不是线上出了 bug。</p>
<p><img src="http://sm.nsddd.top/sm202310151538016.png" alt="image-20231015153818943"></p>
<h2 id="cucumber" tabindex="-1"><a class="header-anchor" href="#cucumber" aria-hidden="true">#</a> cucumber</h2>
<p>Cucumber 是一个支持行为驱动开发 (BDD) 的软件工具，它允许开发者、QA 工程师和非技术干系人在软件开发过程中共同参与。以下是 Cucumber 的主要特点和用法：</p>
<ol>
<li><strong>描述行为</strong>：
<ul>
<li>Cucumber 允许用户使用自然语言（通过 Gherkin 语言）编写软件的期望行为。这使得即使是非技术团队成员也能理解和参与到需求和测试的定义中。</li>
</ul>
</li>
<li><strong>自动化测试</strong>：
<ul>
<li>通过将 Gherkin 语言的描述转换为代码，Cucumber 可以自动执行这些描述的测试。这为自动化验收测试提供了一个强大的框架。</li>
</ul>
</li>
<li><strong>支持多种编程语言</strong>：
<ul>
<li>Cucumber 支持多种编程语言，包括 Ruby、Java、JavaScript、Python 等，使其能够集成到多种不同的技术堆栈中。</li>
</ul>
</li>
<li><strong>促进团队协作</strong>：
<ul>
<li>通过提供一个共同理解和描述软件行为的平台，Cucumber 有助于提高开发、测试和业务团队之间的沟通和协作。</li>
</ul>
</li>
<li><strong>持续集成与持续交付（CI/CD）</strong>：
<ul>
<li>Cucumber 可以集成到持续集成和持续交付的流程中，自动执行测试，确保软件的质量。</li>
</ul>
</li>
<li><strong>可插拔和扩展性</strong>：
<ul>
<li>Cucumber 提供了一个可插拔的架构，允许开发者和测试工程师通过插件和自定义代码来扩展其功能。</li>
</ul>
</li>
<li><strong>生成报告</strong>：
<ul>
<li>Cucumber 能够生成易于理解的测试报告，显示哪些测试通过了，哪些测试失败了，以及为什么失败。</li>
</ul>
</li>
</ol>
<p>Cucumber 支持 Go 语言</p>
<p>是的，Cucumber 确实支持 Go 语言，通过一个名为 <strong>Godog</strong> 的项目实现。以下是一些相关的信息：</p>
<ol>
<li><strong>Godog 项目</strong>：
<ul>
<li>Godog 是 Cucumber 的 Go 语言实现，它是 Go 语言的官方 Cucumber BDD（行为驱动开发）框架。该框架合并了规范和测试文档，使用 Gherkin 格式的场景描述来格式化给定的、何时的和然后的规范。值得注意的是，Godog 不会干预标准的 <code v-pre>go test</code> 命令行为。</li>
</ul>
</li>
<li><strong>官方文档</strong>：
<ul>
<li>在 Cucumber 的官方文档中也有提到 Godog，并且有一个 <a href="https://github.com/cucumber/godog" target="_blank" rel="noopener noreferrer">专门的仓库<ExternalLinkIcon/></a> 用于维护 Godog 项目。</li>
</ul>
</li>
<li><strong>GitHub 仓库</strong>：
<ul>
<li>Godog 的 <a href="https://github.com/cucumber/godog" target="_blank" rel="noopener noreferrer">GitHub 仓库<ExternalLinkIcon/></a> 是该项目的官方源代码仓库，你可以在这里找到有关 Godog 的所有信息，包括如何使用它来进行 BDD、示例、文档以及该项目的许可信息。</li>
</ul>
</li>
<li><strong>其他信息</strong>：
<ul>
<li>还有一个相关的 GitHub Issue 提议将 Go（Godog）支持添加到 Cucumber 的 language-service 项目中，这显示了 Cucumber 社区对 Go 语言支持的持续关注和开发。</li>
</ul>
</li>
</ol>
<h2 id="单体到微服务集群要测什么" tabindex="-1"><a class="header-anchor" href="#单体到微服务集群要测什么" aria-hidden="true">#</a> 单体到微服务集群要测什么</h2>
<h3 id="单体怎么测" tabindex="-1"><a class="header-anchor" href="#单体怎么测" aria-hidden="true">#</a> 单体怎么测</h3>
<p>我们现在有一个名为 FoodCome 的应用。它刚开发出来的时候是一个单体系统。</p>
<p>这里要解释一下，什么是单体系统。一般的理解是，单体系统是一个整体，用一种语言开发，一次构建所有代码，产生一个部署实体，在运行态下是一个进程。比如常见的 Web 应用，就是一个 war 包。</p>
<p>这个 FoodCome 就是一个 Web 应用，它为用户提供点餐功能。用户可以通过手机下单点餐，订单生成后，餐馆可以接单，厨房制作完成，转给物流交付给用户。</p>
<p>为了分析测试需求，我们用六边形架构图方法来理清系统内外的交互接口。六边形架构法是把服务画成一个嵌套的六边形，最外层的大六边形是适配器层，代表了本系统和对外的所有交互。里层的六边形是领域业务层。适配器层负责对外交互，这个和业务关系不大，一般是通用的技术，主要是驱动、协议和基础设施，而领域层是业务逻辑的组织和实现。如果你对六边形架构不太熟悉，还可以参考这里了解。</p>
<p><img src="http://sm.nsddd.top/sm202310151549151.png" alt="image-20231015154901026"></p>
<p>FoodCome 是一个单体系统，它运行起来后，外层六边形上的接口有这么 2 种：</p>
<ol>
<li>用户接口，用户有 2 种类型，一个是食客顾客，一个是餐馆业主。顾客通过手机下单，进入到 FoodCome 系统，而餐馆通过 FoodCome 的 Web 客户端可以查看和接受订单。</li>
<li>适配器接口，和第三方系统的集成接口。FoodCome 集成了物流系统、通知系统和支付系统。顾客的订单通过支付系统完成支付后，餐馆开始加工，加工完毕后，食品通过物流系统快递给顾客。整个工作流，都会有状态的变更通知发送给用户。</li>
</ol>
<p>2 种接口明确了，我们再具体分析下测试需求都有哪些。</p>
<p>想定义测试需求，先要明确功能需求。功能需求是描述软件的功能，听着是不是像循环定义？想描述清楚软件的功能并不容易，这里我们借用迈克·凯恩提出的方法，一个软件软件功能需求要回答这三个问题：第一，这个功能存在的价值是什么？第二，软件是怎么实现这个价值的？第三，这个功能能给谁带来价值？</p>
<h4 id="测试需求-bdd-feature" tabindex="-1"><a class="header-anchor" href="#测试需求-bdd-feature" aria-hidden="true">#</a> 测试需求 BDD Feature</h4>
<p>BDD 的全称叫做 Behavior Drive Development，行为驱动开发模式。想达到驱动开发的程度，这个 Behavior 行为的定义就要足够细化，开发人员知道怎么去实现了，同样，测试人员也知道该怎么测试了。</p>
<p><img src="http://sm.nsddd.top/sm202310151556758.png" alt="image-20231015155648532"></p>
<p>BDD 是怎么做的呢？它把 User Story 细化成一个或多个 feature，每一个 feature 都是一个可测试的场景。</p>
<p>这个 feature 的文件书写也是有格式要求的，通过一个叫做 Gherkins 的语法关键字模版来写 feature 文件。</p>
<blockquote>
<p>Gherkins 的语法关键字模版 Gherkins 提供的常见关键字有： 1.Given: 用户场景的前提条件，可以是时间条件，也可以是另外一个用户场景的输出结果。 2.When: 用户在这个场景里做的行为操作 3.Then: 行为的输出结果 4.And: 连接多个关键字</p>
</blockquote>
<p>Gherkins 提供的常见关键字有：</p>
<ol>
<li>Given: 用户场景的前提条件，可以是时间条件，也可以是另外一个用户场景的输出结果。</li>
<li>When: 用户在这个场景里做的行为操作</li>
<li>Then: 行为的输出结果</li>
<li>And: 连接多个关键字</li>
</ol>
<h3 id="微服务怎么测" tabindex="-1"><a class="header-anchor" href="#微服务怎么测" aria-hidden="true">#</a> 微服务怎么测</h3>
<p>同时，软件技术也在发展，出现了 VMware、Docker 和 Kubernetes 等轻量化部署方式，这使得拆分的困难变小，部署的成本降低。微服务架构诞生后，一个系统拆分成多个独立开发和运行的服务，这个服务不管大小，业界都管它叫微服务。它们也有一套服务治理的技术规范，用来保证部署和运行的可靠性和扩展性。</p>
<p>随着业务规模的扩大，开发人手增加，FoodCome 被拆分成 5 个微服务，具体如下：</p>
<ul>
<li>订单服务：处理用户下的订单；</li>
<li>物流服务：Foodcome 内部的物流管理，与外部物流对接；</li>
<li>餐馆服务：管理餐馆的信息，参与订单的工作流；</li>
<li>账户服务：管理订单里的顾客信息，和外部的支付系统对接。</li>
<li>通知服务：产生消息通知用户，和外部的邮件系统对接。</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202310151558410.png" alt="image-20231015155800338"></p>
<p>在这个架构下，原先单体应用的对外接口保持不变，但是单体应用内部被 5 个独立的微服务取代。用户的订单请求先通过 API 网关到达订单服务，完成支付后，餐馆接单，再通过物流系统交付订单。</p>
<p>每个微服务实现自治，独立开发和发布部署，加快发布速度。而且增加新功能也很方便，比如登录鉴权，在这个图中再增加一个认证服务就可以，这是给客户带来的好处。</p>
<p>现在的问题是，这给测试带来哪些变化呢？分拆后，FoodCome 系统变成了微服务集群，就像一部巨大机器，由多个零件组成，互相咬合，一起工作。作为测试人员，不但要验证每个零件是合格的，还要有办法预测它们组装起来的机器也能正常工作。</p>
<p><strong>这里的测试难点是，微服务的数量增加，服务间的交互量也会剧增，相比单体系统，集成测试在微服务集群架构下更加关键。</strong></p>
<p>要做集成测试，我们就先搞明白微服务间是怎么交互的。在微服务架构下，交互可以有多种风格，比如 RPC 远程过程调用、REST 风格、Message Queue 消息队列等等。根据交互的方法和风格，我把它们整理出一个表格，方便你理解。</p>
<p><img src="http://sm.nsddd.top/sm202310151622855.png" alt="image-20231015162237793"></p>
<p>在 FoodCome 采用了两种交互方式，RestAPI 和 Message Queue。</p>
<p>RestAPI 用来处理实时性强的服务间交互，比如前端通过 API 网关调用订单服务来下订单。</p>
<p><img src="http://sm.nsddd.top/sm202310151639976.png" alt="image-20231015163956916"></p>
<p>Message Queue 用来处理异步的交互，订单服务和通知服务之间通过 Message Queue 来交换信息.</p>
<p><img src="http://sm.nsddd.top/sm202310151640438.png" alt="image-20231015164011165"></p>
<p>下面我们来看一下这两种交互方式的具体实现，然后找出测试点。</p>
<h3 id="rest" tabindex="-1"><a class="header-anchor" href="#rest" aria-hidden="true">#</a> REST</h3>
<p>我们需要先知道 Rest 接口是怎么设计的，才能找出后面都要测什么。</p>
<p><strong>什么是 REST</strong></p>
<p>REST 是 Representational State Transfer 的缩写，叫做表现层状态转换。听起来挺拗口，但我一说你就能懂，它其实是一组松散的规范，不是严格的协议，也不是强制的标准。这个规范的目的就是让 API 的设计更加简单易懂。</p>
<p>它包含以下几个基本原则：</p>
<ol>
<li>REST 是基于 HTTP 协议的；</li>
<li>通过 HTTP 的 URL 暴露 Resource 资源；</li>
<li>通过 HTTP 的操作原语，提供对 Resource 的操作，GET、 POST、PUT、DELETE 对应着增删改查的操作。</li>
</ol>
<p>只要开发人员懂 HTTP 协议，按照上面的规则用 REST 风格表达他的 API 是很容易的。同样，另外一个开发人员看到 REST API，也很快就能知道这些 API 是干什么用的，几乎不用看难懂的文档。</p>
<p>这是 REST 的优点，REST 风格下设计的 AP，学习成本非常低，所以互联网上有很多服务都是通过 REST 方式对外提供 API，比如亚马逊的 AWS 云服务、Google 的 Document 服务等等。</p>
<h3 id="order-service-的-rest-api-设计" tabindex="-1"><a class="header-anchor" href="#order-service-的-rest-api-设计" aria-hidden="true">#</a> Order Service 的 REST API 设计</h3>
<p>遵循 REST 规范，Order Service 的接口设计可以按照“名词 - 动词”的思路来捋清。</p>
<p>首先寻找名词，Order，它对应 REST 上的一个 Resource 资源：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>http://api.foodcome.com/api/v1/orders
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再找到动词“下单”，它对应 HTTP 协议上的 POST 原语，对 Orders 资源发送 POST 请求就是下单：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>POST http://api.foodcome.com/api/v1/orders
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之后将“查询订单”这个动词，转成 HTTP 协议上的 GET 原语，查询条件 orderID 以参数形式加在 URL 里：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>GET http://api.foodcome.com/api/v1/orders?orderID<span class="token operator">=</span><span class="token number">123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，修改订单使用 PUT 原语，删除订单使用 DELETE 原语。</p>
<p>我们再用同样的方法来把其他名词“顾客”和“餐馆”，转成 Resource 和操作：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>http://api.foodcome.com/api/v1/customers
http://api.foodcome.com/api/v1/restaurants
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="order-service-的-restapi-规格定义" tabindex="-1"><a class="header-anchor" href="#order-service-的-restapi-规格定义" aria-hidden="true">#</a> Order service 的 RestAPI 规格定义</h3>
<p>不成熟的开发团队，经常是一边写代码，一边设计 API，这样做的结果不难推测，一千个开发人员会写出一千个 Order Service API，虽然他们都声称遵循了 REST 规范。</p>
<p>所以，好的实践是，开发团队需要先设计 RestAPI，并把它表达出来，然后团队就可以进行评审，达成理解一致。</p>
<p>那表达的载体是什么呢？这里就要提到 Interface Definition Language 这个概念了，顾名思义，IDL 是接口定义语言，它通过一种独立于编程语言的语法规则来描述 API。不同类型的 API，它的 IDL 是不一样的。</p>
<p>我们用 REST 主流的 IDL，也就是 OpenAPI 的语法规范，来描述下订单的这个接口的参数，把请求和响应写在一个 YAML 文件里。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">"/api/v1/orders"</span><span class="token punctuation">:</span>
    <span class="token key atrule">post</span><span class="token punctuation">:</span>
      <span class="token key atrule">consumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> application/json
      <span class="token key atrule">produces</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> application/json
      <span class="token key atrule">parameters</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">in</span><span class="token punctuation">:</span> body
        <span class="token key atrule">name</span><span class="token punctuation">:</span> body
        <span class="token key atrule">description</span><span class="token punctuation">:</span> order placed for Food 
        <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">properties</span><span class="token punctuation">:</span>
          <span class="token key atrule">foodId</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
          <span class="token key atrule">shipDate</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> Date
          <span class="token key atrule">status</span><span class="token punctuation">:</span>
            <span class="token key atrule">type</span><span class="token punctuation">:</span> String
            <span class="token key atrule">enum</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> placed
            <span class="token punctuation">-</span> accepted
            <span class="token punctuation">-</span> delivered
      <span class="token key atrule">responses</span><span class="token punctuation">:</span>
        <span class="token key atrule">'200'</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> successful operation
        <span class="token key atrule">'400'</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> invalid order
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到这里，FoodCome 服务间的 REST 接口规格说明书就生成了！</p>
<p>这个规格说明书定义了客户端和服务端之间的契约，顾客要下单的话，客户端应该向服务端 <code v-pre>api/v1/orders</code> 发送一个请求，里面包含了食品的代码、日期等等，而服务端成功则返回一个 <code v-pre>HTTP 200</code> 的响应，失败返回一个 <code v-pre>HTTP 400</code> 的响应。</p>
<h3 id="异步消息" tabindex="-1"><a class="header-anchor" href="#异步消息" aria-hidden="true">#</a> 异步消息</h3>
<p>说完了同步常用的 REST，我们再分析一下异步消息。</p>
<p>什么是异步消息呢？消息就是客户端和服务端交换的数据，而异步指的是调用的方式，客户端不用等到服务端处理完消息，就可以返回。等服务端处理完，再通知客户端。</p>
<p>异步消息在微服务集群的架构里，能够起到削峰、解耦的作用。比如 FoodCome 在订餐高峰时段，先把订单收下来，放到消息队列，排好队，等待餐馆一个个处理。所以异步消息是现在业界很常用的一种服务交互方式，它的技术原理是消息队列，技术实现是消息代理，有 Kafka、RabbitMQ 等等。</p>
<p>而开发人员在设计微服务时，首先要设计异步消息接口，定义好我的微服务什么时候往消息队列里放消息，放什么样的消息。同样，也要定义好取消息的时机和方法。</p>
<h3 id="异步消息接口设计" tabindex="-1"><a class="header-anchor" href="#异步消息接口设计" aria-hidden="true">#</a> 异步消息接口设计</h3>
<p>首先，要定义消息体，订单服务会向外发出三种消息 OrderCreated、OrderUpdated、OrderCancelled。消息里包含了 order ID、order items、order Status 这些字段。</p>
<p>其次，还要说明这个消息发送到哪个 channel 里。Channel 就是消息的队列，一个消息代理里可以有多个 channel，每个 channel 有不同的功能。</p>
<p>因为 order 的消息有严格的时序，比如，OrderCancelled 和 OrderCreated 这两个消息的顺序反了的话，会引起程序处理的混乱。所以，我们把这三种消息都发送到一个叫 order 的 channel 里。</p>
<p><img src="http://sm.nsddd.top/sm202310151719011.png" alt="image-20231015171958926"></p>
<h3 id="异步消息接口规格说明书" tabindex="-1"><a class="header-anchor" href="#异步消息接口规格说明书" aria-hidden="true">#</a> 异步消息接口规格说明书</h3>
<p>好，下面就到关键环节了，对于测试人员来说，我们最关心的就是接口规格说明书，跟 REST 一样，消息队列也需要找到 IDL 来描述接口上的信息。</p>
<p>RestAPI 的主流 IDL 是 OpenAPI，相对应地，MessageAPI 的 IDL 是 AsyncAPI。上面的 Order 消息接口，用 AsyncAPI 规范来定义，会是下面这个样子：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">asyncapi</span><span class="token punctuation">:</span> 2.2.0
<span class="token key atrule">info</span><span class="token punctuation">:</span>
  <span class="token key atrule">title</span><span class="token punctuation">:</span> 订单服务
  <span class="token key atrule">version</span><span class="token punctuation">:</span> 0.1.0
<span class="token key atrule">channels</span><span class="token punctuation">:</span>
  <span class="token key atrule">order</span><span class="token punctuation">:</span>
    <span class="token key atrule">subscribe</span><span class="token punctuation">:</span>
      <span class="token key atrule">message</span><span class="token punctuation">:</span>
        <span class="token key atrule">description</span><span class="token punctuation">:</span> Order created.
        <span class="token key atrule">payload</span><span class="token punctuation">:</span>
          <span class="token key atrule">type</span><span class="token punctuation">:</span> object
          <span class="token key atrule">properties</span><span class="token punctuation">:</span>
            <span class="token key atrule">orderID</span><span class="token punctuation">:</span>
              <span class="token key atrule">type</span><span class="token punctuation">:</span> Integer
            <span class="token key atrule">orderStatus</span><span class="token punctuation">:</span>
              <span class="token key atrule">type</span><span class="token punctuation">:</span> string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码描述的是，订单服务在运行时会向 Order channel 输出 OrderCreated 消息，这个 OrderCreated 消息包含了 2 个字段，order 的 ID 和 order 的状态。</p>
<h3 id="在设计阶段测试要做什么" tabindex="-1"><a class="header-anchor" href="#在设计阶段测试要做什么" aria-hidden="true">#</a> 在设计阶段测试要做什么？</h3>
<p>刚刚我们花了不少篇幅分析 API 设计，如果你之前一直只做测试，也许会疑惑：“这些看起来是开发领域的知识啊，是不是跑题了？”其实我想说的是，API 领域是开发、测试共同关注的。测试应该主动参与到这些领域的活动，才能让测试更加有效。</p>
<p>我曾经看到过两个微服务团队各自开发都很快，但是微服务一上线，就发现问题了，有的是接口就对不上，有的是数据类型不一致等等千奇百怪的问题，这些问题花了大把诊断时间不说，甚至会给客户带来损失。</p>
<p><strong>第一，测试设计先行原则</strong></p>
<p>测试设计先行，需要的是开发设计先行。开发不做设计，测试干着急也没法设计。怎么督促开发设计先行呢？一个关键指标是，它在设计阶段是否输出了接口规格说明书。对于开发工作来说，是需要去代码实现的开发需求。对于测试工作来说，它就是测试需求，需要根据它写测试案例。</p>
<p><strong>第二，找到合适的 IDL 来表达接口设计。</strong></p>
<p>一份周密、高质量的测试需求，会是成功测试的开始。所以这个接口规格说明书不仅要有，还得规范，能指导我们生成测试案例。</p>
<p>怎么做到呢？让开发人员写一份 Word 文档？一千个开发人员能写出一千个规格说明。这时，IDL 的价值就显现出来了，它提供一套规范和语法，像一门专用语言，能精准描述接口。而且它与编程语言无关，可以根据 IDL 做 Java 的实现，也可以是 C++, JavaScript，Python 等等。</p>
<p>OpenAPI 和 AsyncAPI 是 IDL 族群里的 2 种。我这里列出一个常见的 IDL 列表，你可以看看你领域里的 IDL 是什么。</p>
<p><img src="http://sm.nsddd.top/sm202310151837291.png" alt="image-20231015183758196"></p>
<h2 id="_3ku法则-为一个订餐系统设计全栈测试方案" tabindex="-1"><a class="header-anchor" href="#_3ku法则-为一个订餐系统设计全栈测试方案" aria-hidden="true">#</a> 3KU法则：为一个订餐系统设计全栈测试方案</h2>
<p>对于一个订餐系统来说，我们把测试需求整理如下：</p>
<p><img src="http://sm.nsddd.top/sm202310151840132.png" alt="image-20231015184013038"></p>
<p>订餐系统还有很多其他的测试需求，比如兼容性、安全性等等，因为本专栏的关注点是自动化测试，我在这里就不再列出来了。</p>
<h3 id="做不做自动化测试" tabindex="-1"><a class="header-anchor" href="#做不做自动化测试" aria-hidden="true">#</a> 做不做自动化测试？</h3>
<p>有了文档化的测试需求列表后，我们在设计自动化测试方案时，需要先想清楚，这些需求做不做自动化测试？</p>
<p><strong>测试四象限法</strong> 则能帮我们有效完成这个思考过程。这个测试四象限，是布雷·麦瑞克提出来的方法模型：根据需求的性质和等级 2 个维度，对测试需求进行分类。</p>
<p>一个维度是 <strong>测试需求的性质</strong>，是技术性还是业务性的？通俗来说就是，如果这个需求越靠近程序员的思维，比如算法、接口、事务等等，它的技术性就越强；而越靠近用户的思维，比如工作流，场景等等，就是业务性越强。</p>
<p>另一个维度是 <strong>测试需求的等级</strong>，也就是需求属于关键性的还是精益性的？你可以这样理解，关键性的需求指的是，对于用户显式而重要的需求。比方说，一个系统必须能下单，才能成为订餐系统。而精益性的需求指的是用户隐式的需求，没有直接表达出来，但也可能很重要，比如性能、可靠性等等。</p>
<p>好，明白了性质和等级这 2 个维度后，我们现在用这两个维度把测试需求列表过一遍，把它们填到象限里。</p>
<p><img src="http://sm.nsddd.top/sm202310151843989.png" alt="image-20231015184305902"></p>
<p>先看算法、接口、分布式事务测试，它们技术性强、也是关键需求，放在了第一象限，WebUI 测试业务性强且属于关键需求，放在了第二象限，易用性测试放在第三象限，性能和可靠性放在第四象限。</p>
<p><strong>针对每个象限，测试四象限法建议自动化测试实施策略如下：</strong></p>
<ul>
<li>第一象限里的测试需求是 100% 全部自动化；</li>
<li>第二象限里的测试需求是自动化 + 手工；</li>
<li>第三象限里的测试需求是手工测试；</li>
<li>第四象限里的测试需求是通过工具和框架来执行，追求 0 代码。</li>
</ul>
<p>四象限的策略你不必死记硬背，因为这些只是表象，底层逻辑还是 ROI，学会了分析思路你自己也可以推导结论。</p>
<p>举例来说，第一象限里的算法和接口测试，因为它们验证的是关键功能，所以回归测试高，自动化测试收益就大。而技术性强，意味着这类测试不会因业务变化受太大影响，所以开发、维护的成本就低。因此，第一象限的测试需求可以 100% 自动化。至于其他象限的情况，你可以自己试着推演一下，同样符合 ROI 的规律。</p>
<h3 id="在哪个层面做自动化测试" tabindex="-1"><a class="header-anchor" href="#在哪个层面做自动化测试" aria-hidden="true">#</a> 在哪个层面做自动化测试？</h3>
<p>确定了测试方式，我们还要进一步考虑，这些测试需求的自动化测试是应该在哪个层面实现呢？在单元测试、接口测试还是 UI 自动化测试？</p>
<p>在专栏的第二讲里，我们学习过 3KU 测试矩阵和 3KU 测试金字塔，那就可以把它们应用到 FoodCome 的自动化测试设计了。</p>
<p>排除掉前面表格里提到的手工测试项，我们把其余内容填入到 3KU 测试矩阵里。</p>
<p><img src="http://sm.nsddd.top/sm202310151901386.png" alt="image-20231015190144305"></p>
<p>按照自动化测试寻求最大 ROI 实施层面原则，我们把上面的表格，转换成 ROI 自动化测试金字塔。</p>
<img src="http://sm.nsddd.top/sm202310151901112.png" alt="image-20231015190158033" style="zoom:50%;" />
<h3 id="什么工具做自动化测试" tabindex="-1"><a class="header-anchor" href="#什么工具做自动化测试" aria-hidden="true">#</a> 什么工具做自动化测试？</h3>
<p>选择对了工具和框架，会让自动化测试事半功倍。这个“选对”的意思，就是工具必须适合你的项目、你的团队。</p>
<ul>
<li>在工作量较小的 UI 测试，工具的稳定性最重要，其次追求效率</li>
<li>在工作量大的单元测试和接口测试，要选择成熟和支持模块化开发的工具</li>
</ul>
<h3 id="运行自动化测试" tabindex="-1"><a class="header-anchor" href="#运行自动化测试" aria-hidden="true">#</a> 运行自动化测试</h3>
<p>在自动化测试方案里，除了做不做自动化测试，以及在哪个层面做。我们还要考虑清楚另外一个事，就是自动化测试开发出来后，它们在什么时候运行。</p>
<p>我们再说ROI 的时候，经常提到一个自动化测试的收益，其重要因子之一就是它的运行次数。所以，设计 ROI 高的自动化测试的运行场景是很关键的，而软件部署管线 Deployment Pipeline 就是重要的自动化测试运行场景之一。</p>
<p>那 Deployment Pipleline 是怎么设计的呢？先从概念说起，在 2010 年，Jez Humble 出版了《持续交付》一书，这里提出了部署管线的概念：</p>
<blockquote>
<p>“部署管线是代码从开发人员的个人电脑到生产环境的自动化过程”。</p>
</blockquote>
<p>为什么会叫管线呢？因为部署管线由一系列测试的阶段组成，每个阶段首尾相接，这就形成了一条流水线一样的管道。</p>
<p><img src="http://sm.nsddd.top/sm202310151905862.png" alt="image-20231015190522787"></p>
<p>我们把 FoodCome 的自动化测试任务，填充到部署管线的各个阶段里去，如下图所示：</p>
<p><img src="http://sm.nsddd.top/sm202310151905204.png" alt="image-20231015190551125"></p>
<p>沿着部署管线发布的方向，也就是从左向右，自动化测试的运行速度由快变慢，而 ROI 也是由高到低。越靠近代码，活动越频繁，ROI 就越高，而每一个关卡都会有失败的，最后能成功到达可部署生产环境的会是很少一部分，十次代码变更能有二次到生产环境。</p>
<p>这对于 Actions 中的设计也是很巧妙的，到底是并行执行，还是依次执行。</p>
<h2 id="单元测试" tabindex="-1"><a class="header-anchor" href="#单元测试" aria-hidden="true">#</a> 单元测试</h2>
<p>单元测试是最基本的测试，是 ROI 最顶部的测试，投入产出比最高</p>
<p>现在 Order 服务的开发想要测试自己写的这些代码是否预期运转，他最先想到的办法可能是，把 Order 服务构建完运行起来，向它发送 <code v-pre>HTTP Request “POST /api/v1/orders” </code> , 然后检查返回的 Response 内容，看是不是订单已经如期生成。</p>
<p>这个方法当然也能达到测试目标，但是你已经学习过了 3KU 原则，就可以问开发人员一个问题 “同样的验证目标，能不能在 ROI 更高的单元测试阶段实现？”</p>
<h3 id="制定单元测试策略" tabindex="-1"><a class="header-anchor" href="#制定单元测试策略" aria-hidden="true">#</a> 制定单元测试策略</h3>
<p>比如，对于一个订单系统（Order）来说。</p>
<p><img src="http://sm.nsddd.top/sm202310152036616.png" alt="image-20231015203630443"></p>
<p>我们先看图里的蓝色色块，通过这五个 Class 就能实现 Order 服务。</p>
<p>它们是这样分工的：OrderController 接收 Client 发来的 <code v-pre>POST /api/v1/orders&quot; request</code>, 交传给 OrderService createOrder 方法处理，再把生成的订单信息封装成 Response 返还给 Client；</p>
<p>OrderService 是主要的业务逻辑类，它的 createOrder 完成了一个订单创建的所有工作，计算价格、优惠扣减，调用 AccountClient 做支付验证，调用 RestaurantClient 做餐馆库存查验。订单生成后，就交给 OrderRepository 去写 DB 生成订单记录。</p>
<p>OrderRepository 实现了和 Order 自带的数据库交互，读写操作。</p>
<p>知道了这些，还无法马上动工写单元测试代码，我们还需要考虑清楚后面这几件事。</p>
<h3 id="需要写多少个-test-class" tabindex="-1"><a class="header-anchor" href="#需要写多少个-test-class" aria-hidden="true">#</a> 需要写多少个 Test Class？</h3>
<p>这里我需要交代一个背景知识，那就是单元测试里的“单元”是什么？</p>
<p>如果你问不同的开发人员，可能会得到非常不一样的答案。在过程语言里，比如 C、脚本语言，单元应该就是一个函数，单元测试就是调用这个函数，验证它的输出。而面向对象语言，C++ 或者 Java，单元是一个 Production Class。</p>
<p>FoodCome 系统是 Java 面向对象语言开发的，包含 5 个 Production Class，做单元测试，我们把规则设得简单一点，开发一个 Test Class 去测试一个 Production Class，保持一对一的关系。</p>
<p>如下图所示，一个 Test Class 有多个 Test Method。每个 Method 会 Setup 建立 Production Class 的上下文环境，Execute 调用 Production Class 的 Method，Assert 验证输出，TearDown 销毁上下文。</p>
<p><img src="http://sm.nsddd.top/sm202310152050814.png" alt="image-20231015205031723"></p>
<h3 id="孤立型还是社交型" tabindex="-1"><a class="header-anchor" href="#孤立型还是社交型" aria-hidden="true">#</a> 孤立型还是社交型？</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"testing"</span>
	<span class="token string">"github.com/stretchr/testify/mock"</span>
	<span class="token string">"github.com/stretchr/testify/assert"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义模拟对象</span>
<span class="token keyword">type</span> MockOrderRepository <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	mock<span class="token punctuation">.</span>Mock
<span class="token punctuation">}</span>

<span class="token keyword">type</span> MockAccountClient <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	mock<span class="token punctuation">.</span>Mock
<span class="token punctuation">}</span>

<span class="token keyword">type</span> MockRestaurantClient <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	mock<span class="token punctuation">.</span>Mock
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestOrderService</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化 mock 对象</span>
	orderRepository <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>MockOrderRepository<span class="token punctuation">)</span>
	accountClient <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>MockAccountClient<span class="token punctuation">)</span>
	restaurantClient <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>MockRestaurantClient<span class="token punctuation">)</span>

	<span class="token comment">// 创建 OrderService 实例</span>
	orderService <span class="token operator">:=</span> <span class="token function">NewOrderService</span><span class="token punctuation">(</span>orderRepository<span class="token punctuation">,</span> accountClient<span class="token punctuation">,</span> restaurantClient<span class="token punctuation">)</span>

	<span class="token comment">// 定义测试用例的输入和期望输出</span>
	orderDetails <span class="token operator">:=</span> <span class="token operator">&amp;</span>OrderDetails<span class="token punctuation">{</span>
		<span class="token comment">// ... 初始化订单详情 ...</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 定义 mock 对象的期望行为</span>
	<span class="token comment">// 例如：</span>
	<span class="token comment">// accountClient.On("SomeMethod", someInput).Return(someOutput)</span>

	<span class="token comment">// 执行测试用例</span>
	err <span class="token operator">:=</span> orderService<span class="token punctuation">.</span><span class="token function">CreateOrder</span><span class="token punctuation">(</span>orderDetails<span class="token punctuation">)</span>
	
	<span class="token comment">// 断言测试结果</span>
	assert<span class="token punctuation">.</span><span class="token function">Nil</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> err<span class="token punctuation">,</span> <span class="token string">"Error should be nil"</span><span class="token punctuation">)</span>
	
	<span class="token comment">// 验证 mock 对象的期望行为是否都被调用</span>
	orderRepository<span class="token punctuation">.</span><span class="token function">AssertExpectations</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span>
	accountClient<span class="token punctuation">.</span><span class="token function">AssertExpectations</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span>
	restaurantClient<span class="token punctuation">.</span><span class="token function">AssertExpectations</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>: 这里我们使用了 <code v-pre>github.com/stretchr/testify/assert</code> 和 <code v-pre>github.com/stretchr/testify/mock</code> 这两个包来辅助我们进行断言和模拟对象的操作。你需要使用 Go 的包管理工具（如 Go Modules）来获取这两个依赖。</p>
<p>在这个基本例子中，你可以：</p>
<ul>
<li>使用 <code v-pre>Mock</code> 结构体来模拟 <code v-pre>OrderService</code> 依赖的服务。</li>
<li>使用 <code v-pre>On</code> 和 <code v-pre>Return</code> 方法来定义模拟对象的期望行为。</li>
<li>使用 <code v-pre>AssertExpectations</code> 方法来检查模拟对象的期望行为是否都被调用。</li>
<li>使用 <code v-pre>assert</code> 函数来进行断言检查。</li>
</ul>
<p>在 Go 语言的单元测试中，我们可以通过表格驱动测试（table-driven tests）来实现类似于 JUnit <code v-pre>@DataProvider</code> 的功能。这样，我们可以用一组测试用例来测试一个函数，而不必为每个测试用例都写一个单独的测试函数。这也是 Go 测试中非常常见的一种模式。</p>
<p>接下来的 Go 代码示例展示了如何使用表格驱动测试来测试一个名为 <code v-pre>determineFinalPrice</code> 的函数（假设这个函数属于一个名为 <code v-pre>OrderService</code> 的结构体，并接收一个名为 <code v-pre>OrderDetails</code> 的参数，返回一个最终价格）。另外，考虑到你提到的优惠券和价格计算的复杂性，这些测试用例可能会包括各种各样的输入和预期输出。具体的测试逻辑和断言可能需要你根据实际的业务逻辑进行调整。</p>
<p>以下是用 Go 语言实现的单元测试示例：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"testing"</span>
	<span class="token string">"github.com/stretchr/testify/assert"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> OrderDetails <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// ... 具体的字段和类型 ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> OrderService <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// ... 其他依赖和字段 ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>os <span class="token operator">*</span>OrderService<span class="token punctuation">)</span> <span class="token function">determineFinalPrice</span><span class="token punctuation">(</span>details <span class="token operator">*</span>OrderDetails<span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	<span class="token comment">// ... 实现价格计算的逻辑 ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestDetermineFinalPrice</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化 OrderService 实例（如果有依赖，可能需要使用 mock 对象）</span>
	orderService <span class="token operator">:=</span> <span class="token operator">&amp;</span>OrderService<span class="token punctuation">{</span>
		<span class="token comment">// ... 初始化字段和依赖 ...</span>
	<span class="token punctuation">}</span>
	
	<span class="token comment">// 定义一组测试用例</span>
	tests <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span> <span class="token punctuation">{</span>
		name          <span class="token builtin">string</span>       <span class="token comment">// 测试用例的名称</span>
		input         OrderDetails <span class="token comment">// 输入数据</span>
		expectedPrice <span class="token builtin">float64</span>      <span class="token comment">// 预期的价格</span>
	<span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token punctuation">{</span>
			name<span class="token punctuation">:</span> <span class="token string">"test case 1"</span><span class="token punctuation">,</span>
			input<span class="token punctuation">:</span> OrderDetails<span class="token punctuation">{</span>
				<span class="token comment">// ... 初始化测试数据 ...</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
			expectedPrice<span class="token punctuation">:</span> <span class="token number">100.0</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span>
			name<span class="token punctuation">:</span> <span class="token string">"test case 2"</span><span class="token punctuation">,</span>
			input<span class="token punctuation">:</span> OrderDetails<span class="token punctuation">{</span>
				<span class="token comment">// ... 初始化测试数据 ...</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
			expectedPrice<span class="token punctuation">:</span> <span class="token number">200.0</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// ... 更多测试用例 ...</span>
	<span class="token punctuation">}</span>
	
	<span class="token comment">// 遍历并运行测试用例</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tt <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span>
		t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			actualPrice <span class="token operator">:=</span> orderService<span class="token punctuation">.</span><span class="token function">determineFinalPrice</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tt<span class="token punctuation">.</span>input<span class="token punctuation">)</span>
			assert<span class="token punctuation">.</span><span class="token function">Equal</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> tt<span class="token punctuation">.</span>expectedPrice<span class="token punctuation">,</span> actualPrice<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中：</p>
<ul>
<li>我们定义了一个测试用例的切片（<code v-pre>tests</code>），每个测试用例包括名称、输入数据和预期输出。</li>
<li>我们使用 <code v-pre>t.Run()</code> 函数来为每个测试用例执行一个子测试，这样我们可以清晰地看到每个测试用例的运行结果。</li>
<li>我们使用 <code v-pre>assert.Equal()</code> 函数来断言实际输出和预期输出是否相等。</li>
</ul>
<p>你可能需要根据你的实际业务逻辑来调整 <code v-pre>OrderDetails</code> 结构体的定义、<code v-pre>determineFinalPrice</code> 函数的。</p>
<h3 id="提高单元测试-roi" tabindex="-1"><a class="header-anchor" href="#提高单元测试-roi" aria-hidden="true">#</a> 提高单元测试 ROI</h3>
<p>既然单元测试又好又快，那么我们不妨把一些费力气的测试工作挪到这一层。哪些测试比较麻烦呢？</p>
<p>线上购物的场景就很典型，你在网购时一定用过优惠券，这些优惠券的使用条件十分复杂：要知道在什么时间、什么商品会有多大折扣，而且优惠券还存在叠加使用的情况，又有了各种规则，能把人搞晕。但用户可以晕，平台却不能晕，用了优惠券，最终结果还要非常精准地保证盈利，不能亏。</p>
<p>要是在 UI 层面测试优惠券，你需要重复运行大量的测试数据，来产生不同的优惠条件，这个代价是高昂的。</p>
<p>放在单元测试里，这个 TestCase 就好理解了。负责价格计算的是 OrderService 里的 determineFinalPrice 方法，在 determineFinalPrice 里需要考虑和计算各种优惠条件和规则，再输出一个最终价格。</p>
<h3 id="go-语言中如何写好单元测试" tabindex="-1"><a class="header-anchor" href="#go-语言中如何写好单元测试" aria-hidden="true">#</a> Go 语言中如何写好单元测试</h3>
<p>如何写好单元测试？</p>
<p>首先，学会写测试用例。比如如何测试单个函数/方法；比如如何做基准测试；比如如何写出简洁精炼的测试代码；再比如遇到数据库访问等的方法调用时，如何 <code v-pre>mock</code>。</p>
<p>然后，写可测试的代码。<code v-pre>高内聚，低耦合</code>是软件工程的原则，同样，对测试而言，函数/方法写法不同，测试难度也是不一样的。职责单一，参数类型简单，与其他函数耦合度低的函数往往更容易测试。我们经常会说，“这种代码没法测试”，这种时候，就得思考函数的写法可不可以改得更好一些。为了代码可测试而重构是值得的。</p>
<p>而且值得注意的是，Go 语言比较推荐将单元测试的测试文件和源代码文件放在一起。</p>
<p>测试文件以 <code v-pre>_test.go</code> 结尾。比如，当前 package 有 <code v-pre>calc.go</code> 一个文件，我们想测试 <code v-pre>calc.go</code> 中的 <code v-pre>Add</code> 和 <code v-pre>Mul</code> 函数，那么应该新建 <code v-pre>calc_test.go</code> 作为测试文件。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>example<span class="token operator">/</span>
   <span class="token operator">|</span><span class="token operator">--</span>calc<span class="token punctuation">.</span><span class="token keyword">go</span>
   <span class="token operator">|</span><span class="token operator">--</span>calc_test<span class="token punctuation">.</span><span class="token keyword">go</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假如 <code v-pre>calc.go</code> 的代码如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Mul</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">*</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么 <code v-pre>calc_test.go</code> 中的测试用例可以这么写：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"testing"</span>

<span class="token keyword">func</span> <span class="token function">TestAdd</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> ans <span class="token operator">:=</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ans <span class="token operator">!=</span> <span class="token number">3</span> <span class="token punctuation">{</span>
		t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"1 + 2 expected be 3, but %d got"</span><span class="token punctuation">,</span> ans<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> ans <span class="token operator">:=</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ans <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">30</span> <span class="token punctuation">{</span>
		t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"-10 + -20 expected be -30, but %d got"</span><span class="token punctuation">,</span> ans<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>测试用例名称一般命名为 <code v-pre>Test</code> 加上待测试的方法名。</li>
<li>测试用的参数有且只有一个，在这里是 <code v-pre>t *testing.T</code>。</li>
<li>基准测试(benchmark)的参数是 <code v-pre>*testing.B</code>，TestMain 的参数是 <code v-pre>*testing.M</code> 类型。</li>
</ul>
<p>运行 <code v-pre>go test</code>，该 package 下所有的测试用例都会被执行。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>$ <span class="token keyword">go</span> test
ok      example <span class="token number">0</span><span class="token punctuation">.</span>009s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>或 <code v-pre>go test -v</code>，<code v-pre>-v</code> 参数会显示每个用例的测试结果，另外 <code v-pre>-cover</code> 参数可以查看覆盖率。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>$ <span class="token keyword">go</span> test <span class="token operator">-</span>v
<span class="token operator">==</span><span class="token operator">=</span> RUN   TestAdd
<span class="token operator">--</span><span class="token operator">-</span> PASS<span class="token punctuation">:</span> TestAdd <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">.</span>00s<span class="token punctuation">)</span>
<span class="token operator">==</span><span class="token operator">=</span> RUN   TestMul
<span class="token operator">--</span><span class="token operator">-</span> PASS<span class="token punctuation">:</span> TestMul <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">.</span>00s<span class="token punctuation">)</span>
PASS
ok      example <span class="token number">0</span><span class="token punctuation">.</span>007s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果只想运行其中的一个用例，例如 <code v-pre>TestAdd</code>，可以用 <code v-pre>-run</code> 参数指定，该参数支持通配符 <code v-pre>*</code>，和部分正则表达式，例如 <code v-pre>^</code>、<code v-pre>$</code>。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>$ <span class="token keyword">go</span> test <span class="token operator">-</span>run TestAdd <span class="token operator">-</span>v
<span class="token operator">==</span><span class="token operator">=</span> RUN   TestAdd
<span class="token operator">--</span><span class="token operator">-</span> PASS<span class="token punctuation">:</span> TestAdd <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">.</span>00s<span class="token punctuation">)</span>
PASS
ok      example <span class="token number">0</span><span class="token punctuation">.</span>007s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="子测试-subtests" tabindex="-1"><a class="header-anchor" href="#子测试-subtests" aria-hidden="true">#</a> 子测试(Subtests)</h3>
<p>子测试是 Go 语言内置支持的，可以在某个测试用例中，根据测试场景使用 <code v-pre>t.Run</code>创建不同的子测试用例：</p>
<blockquote>
<p>在 Go 语言的测试中，子测试（subtests）是一种能够将一个大的测试分解成几个小的测试单元的策略。这种方法允许我们在一个测试函数中定义多个逻辑上的独立测试用例，并且可以单独运行和验证每个用例。每个子测试通过 <code v-pre>t.Run</code> 函数来执行，并且具有自己的测试名（通常描述测试的目的或输入数据）和测试逻辑。</p>
<ol>
<li>
<p><strong>表格驱动测试（Table-Driven Tests）</strong></p>
<p>当我们想要对一个函数使用多组输入数据进行测试时，子测试非常有用。我们可以定义一个包含多组输入数据和期望输出的表格（通常是一个结构体切片），然后使用一个循环来迭代表格中的每一行，并为每一行生成一个子测试。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestFunction</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    tests <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span> <span class="token punctuation">{</span>
        name <span class="token builtin">string</span>
        input <span class="token builtin">int</span>
        expected <span class="token builtin">int</span>
    <span class="token punctuation">}</span><span class="token punctuation">{</span>
        <span class="token punctuation">{</span><span class="token string">"case 1"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token string">"case 2"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tt <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 测试逻辑</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用这方法，我们可以轻松地添加更多的测试用例，而无需为每个用例编写一个新的测试函数。</p>
</li>
<li>
<p><strong>组织和重用测试逻辑</strong></p>
<p>子测试也可以用来组织测试逻辑。我们可以将一组相关的测试用例组合在一起，并在共享一些设置（setup）和拆卸（teardown）代码的同时，保持每个测试用例的独立。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestProcess</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 一些设置代码...</span>
    t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">"Subtest1"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 测试逻辑 1</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">"Subtest2"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 测试逻辑 2</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 一些拆卸代码...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的 &quot;Subtest1&quot; 和 &quot;Subtest2&quot; 就是子测试，它们共享外部 <code v-pre>TestProcess</code> 的设置和拆卸代码，但执行自己的测试逻辑。</p>
</li>
<li>
<p><strong>并行测试</strong></p>
<p>子测试还允许我们轻松地将测试并行化。通过在子测试中调用 <code v-pre>t.Parallel()</code>，我们可以让测试并发地运行，这在执行一组耗时的集成测试时非常有用。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestParallel</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    tests <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span> <span class="token punctuation">{</span>
        name <span class="token builtin">string</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span><span class="token punctuation">{</span>
        <span class="token punctuation">{</span><span class="token string">"case 1"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token string">"case 2"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tt <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span>
        tt <span class="token operator">:=</span> tt <span class="token comment">// capture range variable</span>
        t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            t<span class="token punctuation">.</span><span class="token function">Parallel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// marks T as capable of running in parallel</span>
            <span class="token comment">// 测试逻辑</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</blockquote>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// calc_test.go</span>

<span class="token keyword">func</span> <span class="token function">TestMul</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">"pos"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token function">Mul</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">6</span> <span class="token punctuation">{</span>
			t<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"fail"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">"neg"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token function">Mul</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">6</span> <span class="token punctuation">{</span>
			t<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"fail"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>之前的例子测试失败时使用 <code v-pre>t.Error/t.Errorf</code>，这个例子中使用 <code v-pre>t.Fatal/t.Fatalf</code>，区别在于前者遇错不停，还会继续执行其他的测试用例，后者遇错即停。</li>
</ul>
<p>运行某个测试用例的子测试：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>$ <span class="token keyword">go</span> test <span class="token operator">-</span>run TestMul<span class="token operator">/</span>pos <span class="token operator">-</span>v
<span class="token operator">==</span><span class="token operator">=</span> RUN   TestMul
<span class="token operator">==</span><span class="token operator">=</span> RUN   TestMul<span class="token operator">/</span>pos
<span class="token operator">--</span><span class="token operator">-</span> PASS<span class="token punctuation">:</span> TestMul <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">.</span>00s<span class="token punctuation">)</span>
    <span class="token operator">--</span><span class="token operator">-</span> PASS<span class="token punctuation">:</span> TestMul<span class="token operator">/</span>pos <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">.</span>00s<span class="token punctuation">)</span>
PASS
ok      example <span class="token number">0</span><span class="token punctuation">.</span>008s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于多个子测试的场景，更推荐如下的写法(table-driven tests)：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">//  calc_test.go</span>
<span class="token keyword">func</span> <span class="token function">TestMul</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cases <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Name           <span class="token builtin">string</span>
		A<span class="token punctuation">,</span> B<span class="token punctuation">,</span> Expected <span class="token builtin">int</span>
	<span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token punctuation">{</span><span class="token string">"pos"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token string">"neg"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token string">"zero"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token keyword">range</span> cases <span class="token punctuation">{</span>
		t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> ans <span class="token operator">:=</span> <span class="token function">Mul</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>A<span class="token punctuation">,</span> c<span class="token punctuation">.</span>B<span class="token punctuation">)</span><span class="token punctuation">;</span> ans <span class="token operator">!=</span> c<span class="token punctuation">.</span>Expected <span class="token punctuation">{</span>
				t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"%d * %d expected %d, but %d got"</span><span class="token punctuation">,</span>
					c<span class="token punctuation">.</span>A<span class="token punctuation">,</span> c<span class="token punctuation">.</span>B<span class="token punctuation">,</span> c<span class="token punctuation">.</span>Expected<span class="token punctuation">,</span> ans<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有用例的数据组织在切片 <code v-pre>cases</code> 中，看起来就像一张表，借助循环创建子测试。这样写的好处有：</p>
<ul>
<li>新增用例非常简单，只需给 cases 新增一条测试数据即可。</li>
<li>测试代码可读性好，直观地能够看到每个子测试的参数和期待的返回值。</li>
<li>用例失败时，报错信息的格式比较统一，测试报告易于阅读。</li>
</ul>
<h3 id="帮助函数-helpers" tabindex="-1"><a class="header-anchor" href="#帮助函数-helpers" aria-hidden="true">#</a> 帮助函数(helpers)</h3>
<p>对一些重复的逻辑，抽取出来作为公共的帮助函数(helpers)，可以增加测试代码的可读性和可维护性。 借助帮助函数，可以让测试用例的主逻辑看起来更清晰。</p>
<p>例如，我们可以将创建子测试的逻辑抽取出来：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// calc_test.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"testing"</span>

<span class="token keyword">type</span> calcCase <span class="token keyword">struct</span><span class="token punctuation">{</span> A<span class="token punctuation">,</span> B<span class="token punctuation">,</span> Expected <span class="token builtin">int</span> <span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">createMulTestCase</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">,</span> c <span class="token operator">*</span>calcCase<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// t.Helper()</span>
	<span class="token keyword">if</span> ans <span class="token operator">:=</span> <span class="token function">Mul</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>A<span class="token punctuation">,</span> c<span class="token punctuation">.</span>B<span class="token punctuation">)</span><span class="token punctuation">;</span> ans <span class="token operator">!=</span> c<span class="token punctuation">.</span>Expected <span class="token punctuation">{</span>
		t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"%d * %d expected %d, but %d got"</span><span class="token punctuation">,</span>
			c<span class="token punctuation">.</span>A<span class="token punctuation">,</span> c<span class="token punctuation">.</span>B<span class="token punctuation">,</span> c<span class="token punctuation">.</span>Expected<span class="token punctuation">,</span> ans<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestMul</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">createMulTestCase</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> <span class="token operator">&amp;</span>calcCase<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token function">createMulTestCase</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> <span class="token operator">&amp;</span>calcCase<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token function">createMulTestCase</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> <span class="token operator">&amp;</span>calcCase<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// wrong case</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们故意创建了一个错误的测试用例，运行 <code v-pre>go test</code>，用例失败，会报告错误发生的文件和行号信息：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ go test
--- FAIL: TestMul (0.00s)
    calc_test.go:11: 2 * 0 expected 1, but 0 got
FAIL
exit status 1
FAIL    example 0.007s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，错误发生在第11行，也就是帮助函数 <code v-pre>createMulTestCase</code> 内部。18, 19, 20行都调用了该方法，我们第一时间并不能够确定是哪一行发生了错误。有些帮助函数还可能在不同的函数中被调用，报错信息都在同一处，不方便问题定位。因此，Go 语言在 1.9 版本中引入了 <code v-pre>t.Helper()</code>，用于标注该函数是帮助函数，报错时将输出帮助函数调用者的信息，而不是帮助函数的内部信息。</p>
<p>修改 <code v-pre>createMulTestCase</code>，调用 <code v-pre>t.Helper()</code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func createMulTestCase(c *calcCase, t *testing.T) {
    t.Helper()
	t.Run(c.Name, func(t *testing.T) {
		if ans := Mul(c.A, c.B); ans != c.Expected {
			t.Fatalf("%d * %d expected %d, but %d got",
				c.A, c.B, c.Expected, ans)
		}
	})
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行 <code v-pre>go test</code>，报错信息如下，可以非常清晰地知道，错误发生在第 20 行。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ go test
--- FAIL: TestMul (0.00s)
    calc_test.go:20: 2 * 0 expected 1, but 0 got
FAIL
exit status 1
FAIL    example 0.006s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于 <code v-pre>helper</code> 函数的 2 个建议：</p>
<ul>
<li>不要返回错误， 帮助函数内部直接使用 <code v-pre>t.Error</code> 或 <code v-pre>t.Fatal</code> 即可，在用例主逻辑中不会因为太多的错误处理代码，影响可读性。</li>
<li>调用 <code v-pre>t.Helper()</code> 让报错信息更准确，有助于定位。</li>
</ul>
<h3 id="setup-和-teardown" tabindex="-1"><a class="header-anchor" href="#setup-和-teardown" aria-hidden="true">#</a> setup 和 teardown</h3>
<p>如果在同一个测试文件中，每一个测试用例运行前后的逻辑是相同的，一般会写在 setup 和 teardown 函数中。例如执行前需要实例化待测试的对象，如果这个对象比较复杂，很适合将这一部分逻辑提取出来；执行后，可能会做一些资源回收类的工作，例如关闭网络连接，释放文件等。标准库 <code v-pre>testing</code> 提供了这样的机制：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func setup() {
	fmt.Println("Before all tests")
}

func teardown() {
	fmt.Println("After all tests")
}

func Test1(t *testing.T) {
	fmt.Println("I'm test1")
}

func Test2(t *testing.T) {
	fmt.Println("I'm test2")
}

func TestMain(m *testing.M) {
	setup()
	code := m.Run()
	teardown()
	os.Exit(code)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在这个测试文件中，包含有2个测试用例，<code v-pre>Test1</code> 和 <code v-pre>Test2</code>。</li>
<li>如果测试文件中包含函数 <code v-pre>TestMain</code>，那么生成的测试将调用 TestMain(m)，而不是直接运行测试。</li>
<li>调用 <code v-pre>m.Run()</code> 触发所有测试用例的执行，并使用 <code v-pre>os.Exit()</code> 处理返回的状态码，如果不为0，说明有用例失败。</li>
<li>因此可以在调用 <code v-pre>m.Run()</code> 前后做一些额外的准备(setup)和回收(teardown)工作。</li>
</ul>
<p>执行 <code v-pre>go test</code>，将会输出</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ go test
Before all tests
I'm test1
I'm test2
PASS
After all tests
ok      example 0.006s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tcp-http" tabindex="-1"><a class="header-anchor" href="#tcp-http" aria-hidden="true">#</a> TCP/HTTP</h3>
<p>假设需要测试某个 API 接口的 handler 能够正常工作，例如 helloHandler</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("hello world"))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那我们可以创建真实的网络连接进行测试：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// test code
import (
	"io/ioutil"
	"net"
	"net/http"
	"testing"
)

func handleError(t *testing.T, err error) {
	t.Helper()
	if err != nil {
		t.Fatal("failed", err)
	}
}

func TestConn(t *testing.T) {
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	handleError(t, err)
	defer ln.Close()

	http.HandleFunc("/hello", helloHandler)
	go http.Serve(ln, nil)

	resp, err := http.Get("http://" + ln.Addr().String() + "/hello")
	handleError(t, err)

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	handleError(t, err)

	if string(body) != "hello world" {
		t.Fatal("expected hello world, but got", string(body))
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>net.Listen(&quot;tcp&quot;, &quot;127.0.0.1:0&quot;)</code>：监听一个未被占用的端口，并返回 Listener。</li>
<li>调用 <code v-pre>http.Serve(ln, nil)</code> 启动 http 服务。</li>
<li>使用 <code v-pre>http.Get</code> 发起一个 Get 请求，检查返回值是否正确。</li>
<li>尽量不对 <code v-pre>http</code> 和 <code v-pre>net</code> 库使用 mock，这样可以覆盖较为真实的场景。</li>
</ul>
<h3 id="httptest" tabindex="-1"><a class="header-anchor" href="#httptest" aria-hidden="true">#</a> httptest</h3>
<p>针对 http 开发的场景，使用标准库 <code v-pre>net/http/httptest</code> 进行测试更为高效。</p>
<p>上述的测试用例改写如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// test code
import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestConn(t *testing.T) {
	req := httptest.NewRequest("GET", "http://example.com/foo", nil)
	w := httptest.NewRecorder()
	helloHandler(w, req)
	bytes, _ := ioutil.ReadAll(w.Result().Body)

	if string(bytes) != "hello world" {
		t.Fatal("expected hello world, but got", string(bytes))
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 httptest 模拟请求对象(req)和响应对象(w)，达到了相同的目的。</p>
<h2 id="benchmark-基准测试" tabindex="-1"><a class="header-anchor" href="#benchmark-基准测试" aria-hidden="true">#</a> Benchmark 基准测试</h2>
<p>基准测试用例的定义如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func BenchmarkName(b *testing.B){
    // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>函数名必须以 <code v-pre>Benchmark</code> 开头，后面一般跟待测试的函数名</li>
<li>参数为 <code v-pre>b *testing.B</code>。</li>
<li>执行基准测试时，需要添加 <code v-pre>-bench</code> 参数。</li>
</ul>
<p>例如：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func BenchmarkHello(b *testing.B) {
    for i := 0; i &lt; b.N; i++ {
        fmt.Sprintf("hello")
    }
}
$ go test -benchmem -bench .
...
BenchmarkHello-16   15991854   71.6 ns/op   5 B/op   1 allocs/op
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基准测试报告每一列值对应的含义如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>type BenchmarkResult struct {
    N         int           // 迭代次数
    T         time.Duration // 基准测试花费的时间
    Bytes     int64         // 一次迭代处理的字节数
    MemAllocs uint64        // 总的分配内存的次数
    MemBytes  uint64        // 总的分配内存的字节数
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果在运行前基准测试需要一些耗时的配置，则可以使用 <code v-pre>b.ResetTimer()</code> 先重置定时器，例如：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func BenchmarkHello(b *testing.B) {
    ... // 耗时操作
    b.ResetTimer()
    for i := 0; i &lt; b.N; i++ {
        fmt.Sprintf("hello")
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code v-pre>RunParallel</code> 测试并发性能</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">BenchmarkParallel</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	templ <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">"Hello, {{.}}!"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	b<span class="token punctuation">.</span><span class="token function">RunParallel</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>pb <span class="token operator">*</span>testing<span class="token punctuation">.</span>PB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">var</span> buf bytes<span class="token punctuation">.</span>Buffer
		<span class="token keyword">for</span> pb<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 所有 goroutine 一起，循环一共执行 b.N 次</span>
			buf<span class="token punctuation">.</span><span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			templ<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buf<span class="token punctuation">,</span> <span class="token string">"World"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ go test -benchmem -bench .
...
BenchmarkParallel-16   3325430     375 ns/op   272 B/op   8 allocs/op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


