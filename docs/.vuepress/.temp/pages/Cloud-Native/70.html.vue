<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第70节-架构设计" tabindex="-1"><a class="header-anchor" href="#第70节-架构设计" aria-hidden="true">#</a> 第70节 架构设计</h1>
<div><a href = '69.md' style='float:left'>⬆️上一节🔗  </a><a href = '71.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="什么是架构设计" tabindex="-1"><a class="header-anchor" href="#什么是架构设计" aria-hidden="true">#</a> 什么是架构设计</h2>
<p>首先，我们从架构层面大致可以分为：系统架构和应用架构。</p>
<ul>
<li><strong>系统架构：</strong> 系统架构通常来指的是 <strong>网络架构</strong></li>
<li><strong>应用架构：</strong> 应用架构通常来指的是 <strong>代码架构</strong></li>
</ul>
<p>架构，又名软件架构，是有关软件整体结构与组件的抽象描述，用于指导大型软件系统各个方面的设计。</p>
<blockquote>
<p><strong>Note</strong></p>
<p>这里是不严谨的，在软件设计中架构域是如何划分的，架构域包括：<strong>业务架构、数据架构、产品架构、应用架构、技术架构</strong>。首先需要熟悉业务，形成业务架构，根据业务架构，做出相应的数据架构和应用架构，最后通过技术架构落地实施。业务架构是战略，应用架构是承上启下，一方面承接业务架构的落地，另一方面影响技术架构的选型。如何针对当前需求，选择合适的架构，如何面向未来，保证架构平滑过渡，这个是软件开发者，特别是架构师，都需要深入思考的问题。</p>
</blockquote>
<p><strong>为什么需要架构设计？</strong></p>
<p>以前系统简单，一个应用部署在一台服务器上，且大部分开发工作是CRUD，应用结构简单，且易于维护。随着系统业务复杂度越来越高，功能模块越来越庞大，耦合度也越来越高，导致系统的复杂度越来越不可控。</p>
<p>为了更好的降低应用及模块间的耦合度，于是，诞生了一些我们熟知的网络架构（分布式微服务）和应用架构（三层架构、MVC架构，在此架构上又出现了一些框架，如 <strong>SSM框架</strong>、SSH框架等，使用框架的好处就是结构清晰易于维护）。</p>
<ul>
<li>对于系统的架构，它的本质是什么，它对产品有何影响？</li>
<li>架构分为哪几类？</li>
<li>为什么要画架构图，可以不画架构图吗？</li>
<li>架构图该怎么画，怎么让画架构图不那么痛苦？</li>
</ul>
<h2 id="mvc-架构" tabindex="-1"><a class="header-anchor" href="#mvc-架构" aria-hidden="true">#</a> MVC 架构</h2>
<p><strong>MVC 架构包含以下三个组件:</strong></p>
<ul>
<li>
<p>Model(模型):用于处理应用程序数据逻辑的对象。它负责在持久层与领域层之间进行数据交换。</p>
</li>
<li>
<p>View(视图):用于展示模型/领域中的数据。通常处理数据显示与用户交互。</p>
</li>
<li>
<p>Controller(控制器):用于处理业务逻辑和指导模型与视图之间的数据流向。它接收来自视图的输入,并调用模型和视图来返回结果。</p>
</li>
</ul>
<p><strong>这三个组件之间通过松耦合的方式相互作用:</strong></p>
<ul>
<li>Controller 与 Model 之间通过接口相连</li>
<li>Controller 与 View 之间通过接口相连</li>
<li>Model 与 View 之间没有直接的联系,都通过 Controller 进行通信</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>┌─────────────────────────┐   
│            │            │   
│   View     │   Model    │
│            │            │
│  显示数据    │  数据模型   │  
│            │            │   
└──────────┬──────────────┘
           │      
┌──────────▼───────────┐
│   Controller         │  
│                      │  
│  控制数据流向          │      
│  处理用户输入          │
│  返回结果给 View      │      
└─────────────────────┘
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="占主导地位的控制器" tabindex="-1"><a class="header-anchor" href="#占主导地位的控制器" aria-hidden="true">#</a> 占主导地位的控制器</h3>
<p>MVC 架构模式的三个组成部分：Model、View 和 Controller 中最重要的就是控制器，它承担了整个架构中的大部分业务逻辑，同时在用户请求到达或者事件发生时都会首先通知控制器并由它来决定如何响应这次请求或者事件。</p>
<p><img src="http://sm.nsddd.top/sm202305211244629.png" alt="image-20230521124442575"></p>
<p>在 MVC 中，所有的用户请求都会首先交给控制器，再由控制器来决定如何响应用户的输入，无论是更新模型中的信息还是渲染相应的视图，都是通过控制器来决定的；也就是说，在 MVC 中，控制器占据主导地位，它决定用户的输入是如何被处理的。</p>
<h3 id="被动的模型" tabindex="-1"><a class="header-anchor" href="#被动的模型" aria-hidden="true">#</a> 被动的模型</h3>
<p>在绝大多数的 MVC 架构模式中，模型都不会主动向视图或者控制器推送消息；模型都是被动的，它只存储整个应用中的数据，而信息的获取和更新都是由控制器来驱动的。</p>
<p><img src="http://sm.nsddd.top/sm202305211245766.png" alt="image-20230521124502673"></p>
<p>但是当模型中的数据发生变化时，却需要通过一些方式通知对应的视图进行更新，在这种情况下其实也不需要模型<strong>主动</strong>将数据变化的消息推送给视图；因为所有对于模型层的改变都是<strong>由用户的操作导致的</strong>，而用户的操作都是通过控制器来处理的，所以只需要在控制器改变模型时，将更新的信息发送给视图就可以了；当然，我们也可以通过<strong>观察者模式</strong>向未知的观察者发送通知，以保证状态在不同模块之间能够保持同步。</p>
<h2 id="三层架构" tabindex="-1"><a class="header-anchor" href="#三层架构" aria-hidden="true">#</a> 三层架构</h2>
<p>三层架构就是为了符合“高内聚，低耦合”思想，把各个功能模块划分为表示层（UI）、业务逻辑层（BLL）和数据访问层（DAL）三层架构。</p>
<ul>
<li>表示层（UI）：位于三层构架的最上层，与用户直接接触，表示层就是实现用户的界面功能，也是系统数据的输入与输出，是为用户传达和反馈信息的。</li>
<li>业务逻辑层（BLL）：是针对具体的问题的操作，也可以理解成对数据层的操作，对数据业务逻辑处理。同时也是表示层与数据层的桥梁，实现三层之间的数据连接和指令传达。</li>
<li>数据访问层（DAL）：有时候也称为是持久层，主要功能是对原始数据(数据库或者文本文件等存放数据的形式)的操作（实现数据的增加、删除、修改、查询等）。具体为业务逻辑层或表示层提供数据服务。</li>
</ul>
<div class="language-mermaid ext-mermaid line-numbers-mode"><pre v-pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
A<span class="token text string">[Presentation Layer]</span> <span class="token arrow operator">--></span>B<span class="token text string">(Business Logic Layer)</span>
B <span class="token arrow operator">--></span> C<span class="token text string">{Data Access Layer}</span>

A <span class="token arrow operator">--></span> D<span class="token text string">[User Interface]</span>
D <span class="token arrow operator">--></span> E<span class="token text string">[Web/Mobile]</span>

B <span class="token arrow operator">--></span> F<span class="token text string">[(Business Services)]</span>
F <span class="token arrow operator">--></span> G<span class="token text string">[Business Rules]</span>
F <span class="token arrow operator">--></span> H<span class="token text string">[Workflows]</span>

C <span class="token arrow operator">--></span> I<span class="token text string">[(Database)]</span> 
C <span class="token arrow operator">--></span> J<span class="token text string">[External Services]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mvc-架构和-三层架构对比" tabindex="-1"><a class="header-anchor" href="#mvc-架构和-三层架构对比" aria-hidden="true">#</a> MVC 架构和 三层架构对比</h2>
<p>在实际开发中很多人将 MVC 当成三层架构在用，比如说，很多人喜欢把软件的业务逻辑放在 Controller 层里，将数据库访问操作的代码放在 Model 层里，软件最终的代码放在 View 层里，就这样硬生生将 MVC 架构变成了伪三层架构。</p>
<p>这种代码不仅不伦不类，同时也失去了三层架构和 MVC 架构的核心优势，也就是：<strong>通过 Controller 层将 Model 层和 View 层解耦，从而使代码更容易维护和扩展。</strong> 因此在实际开发中，我们也要注意遵循 MVC 架构的开发规范，发挥 MVC 的核心价值。</p>
<p>无论是MVC架构还是三层架构，都是一种规范，都是奔着&quot;<strong>高耦合，低内聚</strong>&quot;的思想来设计的。</p>
<p>MVC架构主要是为了解决应用程序用户界面的样式替换问题，把视图层尽可能的和业务代码分离。</p>
<p>以下是MVC架构图：</p>
<pre><code> ┌──────────┐               ┌────────────┐
 │  Model   │               │   View     │
 ├──────────┤               ├────────────┤
 │          ├─ ─ ─ 数据 ─ ─&gt; │            │
 │          │               │            │
 └──────────┘               │            │
                            │            │
 ┌──────────┐               ├────────────┤
 │Controller│               │            │
 ├──────────┤               │            │
 │          ├─ ─ ─ 操作 ─ ─&gt; │            │
 │          │               └────────────┘
 └──────────┘
</code></pre>
<p>以下是三层架构图：</p>
<pre><code> ┌──────────┐               ┌────────────┐
 │  表示层   │               │   数据层    │
 ├──────────┤               ├────────────┤
 │          ├─ ─ ─ 数据 ─ ─&gt; │            │
 │          │               │            │
 └──────────┘               │            │
                            │            │
 ┌──────────┐               ├────────────┤
 │  业务层   │               │            │
 ├──────────┤               │            │
 │          ├─ ─ ─ 逻辑 ─ ─&gt; │            │
 │          │               └────────────┘
 └──────────┘               ┌────────────┐
                            │   存储层    │
                            ├────────────┤
                            │            │
                            │            │
                            └────────────┘
</code></pre>
<p>MVC架构和三层架构的区别：</p>
<ul>
<li>MVC架构是将整个应用分为三个部分：模型、视图和控制器，以实现更好的代码重用和可维护性。而三层架构是将整个应用分为三个层次：表示层、业务层和数据层，以实现更好的分层和松耦合。</li>
<li>在MVC架构中，控制器负责处理用户请求并更新模型和视图。模型代表了应用程序中的业务逻辑和数据。视图显示模型中的数据并允许用户与之交互。在三层架构中，表示层负责显示用户界面和接收用户输入。业务层包含应用程序的业务逻辑。数据层处理与数据存储和访问相关的问题。</li>
<li>MVC架构更适合Web应用程序，因为Web应用程序通常具有明确的用户界面和业务逻辑。三层架构更适合大型企业应用程序，因为这些应用程序可能需要处理复杂的业务逻辑和多种数据源。</li>
</ul>
<p>使用场景：</p>
<ul>
<li>MVC架构适合Web应用程序，尤其是需要良好可维护性和可扩展性的应用程序。</li>
<li>三层架构适合大型企业应用程序，特别是需要处理复杂业务逻辑和多种数据源的应用程序。</li>
</ul>
<h2 id="mvp-架构" tabindex="-1"><a class="header-anchor" href="#mvp-架构" aria-hidden="true">#</a> MVP 架构</h2>
<p>在整个 GUI 编程领域，MVC 已经拥有将近 50 年的历史了。早在几十年前，Smalltalk-76 就对 MVC 架构模式进行了实现，在随后的几十年历史中，MVC 产生了很多的变种，例如：HMVC、MVA、MVP、MVVM 和其它将 MVC 运用于其它不同领域的模式。</p>
<p><strong>那么后面的 MVA、MVP 和 MVVM 架构是什么样子的？</strong></p>
<p>MVP 架构模式是 MVC 的一个变种，很多框架都自称遵循 MVC 架构模式，但是它们实际上却实现了 MVP 模式；MVC 与 MVP 之间的区别其实并不明显，作者认为两者之间最大的区别就是 MVP 中使用 Presenter 对视图和模型进行了解耦，它们彼此都对对方一无所知，沟通都通过 Presenter 进行。</p>
<p>MVP 作为一个比较有争议的架构模式，在维基百科的 <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter" target="_blank" rel="noopener noreferrer">Model-view-presenter<ExternalLinkIcon/></a> 词条中被描述为 MVC 设计模式的变种（derivation），自上个世纪 90 年代出现在 IBM 之后，随着不断的演化，虽然有着很多分支，不过 Martin Fowler 对 MVP 架构模式的定义最终被广泛接受和讨论。</p>
<p><img src="http://sm.nsddd.top/sm202305211242568.png" alt="image-20230521124242385"></p>
<p>在 MVP 中，<code v-pre>Presenter</code> 可以理解为松散的控制器，其中包含了视图的 UI 业务逻辑，所有从视图发出的事件，都会通过代理给 Presenter 进行处理；同时，Presenter 也通过视图暴露的接口与其进行通信。</p>
<p>目前常见的 MVP 架构模式其实都是它的变种：<a href="https://www.martinfowler.com/eaaDev/PassiveScreen.html" target="_blank" rel="noopener noreferrer">Passive View<ExternalLinkIcon/></a> 和 <a href="https://www.martinfowler.com/eaaDev/SupervisingPresenter.html" target="_blank" rel="noopener noreferrer">Supervising Controller<ExternalLinkIcon/></a>，接下来的内容也是围绕这两种变种进行展开的。</p>
<h3 id="被动视图" tabindex="-1"><a class="header-anchor" href="#被动视图" aria-hidden="true">#</a> 被动视图</h3>
<p>MVP 的第一个主要变种就是被动视图（Passive View）；顾名思义，在该变种的架构模式中，视图层是被动的，它本身不会改变自己的任何的状态，所有的状态都是通过 Presenter 来间接改变的。</p>
<p><img src="http://sm.nsddd.top/sm202305211247699.png" alt="image-20230521124753638"></p>
<p>被动的视图层就像前端中的 HTML 和 CSS 代码，只负责展示视图的结构和内容，本身不具有任何的逻辑：</p>
<h3 id="依赖关系" tabindex="-1"><a class="header-anchor" href="#依赖关系" aria-hidden="true">#</a> 依赖关系</h3>
<p>视图成为了完全被动的并且不再根据模型来更新视图本身的内容，也就是说，不同于 MVC 中的依赖关系；在被动视图中，视图层对于模型层没有任何的依赖：</p>
<p><img src="http://sm.nsddd.top/sm202305211248804.png" alt="image-20230521124853749"></p>
<p>因为视图层不依赖与其他任何层级也就最大化了视图层的可测试性，同时也将视图层和模型层进行了合理的分离，两者不再相互依赖。</p>
<h3 id="通信方式" tabindex="-1"><a class="header-anchor" href="#通信方式" aria-hidden="true">#</a> 通信方式</h3>
<p>被动视图的示意图中一共有四条线，用于表示 Model、View 和 Presenter 之间的通信：</p>
<p><img src="http://sm.nsddd.top/sm202305211249170.png" alt="image-20230521124918111"></p>
<ol>
<li>当视图接收到来自用户的事件时，会将事件转交给 Presenter 进行处理；</li>
<li>被动的视图向外界暴露接口，当需要更新视图时 Presenter 通过视图暴露的接口更新视图的内容；</li>
<li>Presenter 负责对模型进行操作和更新，在需要时取出其中存储的信息；</li>
<li>当模型层改变时，可以将改变的信息发送给<strong>观察者</strong> Presenter；</li>
</ol>
<p>在 MVP 的变种被动视图中，模型的操作以及视图的更新都仅通过 Presenter 作为中间人进行。</p>
<p>另一个 MVP 与 MVC 之间的重大区别就是，MVP（Passive View）中的视图和模型是完全解耦的，它们对于对方的存在完全不知情，这也是区分 MVP 和 MVC 的一个比较容易的方法。</p>
<h2 id="mvvm" tabindex="-1"><a class="header-anchor" href="#mvvm" aria-hidden="true">#</a> MVVM</h2>
<p>相较于 MVC 和 MVP 模式，MVVM 在定义上就明确得多，同时，维基百科上对于 <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel" target="_blank" rel="noopener noreferrer">Model-View-ViewModel<ExternalLinkIcon/></a> 的词条也没有歧义；不过，在谈 MVVM 架构模式之前，我们需要先了解它是如何发展和演变的。</p>
<h3 id="演变" tabindex="-1"><a class="header-anchor" href="#演变" aria-hidden="true">#</a> 演变</h3>
<p>早在 2004 年，Martin Fowler 发表了一篇名为 <a href="https://www.martinfowler.com/eaaDev/PresentationModel.html" target="_blank" rel="noopener noreferrer">Presentation Model<ExternalLinkIcon/></a> （以下简称为 PM 模式）的文章，PM 模式与 MVP 比较相似，它从视图层中分离了行为和状态；PM 模式中创建了一个视图的抽象，叫做 Presentation Model，而视图也成为了这个模型的『渲染』结果。</p>
<p><img src="http://sm.nsddd.top/sm202305211252715.png" alt="image-20230521125228667"></p>
<p>既然 MVVM 是展示模型 <a href="https://www.martinfowler.com/eaaDev/PresentationModel.html" target="_blank" rel="noopener noreferrer">Presentation Model<ExternalLinkIcon/></a> 的一个实现，那么在介绍 Model-View-ViewModel 之前，我们就需要了解 PM 模式到底是什么。</p>
<p>在 MVC 一节中曾经有过对展示层和领域层进行分离的讨论，而 PM 模式就与分离展示层 <a href="https://www.martinfowler.com/eaaDev/SeparatedPresentation.html" target="_blank" rel="noopener noreferrer">Separated Presentation<ExternalLinkIcon/></a> 有一定的关系。</p>
<p>在监督控制器中，视图层与模型层中的一些简单属性进行绑定，在模型属性变化时直接更新视图，而 PM 通过引入展示模型将<strong>模型层中的数据与复杂的业务逻辑封装成属性与简单的数据同时暴露给视图，让视图和展示模型中的属性进行同步</strong>。</p>
<p><img src="http://sm.nsddd.top/sm202305211253735.png" alt="image-20230521125330663"></p>
<p>展示模型中包含所有的视图渲染需要的动态信息，包括视图的内容（text、color）、组件是否启用（enable），除此之外还会将一些方法暴露给视图用于某些事件的响应。</p>
<h3 id="mvvm-与-wpf" tabindex="-1"><a class="header-anchor" href="#mvvm-与-wpf" aria-hidden="true">#</a> MVVM 与 WPF</h3>
<p>MVVM 架构模式是微软在 2005 年诞生的，从诞生一开始就与 WPF 框架的联系非常紧密，在这一节中，我们将介绍 MVVM 模式是如何遵循 PM 模式实现的，WPF 作为微软用于处理 GUI 软件的框架，提供了一套非常优雅的解决方案。</p>
<p><img src="http://sm.nsddd.top/sm202305211254709.png" alt="image-20230521125400634"></p>
<p>从 Model-View-ViewModel 这个名字来看，它由三个部分组成，也就是 Model、View 和 ViewModel；其中视图模型（ViewModel）其实就是 PM 模式中的展示模型，在 MVVM 中叫做视图模型。</p>
<p>除了我们非常熟悉的 Model、View 和 ViewModel 这三个部分，在 MVVM 的实现中，还引入了<strong>隐式的</strong>一个 Binder 层，而声明式的数据和命令的绑定在 MVVM 模式中就是通过它完成的。</p>
<p><img src="http://sm.nsddd.top/sm202305211254690.png" alt="image-20230521125415637"></p>
<p>在实现 PM 模式时，我们需要处理视图和展示模型之间状态的同步，也就是 MVVM 中的视图和视图模型，我们使用隐式的 Binder 和 XAML 文件来完成视图和视图模型两者之间的双向绑定：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Window</span> <span class="token attr-name"><span class="token namespace">x:</span>Class</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>WPFDataBinding.MainWindow<span class="token punctuation">"</span></span> <span class="token attr-name">Title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>MainWindow<span class="token punctuation">"</span></span> <span class="token attr-name">Height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>350<span class="token punctuation">"</span></span> <span class="token attr-name">Width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>604<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Grid</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Label</span> <span class="token attr-name">Name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nameLabel<span class="token punctuation">"</span></span> <span class="token attr-name">Margin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>_Name:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Label</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextBox</span> <span class="token attr-name">Name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nameText<span class="token punctuation">"</span></span> <span class="token attr-name">Grid.Column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span> <span class="token attr-name">Margin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span>
         <span class="token attr-name">Text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{Binding Name}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Label</span> <span class="token attr-name">Name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ageLabel<span class="token punctuation">"</span></span> <span class="token attr-name">Margin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span> <span class="token attr-name">Grid.Row</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>_Age:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Label</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextBox</span> <span class="token attr-name">Name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ageText<span class="token punctuation">"</span></span> <span class="token attr-name">Grid.Column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span> <span class="token attr-name">Grid.Row</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span> <span class="token attr-name">Margin</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span>
         <span class="token attr-name">Text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{Binding Age}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Grid</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Window</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 WPF 中我们可以使用 Binding 关键字在 XAML 中完成双向绑定，当 <code v-pre>TextBox</code> 中的文字更新时，Binder 也会更新 ViewModel 中对应属性 <code v-pre>Name</code> 或者 <code v-pre>Age</code> 的值。</p>
<p>我们可以说 MVVM 将视图和展示模型之间的同步代码放到了视图层（XAML）中，也可以说通过隐式的方法实现了状态的同步。</p>
<p>无论是 MVVM 还是 Presentation Model，其中最重要的不是如何同步视图和展示模型/视图模型之间的状态，是使用观察者模式、双向绑定还是其它的机制都不是整个模式中最重要的部分，最为关键的是<strong>展示模型/视图模型创建了一个视图的抽象，将视图中的状态和行为抽离出一个新的抽象</strong>，这才是 MVVM 和 PM 中需要注意的。</p>
<div class="language-mermaid ext-mermaid line-numbers-mode"><pre v-pre class="language-mermaid"><code><span class="token keyword">graph</span> LR<span class="token punctuation">;</span>

View 
View <span class="token arrow operator">--></span> ViewModel
ViewModel <span class="token arrow operator">--></span> Model
Model <span class="token arrow operator">--></span> DataSource

<span class="token keyword">subgraph</span> ViewLayer
View  
<span class="token keyword">end</span>

<span class="token keyword">subgraph</span> ViewModelLayer
ViewModel
<span class="token keyword">end</span>

<span class="token keyword">subgraph</span> ModelLayer  
Model
<span class="token keyword">end</span>   

<span class="token keyword">subgraph</span> DataSourceLayer
DataSource   
<span class="token keyword">end</span>

<span class="token comment">%%  View  ->  ViewModel</span>
View <span class="token arrow operator">-.-></span> ViewModel
ViewModel <span class="token arrow operator">-.-></span> Model
Model <span class="token arrow operator">-.-></span> DataSource
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>Vue.js 使用的是 MVVM(Model-View-ViewModel)架构。MVVM架构分为三层:- Model:数据模型,用于存储数据。
- View:视图,页面渲染结果。
- ViewModel:连接Model和View,监听Model数据的改变,并通知更新到View。</p>
</blockquote>
<h2 id="业务架构" tabindex="-1"><a class="header-anchor" href="#业务架构" aria-hidden="true">#</a> 业务架构</h2>
<p>在需求初期，业务的需求描述往往比较模糊，可能只是一句话。他们可能来自老板、运营或者用户。直接把这句话作为核心产品功能是不恰当的，合理的做法是先把这个产品所有的问题域列清楚。</p>
<p>问题域，是指自己的产品能够解决的所有问题的空间集合。从核心需求出发，将所有当前需要解决、未来可能要解决的问题放入产品框架的范围。能够帮助我们的产品拥有更高的可拓展性，在后续具备迭代和优化的空间。</p>
<p>业务架构就是在业务需求初期，将模糊的需求描述转变成清晰的问题域，梳理出清晰的业务流程。为产品架构提供输入。</p>
<p>经过业务架构阶段之后，需要输出的产物包括：企业战略方向图、问题域列表、业务流程图。</p>
<div class="language-mermaid ext-mermaid line-numbers-mode"><pre v-pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
A<span class="token text string">[客户]</span> <span class="token arrow operator">--></span> B<span class="token text string">(下单&lt;br>平台)</span>
B <span class="token arrow operator">--></span> C<span class="token text string">{订单}</span>
C <span class="token arrow operator">--></span><span class="token label property">|支付|</span> D<span class="token text string">[支付&lt;br>系统]</span> 
C <span class="token arrow operator">--></span><span class="token label property">|物流|</span> E<span class="token text string">[物流&lt;br>系统]</span>
C <span class="token arrow operator">--></span><span class="token label property">|库存|</span> F<span class="token text string">[库存&lt;br>系统]</span>
D <span class="token arrow operator">--></span> G<span class="token text string">[银行]</span>
E <span class="token arrow operator">--></span> H<span class="token text string">[快递]</span>
F <span class="token arrow operator">--></span> I<span class="token text string">[商品]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mermaid ext-mermaid line-numbers-mode"><pre v-pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
    A<span class="token text string">[客户端]</span> <span class="token arrow operator">--></span> B<span class="token text string">[负载均衡]</span>
    B <span class="token arrow operator">--></span> C<span class="token text string">[Web服务器1]</span>
    B <span class="token arrow operator">--></span> D<span class="token text string">[Web服务器2]</span>
    C <span class="token arrow operator">--></span> E<span class="token text string">[应用服务器1]</span>
    D <span class="token arrow operator">--></span> F<span class="token text string">[应用服务器2]</span>
    E <span class="token arrow operator">--></span> G<span class="token text string">[数据库1]</span>
    F <span class="token arrow operator">--></span> H<span class="token text string">[数据库2]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据架构" tabindex="-1"><a class="header-anchor" href="#数据架构" aria-hidden="true">#</a> 数据架构</h2>
<p>企业架构由业务架构驱动，从业务架构分析业务流程、定义数据架构，流程和数据结合定义产品架构。这中间，数据架构起着至关重要的作用。企业 IT 系统的价值并不在于选取的技术有多先进，使用的硬件有多强大。而是企业业务数据的处理和存储。一家公司最宝贵的资产无疑就是–数据。毫无疑问，在当今大数据的时代背景下，缺少数据资产的建设和使用，就失去与同行业争夺竞争的机会。</p>
<div class="language-mermaid ext-mermaid line-numbers-mode"><pre v-pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
A<span class="token text string">[客户]</span> <span class="token arrow operator">--></span> B<span class="token text string">((订单))</span>  
B <span class="token arrow operator">--></span> C<span class="token text string">{已付款订单}</span>
C <span class="token arrow operator">--></span> D<span class="token text string">[付款信息]</span>
C <span class="token arrow operator">--></span> E<span class="token text string">[商品信息]</span>
E <span class="token arrow operator">--></span> F<span class="token text string">[商品]</span>  
F <span class="token arrow operator">--></span> G<span class="token text string">[仓库]</span>
G <span class="token arrow operator">--></span> H<span class="token text string">[发货]</span>
H <span class="token arrow operator">--></span> I<span class="token text string">[快递]</span> 
I <span class="token arrow operator">--></span> A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个图展示了一个简单的电商业务的数据流和架构:</p>
<ul>
<li>客户下单后产生订单</li>
<li>付款的订单会关联付款信息和商品信息</li>
<li>商品信息对应实物商品,存储在仓库</li>
<li>从仓库发货,通过快递公司送到客户手中</li>
</ul>
<h2 id="如何画架构图" tabindex="-1"><a class="header-anchor" href="#如何画架构图" aria-hidden="true">#</a> 如何画架构图</h2>
<p>在架构设计过程中，架构分解是必不可少的关键步骤。如何进行架构分解，从哪里入手开始进行分解？这些需要一套架构分解的过程模型和过程方法来指导分解。</p>
<p>从架构域的分类：业务架构、数据架构、产品架构、应用架构、技术架构这 5 个域，依次需要进行架构分解。每个结构域的分解过程，都是一个迭代过程。从无到有、从粗到细、从模糊到清晰，一步步精细化、丰富架构。迭代的过程就是一个否定之否定的过程，随着分解的逐步推进或系统的架构演化，后面的分解除了会识别出新的架构元素，也可能会对先前识别出的架构作出调整。整个架构分解的迭代过程，通过画架构图的方式是种非常直观的表现形式。</p>
<h2 id="学习架构资源" tabindex="-1"><a class="header-anchor" href="#学习架构资源" aria-hidden="true">#</a> 学习架构资源</h2>
<p><strong>GitHub：</strong></p>
<ul>
<li><a href="https://github.com/toutiaoio/awesome-architecture" target="_blank" rel="noopener noreferrer">架构师技术图谱，助你早日成为架构师<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/xingshaocheng/architect-awesome" target="_blank" rel="noopener noreferrer">后端架构师图谱<ExternalLinkIcon/></a></li>
</ul>
<h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2>
<ul>
<li><a href="http://heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html" target="_blank" rel="noopener noreferrer">MVC Index<ExternalLinkIcon/></a></li>
<li><a href="http://heim.ifi.uio.no/~trygver/2003/javazone-jaoo/MVC_pattern.pdf" target="_blank" rel="noopener noreferrer">The Model-View-Controller (MVC) Its Past and Present<ExternalLinkIcon/></a></li>
<li><a href="http://www.object-arts.com/downloads/papers/TwistingTheTriad.PDF" target="_blank" rel="noopener noreferrer">The evolution of the Dolphin Smalltalk MVP application framework<ExternalLinkIcon/></a></li>
<li><a href="http://www.wildcrest.com/Potel/Portfolio/mvp.pdf" target="_blank" rel="noopener noreferrer">MVP: Model-View-Presenter · The Taligent Programming Model for C++ and Java<ExternalLinkIcon/></a></li>
<li><a href="https://msdn.microsoft.com/en-us/library/ff798384.aspx" target="_blank" rel="noopener noreferrer">Implementing the Model-View-ViewModel Pattern · MSDN<ExternalLinkIcon/></a></li>
<li><a href="https://martinfowler.com/eaaDev/uiArchs.html" target="_blank" rel="noopener noreferrer">GUI Architectures · Martin Fowler<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/26799645" target="_blank" rel="noopener noreferrer">GUI 应用程序架构的十年变迁<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/evancz/elm-architecture-tutorial/" target="_blank" rel="noopener noreferrer">Elm Architecture Tutorial · GitHub<ExternalLinkIcon/></a></li>
<li><a href="https://martinfowler.com/eaaDev/PresentationModel.html" target="_blank" rel="noopener noreferrer">Presentation Model · Martin Fowler<ExternalLinkIcon/></a></li>
<li><a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank" rel="noopener noreferrer">Model-view-controller · Wikipedia<ExternalLinkIcon/></a></li>
<li><a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter" target="_blank" rel="noopener noreferrer">Model-view-presenter · Wikipedia<ExternalLinkIcon/></a></li>
<li><a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel" target="_blank" rel="noopener noreferrer">Model-view-viewmodel · Wikipedia<ExternalLinkIcon/></a></li>
<li><a href="http://heim.ifi.uio.no/~trygver/1979/mvc-1/1979-05-MVC.pdf" target="_blank" rel="noopener noreferrer">Thing-Model-View-Editor<ExternalLinkIcon/></a></li>
<li><a href="https://msdn.microsoft.com/en-us/library/dd381412(v=vs.108).aspx" target="_blank" rel="noopener noreferrer">ASP.NET MVC Overview · MSDN<ExternalLinkIcon/></a></li>
<li><a href="https://betterexplained.com/articles/intermediate-rails-understanding-models-views-and-controllers/" target="_blank" rel="noopener noreferrer">Intermediate Rails: Understanding Models, Views and Controllers<ExternalLinkIcon/></a></li>
<li><a href="https://www.martinfowler.com/eaaDev/PassiveScreen.html" target="_blank" rel="noopener noreferrer">Passive View · Martin Fowler<ExternalLinkIcon/></a></li>
<li><a href="https://www.martinfowler.com/eaaDev/SupervisingPresenter.html" target="_blank" rel="noopener noreferrer">Supervising Controller · Martin Fowler<ExternalLinkIcon/></a></li>
<li><a href="http://www.dgp.toronto.edu/~dwigdor/teaching/csc2524/2012_F/papers/mvc.pdf" target="_blank" rel="noopener noreferrer">Applications Programming in Smalltalk-80: How to use Model-View-Controller (MVC)<ExternalLinkIcon/></a></li>
<li><a href="https://stackoverflow.com/questions/2056/what-are-mvp-and-mvc-and-what-is-the-difference" target="_blank" rel="noopener noreferrer">What are MVP and MVC and what is the difference? · Stack Overflow<ExternalLinkIcon/></a></li>
<li><a href="http://webclientguidance.codeplex.com/wikipage?title=ModelViewPresenterPatternDescription&amp;referringTitle=MVPDocumentation" target="_blank" rel="noopener noreferrer">Model-View-Presenter Pattern<ExternalLinkIcon/></a></li>
<li><a href="https://msdn.microsoft.com/en-us/magazine/dd419663.aspx" target="_blank" rel="noopener noreferrer">Patterns - WPF Apps With The Model-View-ViewModel Design Pattern · MSDN<ExternalLinkIcon/></a></li>
<li>[Introduction to Model/View/ViewModel pattern for building WPF apps](https://blogs.msdn.microsoft.com/johngossman/2005/10/08/introduction-to-modelviewviewmodel-pattern-for-building-wpf-apps/ · MSDN)</li>
<li><a href="https://en.wikipedia.org/wiki/Design_Patterns" target="_blank" rel="noopener noreferrer">设计模式<ExternalLinkIcon/></a></li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '69.md' style='float:left'>⬆️上一节🔗  </a><a href = '71.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


