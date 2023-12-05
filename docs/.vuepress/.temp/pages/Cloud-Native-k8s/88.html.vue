<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第88节-平台工程的学习" tabindex="-1"><a class="header-anchor" href="#第88节-平台工程的学习" aria-hidden="true">#</a> 第88节 平台工程的学习</h1>
<div><a href = '87.md' style='float:left'>⬆️上一节🔗  </a><a href = '89.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="什么是平台工程" tabindex="-1"><a class="header-anchor" href="#什么是平台工程" aria-hidden="true">#</a> 什么是平台工程</h2>
<p>平台工程是为开发人员构建和维护自助服务平台的学科。该平台提供了一套云原生工具和服务，帮助开发者快速高效地交付应用。平台工程的目标是通过标准化和自动化软件交付生命周期 (SDLC) 中的大部分任务来改善开发人员体验 (DX)。开发人员可以专注于使用自动化平台编码和交付业务逻辑，而不是像供应基础设施、管理安全性和学习曲线这样的上下文切换</p>
<p>平台工程具有内向的视角，因为它专注于优化组织中的开发人员以提高生产力。组织从以最佳水平工作的开发人员中受益匪浅，因为这会导致更快的发布周期。该平台通过提供开发人员将代码投入生产所需的一切来实现这一目标，这样他们就不必等待其他 IT 团队获得基础设施和工具。使开发人员的日常活动更加轻松和自主的自助服务平台称为内部开发人员平台 (IDP)。</p>
<p><img src="http://sm.nsddd.top/sm202311221757762.png" alt="image-20231122175733496"></p>
<p><strong>什么是内部开发者平台 (IDP)</strong></p>
<p>IDP 是一个包含自助式云原生工具和技术的平台，开发人员可以使用这些工具和技术来构建、测试、部署、监控或执行与应用程序开发和交付有关的几乎任何事情，同时尽可能减少开销。平台工程师或平台团队在咨询开发人员并了解他们独特的挑战和工作流程后构建它。</p>
<p>在为许多大型高科技企业 讨论和实施Kubernetes CI/CD 管道和GitOps 解决方案之后，我们意识到一个典型的 IDP 将包含以下 5 个支柱：</p>
<ol>
<li>用于自动化部署的 CI/CD 平台（Jenkins、Docker Hub、Argo CD、Devtron、Spinnaker）</li>
<li>用于管理容器的容器编排平台（Kubernetes、Nomad、Docker Swarm）</li>
<li>用于身份验证、授权和秘密管理的安全管理工具（HashiCorp Vault、AWS Secrets Manager、Okta Identity Cloud）</li>
<li>用于自动化基础设施配置的基础设施即代码 (IaC) 工具（Terraform、Ansible、Chef、AWS CloudFormation）</li>
<li>跨所有集群的工作负载和应用程序可视化的可观察性堆栈（Devtron Kubernetes 仪表板、Prometheus、Grafana、ELK 堆栈）</li>
</ol>
<p>平台团队以一种易于学习曲线最小的开发人员使用的方式设计 IDP。IDP 可以通过自动化重复性任务、减少维护开销和消除无休止的脚本编写需求来帮助减少开发人员的认知负担并改进 DX。IDP 通过提供自助服务平台，使开发团队能够独立管理资源、基础架构需求、部署和回滚。这增加了开发人员的自主权和责任感，减少了依赖性，并简化了开发周期。</p>
<p><strong>为什么平台工程很重要？</strong></p>
<p>平台工程可以帮助组织获得一些内部（开发人员）和外部（最终用户）的好处：</p>
<ul>
<li>**改进的开发人员体验 (DX)：**过多的云原生工具增加了开发人员的认知负担，因为需要花费大量时间来决定针对他们的特定用例使用哪个工具并掌握它。平台工程通过提供适合开发人员独特工作流程的简化、标准化的工具和服务集来解决这个问题并改进 DX。</li>
<li><strong>提高生产力：</strong> IDP 提供开发人员以自助服务方式测试和部署代码所需的一切。这减少了 SDLC 不同阶段的延迟，例如等待某人提供要部署的基础设施。平台工程通过帮助他们主要关注核心开发工作来确保开发人员的生产力。</li>
<li><strong>设计标准化：</strong> IT 团队在典型的软件组织中使用各种工具，因团队而异。在这种情况下，维护和跟踪事物变得复杂。平台工程通过标准化工具和服务来解决这个问题，他们更容易解决任何瓶颈，因为每个开发人员的平台都是相同的。</li>
<li>**更快的发布：**平台团队通过提供易于使用、可重用和可配置的工具链，确保开发人员致力于交付业务逻辑。因此，开发人员的工作效率非常高，并且可以可靠、安全地加快功能和创新的上市时间。</li>
</ul>
<p><strong>平台即产品</strong></p>
<p>平台工程的核心原则之一是将平台产品化。平台团队需要采用产品管理思维来设计和维护一个不仅对用户友好而且满足客户（应用程序开发人员）的期望和需求的平台。它首先围绕开发人员遇到的问题收集数据点，并确定要促进的领域。这可以提高部署频率、降低变更失败率、提高可靠性和安全性、改进 DX 等。</p>
<p>重要的是要注意，构建平台就是构建核心产品，解决大多数团队面临的共同挑战。它不是解决单个团队的问题，而是跨多个团队提供产品来解决同一组问题. 例如，如果多个团队需要相同的基础设施，平台团队就可以在该共享部分上工作并分发它。这种重用平台和可重复性的想法至关重要，因为它允许在应用程序交付中实现标准化、一致性和可扩展性。</p>
<p>与产品管理一样，平台团队拥有产品，选择某些指标，并继续收集客户反馈以改善用户体验。该平台的产品路线图根据反馈不断发展，并适应客户不断变化的需求和期望。</p>
<p><strong>平台工程师的角色和职责</strong></p>
<p>平台工程师的主要职责是设计和维护自助服务平台（IDP），并为开发者提供平台服务。首先是与开发人员接触并了解他们的痛点：</p>
<ul>
<li>客户：采访开发人员和不同的 IT 团队，了解他们的工程环境和挑战，并了解他们正在优化的内容。他们可能正在尝试构建有效的 CI/CD 管道或实施更好的访问控制，以及围绕软件交付的许多其他挑战。</li>
</ul>
<p><strong>平台工程与 DevOps</strong></p>
<p>DevOps 是一种将文化转变为 SDLC 以提高软件交付速度和质量的理念。DevOps 促进了开发和运营团队之间的协作和沟通，并加速了自动化以简化部署。平台工程——一种实践而非哲学——可以被视为 DevOps 的下一个迭代，因为它共享 DevOps 的一些核心原则：协作（与 Ops）、持续改进和自动化。</p>
<p>平台团队和 DevOps 的日常任务在某些方面彼此不同。DevOps 使用某些工具和自动化来简化将代码投入生产、管理代码以及使用日志记录和监视工具对其进行观察的过程。他们主要致力于构建有效的 CI/CD 管道。平台工程师采用 DevOps 使用的所有工具，并将它们集成到一个共享平台中，不同的 IT 团队可以在企业级别使用该平台。这消除了团队自行配置和管理基础架构和工具的需要，并节省了大量时间、精力和资源。平台工程师还创建文档并优化平台，以便开发人员可以在其工作流程中自助服务工具和基础设施。</p>
<p>只有拥有许多使用复杂工具和基础设施的不同 IT 团队的成熟公司才需要平台团队。在这样的工程环境中，自然需要一个专门的平台团队来管理复杂性。平台团队构建和管理基础设施，帮助 DevOps 加速持续交付。但是，DevOps 团队在初创公司执行平台工程任务（例如配置 Terraform）是很常见的。</p>
<p><strong>平台工程与 SRE</strong></p>
<p>站点可靠性工程师 (SRE) 专注于确保应用程序可靠、安全且始终可用。他们与开发人员和运营团队合作，创建支持交付高度可靠的应用程序的系统或基础设施。SRE 还执行容量规划和基础架构扩展以及管理和响应事件，以便平台满足所需的服务级别目标 (SLO)。另一方面，平台工程管理复杂的基础设施，并为开发人员构建高效的平台以优化 SDLC。虽然两者都在平台上工作，而且他们的角色听起来很相似，但他们的目标不同。</p>
<p>平台工程和 SRE 之间的主要区别在于他们面向谁并为他们提供服务。SRE 面向最终用户并确保应用程序对他们来说是可靠的和可用的。平台工程师面对内部开发者，专注于提升他们的开发者体验。两个团队的日常任务在这些目标方面有所不同。平台工程为应用程序的快速交付提供底层基础设施，而 SRE 也为交付高可靠和可用的应用程序做同样的事情。SRE 更多地致力于故障排除和事件响应，而平台工程师专注于复杂的基础架构和支持开发人员自助服务。</p>
<p>为了实现各自的目标，SRE 和平台团队在他们的工作流程中使用不同的工具。SRE 主要使用 Prometheus 或 Grafana 等监控和日志记录工具来实时检测异常并设置自动警报。平台团队使用跨越软件交付过程各个阶段的不同工具集，例如容器编排工具、CI/CD 管道工具和 IaC 工具。总而言之，SRE 和平台团队致力于构建可靠且可扩展的基础设施，目标不同，但他们使用的工具之间存在一些重叠。</p>
<p><strong>User 模块中Mongo 替换 Mysql 的各个模块如下：</strong></p>
<p><strong>Start 模块</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func Start(client registry.SvcDiscoveryRegistry, server *grpc.Server) error {
	rdb, err := cache.NewRedis()
	if err != nil {
		return err
	}
	mongo, err := unrelation.NewMongo()
	if err != nil {
		return err
	}
	users := make([]*tablerelation.UserModel, 0)
	if len(config.Config.Manager.UserID) != len(config.Config.Manager.Nickname) {
		return errors.New("len(config.Config.Manager.AppManagerUid) != len(config.Config.Manager.Nickname)")
	}
	for k, v := range config.Config.Manager.UserID {
		users = append(users, &amp;tablerelation.UserModel{UserID: v, Nickname: config.Config.Manager.Nickname[k], AppMangerLevel: constant.AppAdmin})
	}
	userDB, err := mgo.NewUserMongo(mongo.GetDatabase())
	if err != nil {
		return err
	}
	tx, err := tx2.NewAuto(context.Background(), mongo.GetClient())
	if err != nil {
		return err
	}
	cache := cache.NewUserCacheRedis(rdb, userDB, cache.GetDefaultOpt())
	userMongoDB := unrelation.NewUserMongoDriver(mongo.GetDatabase())
	database := controller.NewUserDatabase(userDB, cache, tx, userMongoDB)
	friendRpcClient := rpcclient.NewFriendRpcClient(client)
	groupRpcClient := rpcclient.NewGroupRpcClient(client)
	msgRpcClient := rpcclient.NewMessageRpcClient(client)
	u := &amp;userServer{
		UserDatabase:             database,
		RegisterCenter:           client,
		friendRpcClient:          &amp;friendRpcClient,
		groupRpcClient:           &amp;groupRpcClient,
		friendNotificationSender: notification.NewFriendNotificationSender(&amp;msgRpcClient, notification.WithDBFunc(database.FindWithError)),
		userNotificationSender:   notification.NewUserNotificationSender(&amp;msgRpcClient, notification.WithUserFunc(database.FindWithError)),
	}
	pbuser.RegisterUserServer(server, u)
	return u.UserDatabase.InitOnce(context.Background(), users)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>User mgo 模块：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> mgo

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"github.com/openimsdk/open-im-server/v3/pkg/common/db/mgo/mtool"</span>
	<span class="token string">"github.com/openimsdk/open-im-server/v3/pkg/common/db/table/relation"</span>
	<span class="token string">"github.com/openimsdk/open-im-server/v3/pkg/common/pagination"</span>
	<span class="token string">"go.mongodb.org/mongo-driver/bson"</span>
	<span class="token string">"go.mongodb.org/mongo-driver/mongo"</span>
	<span class="token string">"go.mongodb.org/mongo-driver/mongo/options"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">NewUserMongo</span><span class="token punctuation">(</span>db <span class="token operator">*</span>mongo<span class="token punctuation">.</span>Database<span class="token punctuation">)</span> <span class="token punctuation">(</span>relation<span class="token punctuation">.</span>UserModelInterface<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>UserMgo<span class="token punctuation">{</span>
		coll<span class="token punctuation">:</span> db<span class="token punctuation">.</span><span class="token function">Collection</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> UserMgo <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	coll <span class="token operator">*</span>mongo<span class="token punctuation">.</span>Collection
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>UserMgo<span class="token punctuation">)</span> <span class="token function">Create</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> users <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>relation<span class="token punctuation">.</span>UserModel<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> mtool<span class="token punctuation">.</span><span class="token function">InsertMany</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> u<span class="token punctuation">.</span>coll<span class="token punctuation">,</span> users<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>UserMgo<span class="token punctuation">)</span> <span class="token function">UpdateByMap</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> userID <span class="token builtin">string</span><span class="token punctuation">,</span> args <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> mtool<span class="token punctuation">.</span><span class="token function">UpdateOne</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> u<span class="token punctuation">.</span>coll<span class="token punctuation">,</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token string">"user_id"</span><span class="token punctuation">:</span> userID<span class="token punctuation">}</span><span class="token punctuation">,</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token string">"$set"</span><span class="token punctuation">:</span> args<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>UserMgo<span class="token punctuation">)</span> <span class="token function">Find</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> userIDs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>users <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>relation<span class="token punctuation">.</span>UserModel<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> mtool<span class="token punctuation">.</span>Find<span class="token punctuation">[</span><span class="token operator">*</span>relation<span class="token punctuation">.</span>UserModel<span class="token punctuation">]</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> u<span class="token punctuation">.</span>coll<span class="token punctuation">,</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token string">"user_id"</span><span class="token punctuation">:</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token string">"$in"</span><span class="token punctuation">:</span> userIDs<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>UserMgo<span class="token punctuation">)</span> <span class="token function">Take</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> userID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>user <span class="token operator">*</span>relation<span class="token punctuation">.</span>UserModel<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> mtool<span class="token punctuation">.</span>FindOne<span class="token punctuation">[</span><span class="token operator">*</span>relation<span class="token punctuation">.</span>UserModel<span class="token punctuation">]</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> u<span class="token punctuation">.</span>coll<span class="token punctuation">,</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token string">"user_id"</span><span class="token punctuation">:</span> userID<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>UserMgo<span class="token punctuation">)</span> <span class="token function">Page</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> pagination pagination<span class="token punctuation">.</span>Pagination<span class="token punctuation">)</span> <span class="token punctuation">(</span>count <span class="token builtin">int64</span><span class="token punctuation">,</span> users <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>relation<span class="token punctuation">.</span>UserModel<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> mtool<span class="token punctuation">.</span>FindPage<span class="token punctuation">[</span><span class="token operator">*</span>relation<span class="token punctuation">.</span>UserModel<span class="token punctuation">]</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> u<span class="token punctuation">.</span>coll<span class="token punctuation">,</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> pagination<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>UserMgo<span class="token punctuation">)</span> <span class="token function">GetAllUserID</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> pagination pagination<span class="token punctuation">.</span>Pagination<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int64</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> mtool<span class="token punctuation">.</span>FindPage<span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> u<span class="token punctuation">.</span>coll<span class="token punctuation">,</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> pagination<span class="token punctuation">,</span> options<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SetProjection</span><span class="token punctuation">(</span>bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token string">"user_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>UserMgo<span class="token punctuation">)</span> <span class="token function">Exist</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> userID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>exist <span class="token builtin">bool</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> mtool<span class="token punctuation">.</span><span class="token function">Exist</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> u<span class="token punctuation">.</span>coll<span class="token punctuation">,</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token string">"user_id"</span><span class="token punctuation">:</span> userID<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>UserMgo<span class="token punctuation">)</span> <span class="token function">GetUserGlobalRecvMsgOpt</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> userID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>opt <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> mtool<span class="token punctuation">.</span>FindOne<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> u<span class="token punctuation">.</span>coll<span class="token punctuation">,</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token string">"user_id"</span><span class="token punctuation">:</span> userID<span class="token punctuation">}</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span><span class="token function">FindOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SetProjection</span><span class="token punctuation">(</span>bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token string">"global_recv_msg_opt"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>UserMgo<span class="token punctuation">)</span> <span class="token function">CountTotal</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> before <span class="token operator">*</span>time<span class="token punctuation">.</span>Time<span class="token punctuation">)</span> <span class="token punctuation">(</span>count <span class="token builtin">int64</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> before <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> mtool<span class="token punctuation">.</span><span class="token function">Count</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> u<span class="token punctuation">.</span>coll<span class="token punctuation">,</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> mtool<span class="token punctuation">.</span><span class="token function">Count</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> u<span class="token punctuation">.</span>coll<span class="token punctuation">,</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token string">"create_time"</span><span class="token punctuation">:</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token string">"$lt"</span><span class="token punctuation">:</span> before<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>UserMgo<span class="token punctuation">)</span> <span class="token function">CountRangeEverydayTotal</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> start time<span class="token punctuation">.</span>Time<span class="token punctuation">,</span> end time<span class="token punctuation">.</span>Time<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int64</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	pipeline <span class="token operator">:=</span> bson<span class="token punctuation">.</span>A<span class="token punctuation">{</span>
		bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span>
			<span class="token string">"$match"</span><span class="token punctuation">:</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span>
				<span class="token string">"create_time"</span><span class="token punctuation">:</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span>
					<span class="token string">"$gte"</span><span class="token punctuation">:</span> start<span class="token punctuation">,</span>
					<span class="token string">"$lt"</span><span class="token punctuation">:</span>  end<span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span>
			<span class="token string">"$group"</span><span class="token punctuation">:</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span>
				<span class="token string">"_id"</span><span class="token punctuation">:</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span>
					<span class="token string">"$dateToString"</span><span class="token punctuation">:</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span>
						<span class="token string">"format"</span><span class="token punctuation">:</span> <span class="token string">"%Y-%m-%d"</span><span class="token punctuation">,</span>
						<span class="token string">"date"</span><span class="token punctuation">:</span>   <span class="token string">"$create_time"</span><span class="token punctuation">,</span>
					<span class="token punctuation">}</span><span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
				<span class="token string">"count"</span><span class="token punctuation">:</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span>
					<span class="token string">"$sum"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">type</span> Item <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Date  <span class="token builtin">string</span> <span class="token string">`bson:"_id"`</span>
		Count <span class="token builtin">int64</span>  <span class="token string">`bson:"count"`</span>
	<span class="token punctuation">}</span>
	items<span class="token punctuation">,</span> err <span class="token operator">:=</span> mtool<span class="token punctuation">.</span>Aggregate<span class="token punctuation">[</span>Item<span class="token punctuation">]</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> u<span class="token punctuation">.</span>coll<span class="token punctuation">,</span> pipeline<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	res <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int64</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> item <span class="token operator">:=</span> <span class="token keyword">range</span> items <span class="token punctuation">{</span>
		res<span class="token punctuation">[</span>item<span class="token punctuation">.</span>Date<span class="token punctuation">]</span> <span class="token operator">=</span> item<span class="token punctuation">.</span>Count
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> res<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '87.md' style='float:left'>⬆️上一节🔗  </a><a href = '89.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


