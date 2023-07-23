<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第81节-kafka-服务器教程" tabindex="-1"><a class="header-anchor" href="#第81节-kafka-服务器教程" aria-hidden="true">#</a> 第81节 kafka 服务器教程</h1>
<div><a href = '80.md' style='float:left'>⬆️上一节🔗  </a><a href = '82.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<div class="language-mermaid ext-mermaid line-numbers-mode"><pre v-pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
A<span class="token text string">[Conversation]</span> <span class="token arrow operator">--></span> B<span class="token text string">(markConversationMessageAsRead)</span>
B <span class="token arrow operator">--></span> C<span class="token text string">(getConversation)</span>
C <span class="token arrow operator">--></span> D<span class="token text string">(getConversationPeerNormalMsgSeq)</span>
D <span class="token arrow operator">--></span> E<span class="token text string">(getConversationNormalMsgSeq)</span>
E <span class="token arrow operator">--></span> F<span class="token text string">(getUnreadMessage)</span>
F <span class="token arrow operator">--></span> G<span class="token text string">(getAsReadMsgMapAndList)</span>
G <span class="token arrow operator">--></span> H<span class="token text string">(markConversationAsReadSvr)</span>
H <span class="token arrow operator">--></span> I<span class="token text string">(MarkConversationMessageAsRead)</span>
I <span class="token arrow operator">--></span> J<span class="token text string">(updateColumnsConversation)</span>
J <span class="token arrow operator">--></span> K<span class="token text string">(unreadChangeTrigger)</span>
B <span class="token arrow operator">--></span> L<span class="token text string">(markConversationMessageAsReadByMsgID)</span>
L <span class="token arrow operator">--></span> C
L <span class="token arrow operator">--></span> M<span class="token text string">(getMessagesByClientMsgIDs)</span>
M <span class="token arrow operator">--></span> N<span class="token text string">(getAsReadMsgMapAndList)</span>
N <span class="token arrow operator">--></span> H
N <span class="token arrow operator">--></span> O<span class="token text string">(MarkMsgsAsRead)</span>
O <span class="token arrow operator">--></span> I
O <span class="token arrow operator">--></span> P<span class="token text string">(MarkConversationMessageAsRead)</span>
P <span class="token arrow operator">--></span> K
B <span class="token arrow operator">--></span> Q<span class="token text string">(doUnreadCount)</span>
Q <span class="token arrow operator">--></span> C
C <span class="token arrow operator">--></span> R<span class="token text string">(GetConversation)</span>
R <span class="token arrow operator">--></span> S<span class="token text string">(doReadDrawing)</span>
S <span class="token arrow operator">--></span> T<span class="token text string">(UnmarshalNotificationElem)</span>
T <span class="token arrow operator">--></span> U<span class="token text string">(GetConversation)</span>
U <span class="token arrow operator">--></span> V<span class="token text string">(GetMessagesBySeqs)</span>
V <span class="token arrow operator">--></span> W<span class="token text string">(UpdateMessage)</span>
W <span class="token arrow operator">--></span> X<span class="token text string">(OnRecvC2CReadReceipt/OnRecvGroupReadReceipt)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是拉取信息列表的逻辑：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (c *Conversation) pullMessageAndReGetHistoryMessages(ctx context.Context, conversationID string, seqList []int64, notStartTime,
	isReverse bool, count, sessionType int, startTime int64, list *[]*model_struct.LocalChatLog, messageListCallback *sdk.GetAdvancedHistoryMessageListCallback) {
	existedSeqList, err := c.db.SuperGroupGetAlreadyExistSeqList(ctx, conversationID, seqList)
	if err != nil {
		// log.Error(operationID, "SuperGroupGetAlreadyExistSeqList err", err.Error(), sourceID, seqList)
		return
	}
	if len(existedSeqList) == len(seqList) {
		// log.Debug(operationID, "do not pull message")
		return
	}
	newSeqList := utils.DifferenceSubset(seqList, existedSeqList)
	if len(newSeqList) == 0 {
		// log.Debug(operationID, "do not pull message")
		return
	}
	var pullMsgResp sdkws.PullMessageBySeqsResp
	var pullMsgReq sdkws.PullMessageBySeqsReq
	pullMsgReq.UserID = c.loginUserID
	var seqRange sdkws.SeqRange
	seqRange.ConversationID = conversationID
	seqRange.Begin = newSeqList[0]
	seqRange.End = newSeqList[len(newSeqList)-1]
	seqRange.Num = int64(len(newSeqList))
	pullMsgReq.SeqRanges = append(pullMsgReq.SeqRanges, &amp;seqRange)
	log.ZDebug(ctx, "read diffusion group pull message,  ", "req", pullMsgReq)
	if notStartTime &amp;&amp; !c.LongConnMgr.IsConnected() {
		return
	}
	err = c.SendReqWaitResp(ctx, &amp;pullMsgReq, constant.PullMsgBySeqList, &amp;pullMsgResp)
	if err != nil {
		errHandle(newSeqList, list, err, messageListCallback)
		log.ZDebug(ctx, "pullmsg SendReqWaitResp failed", err, "req")
	} else {
		log.ZDebug(ctx, "syncMsgFromServerSplit pull msg", "resp", pullMsgResp)
		if v, ok := pullMsgResp.Msgs[conversationID]; ok {
			c.pullMessageIntoTable(ctx, pullMsgResp.Msgs, conversationID)
			messageListCallback.IsEnd = v.IsEnd

			if notStartTime {
				*list, err = c.db.GetMessageListNoTime(ctx, conversationID, count, isReverse)
			} else {
				*list, err = c.db.GetMessageList(ctx, conversationID, count, startTime, isReverse)
			}
		}

	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>仿照上面的逻辑写出已读信息的逻辑，修改下面代码：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (c *Conversation) markMsgAsRead2Svr(ctx context.Context, conversationID string, seqs []int64) error {

}

func (c *Conversation) markConversationAsReadSvr(ctx context.Context, conversationID string, hasReadSeq int64) error {

}

func (c *Conversation) setConversationHasReadSeq(ctx context.Context, conversationID string, hasReadSeq int64) error {

}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>很高兴你成为了 Kubecub member 的一员，接下来我们将会共同打造顶级的开源社区 *kubecub*</strong>。 💪</p>
<p>我们有两个很特殊的仓库，分别定义了私有规则和公共规则，其中私有规则对应私有仓库和 member。</p>
<ul>
<li>https://github.com/kubecub/.github-private</li>
<li>https://github.com/kubecub/.github</li>
</ul>
<h2 id="需要的步骤-✏️" tabindex="-1"><a class="header-anchor" href="#需要的步骤-✏️" aria-hidden="true">#</a> 需要的步骤 ✏️</h2>
<p>我们推荐你将 kubecub 加入到自己 GitHub 主页上面，点击 <a href="https://github.com/orgs/kubecub/people" target="_blank" rel="noopener noreferrer">people<ExternalLinkIcon/></a> 改变 Private 为 Public. 👍</p>
<p>一定要知道 <a href="https://github.com/kubecub/community" target="_blank" rel="noopener noreferrer">community<ExternalLinkIcon/></a> 仓库是记录这更多贡献者需要的帮助文档，包括贡献者文档，RFC。</p>
<h2 id="github-🐙" tabindex="-1"><a class="header-anchor" href="#github-🐙" aria-hidden="true">#</a> .github 🐙</h2>
<p><code v-pre>.github/workflows/</code> 目录:包含几个 GitHub Actions 工作流程模板</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>- dependabot.yml <span class="token comment"># 启用 Dependabot,自动监视依赖更新 👀</span>
- license-checker.yml <span class="token comment"># 运行许可证检查,确保包含开源许可证 🛡️</span>
- superlinter.yml <span class="token comment"># 运行 Super Linter,检查代码样式和格式 🔍</span>
- security.yml <span class="token comment"># 启用安全警报,检测敏感数据泄露 🚨</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>.github/CODEOWNERS</code>:定义仓库的代码所有者规则 👪</p>
<p><code v-pre>.github/dependabot.yml</code>:Dependabot 配置文件,定义要监视的依赖项和更新频率 👀</p>
<p><code v-pre>.github/no-response.yml</code>:定义&quot;没有回应&quot;警报的配置 ⚠️</p>
<p><code v-pre>.github/config.yml</code>:启用 CodeQL 代码扫描,定期扫描代码漏洞和错误 🔒</p>
<p><code v-pre>.github/ISSUE_TEMPLATE/</code>:Issue 模板目录,包含 Bug 报告、功能请求等 Issue 默认模板 📑</p>
<p><code v-pre>.gitignore</code>:Git 忽略规则模板 🚫</p>
<p><code v-pre>LICENSE</code>:MIT 许可证模板 📜</p>
<p><code v-pre>.editorconfig</code>:编辑器配置文件,定义代码风格规则 ✏️</p>
<p><a href="http://readme.md/" target="_blank" rel="noopener noreferrer">README.md<ExternalLinkIcon/></a>:自述文件模板 📃</p>
<h2 id="why-choose-kubecub-🤔" tabindex="-1"><a class="header-anchor" href="#why-choose-kubecub-🤔" aria-hidden="true">#</a> Why Choose Kubecub? 🤔</h2>
<p>Kubecub 帮助更多的开发者和学生快速加入开源并且学习开源，提供了成熟的各个语言手脚架和模板，以及一个成熟的项目规范、社区规范、以及运营规范，通过 Kubecub，你能找到更多有共同目标和愿望的开发者、朋友，我们相互之间 review 代码，分享创意，并且实现自己的创意。👨‍💻 👩‍💻</p>
<p>你可以通过以下方式加入 Kubecub 社区：</p>
<ul>
<li>参与 Kubecub 已有的任意一个项目和功能模块进行开发。</li>
<li>抱着创造价值的形式，<a href="https://github.com/organizations/kubecub/repositories/new" target="_blank" rel="noopener noreferrer">创建一个新的存储库<ExternalLinkIcon/></a> 并且公开它，使用我们手脚架和模板、以及 robot 更好的开发体验。 🤖</li>
</ul>
<p>Kubecub 旨在为 Kubernetes 用户和开发者提供一个中心位置，以分享他们的经验并相互学习。我们的社区提供各种资源，创建各种有意思的小项目和工具。包括：</p>
<ul>
<li><strong>教程：</strong> Kubecub 提供了整套的文档、社区管理、项目管理、社区治理体系文章，在 <a href="https://github.com/kubecub/community" target="_blank" rel="noopener noreferrer">community<ExternalLinkIcon/></a> 社区存储库中有成熟的治理体系。📖</li>
<li><strong>文档：</strong> 访问我们的 <a href="https://github.com/kubecub/docs" target="_blank" rel="noopener noreferrer">综合文档<ExternalLinkIcon/></a>，对整个 Kubecub 的仓库通过 actions 自动化同步和管理，除此之外，我们提供了很多学习文档，包括 [Kubecub 社区学习文档](javascript:void(0))，还提供了 [Go语言](javascript:void(0)) 和 [Kubernetes](javascript:void(0)) 的教程文档。📑</li>
<li><strong>论坛：</strong> 加入我们的 <a href="https://join.slack.com/t/kubecub/shared_invite/zt-1se0k2bae-lkYzz0_T~BYh3rjkvlcUqQ" target="_blank" rel="noopener noreferrer">Slack<ExternalLinkIcon/></a>，向我们的社区提问并获得帮助。 💬</li>
<li><strong>活动：</strong> 参加我们的 <a href="https://github.com/orgs/kubecub/discussions" target="_blank" rel="noopener noreferrer">活动<ExternalLinkIcon/></a>，与其他 Kubecub 的用户和开发者联系并从经验丰富的开发人员学习。 👥</li>
</ul>
<p>一起加入 Kubecub，开启你的开源之旅！🎉</p>
<h2 id="what-can-you-find-🚀" tabindex="-1"><a class="header-anchor" href="#what-can-you-find-🚀" aria-hidden="true">#</a> What can you find？ 🚀</h2>
<p>您可以参与每个模块。这是一个完全开源的社区，具有区块链安全性，可以帮助您加入开源，帮助您学习，并允许您成为贡献者。</p>
<p>不管您学习的是 Java、Python、Go、Rust、C/C++、JavaScript、HTML、CSS，甚至是写出优秀文档的能力，您都始终受到 kubecub 的欢迎。即使您认为自己不是一个伟大的 kubecub，我们也希望您成为一个 kubecub。 😄</p>
<p>如果您想加入我们，请发送电子邮件到 <a href="mailto:cub@nsddd.top">cub@nsddd.top</a>，包括您的 GitHub 地址。 📧</p>
<h2 id="contact-us-👋" tabindex="-1"><a class="header-anchor" href="#contact-us-👋" aria-hidden="true">#</a> Contact Us 👋</h2>
<p>我们在 kubecub 这里非常重视与我们的用户、开发人员和贡献者之间的紧密联系。凭借庞大的社区和维护人员团队，我们始终在这里为您提供帮助和支持。无论您是想加入我们的社区还是有任何问题或建议，我们都欢迎您与我们联系。</p>
<p>我们最推荐的联系方式是通过 <a href="https://join.slack.com/t/c-ub/shared_invite/zt-1se0k2bae-lkYzz0_T~BYh3rjkvlcUqQ" target="_blank" rel="noopener noreferrer">Slack<ExternalLinkIcon/></a>。即使您在中国，Slack 通常不会被防火墙屏蔽，这使得与我们联系变得很容易。我们的 Slack 社区是与 kubecub 的其他用户和开发人员讨论和分享想法和建议的理想场所。您可以询问技术问题，寻求帮助，或与 kubecub 的其他用户分享您的经验。</p>
<p>除了 Slack，我们还提供以下联系方式：</p>
<ul>
<li><a href="https://join.slack.com/t/kubecub/shared_invite/zt-1se0k2bae-lkYzz0_T~BYh3rjkvlcUqQ" target="_blank"><img src="https://img.shields.io/badge/Slack-automation%2B-blueviolet?logo=slack&amp;logoColor=white"></a> 我们还有 Slack 频道供您交流和讨论。访问 https://slack.com/ 并加入我们的 <a href="https://join.slack.com/t/kubecub/shared_invite/zt-1se0k2bae-lkYzz0_T~BYh3rjkvlcUqQ" target="_blank" rel="noopener noreferrer">👀 kubecub slack<ExternalLinkIcon/></a> 团队频道。</li>
<li><a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=3293172751nss@gmail.com" target="_blank"><img src="https://img.shields.io/badge/gmail-%40kubecub-blue?style=social&kubecubo=gmail&logo=gmail"></a> 通过电子邮件与我们联系 <a href="mailto:3293172751nss@gmail.com">📨Gmail: 3293172751nss@gmail.com</a>。如果您有任何需要解决的问题或问题，或者对我们的开源项目有任何建议和反馈，请随时通过电子邮件与我们联系。</li>
<li><a href="https://nsddd.top" target="_blank"><img src="https://img.shields.io/badge/博客-%40kubecub-blue?style=social&logo=Octopus Deploy&logoColor=red"></a> 阅读我们的 <a href="https://nsddd.top/" target="_blank" rel="noopener noreferrer">🤖kubecub<ExternalLinkIcon/></a>。我们的 kubecub 是了解 kubecub 项目和趋势的绝佳场所。在 kubecub 上，我们分享我们的最新发展、技术趋势和其他有趣信息。</li>
<li><a href="https://twitter.com/xxw3293172751" target="_blank"><img src="https://img.shields.io/badge/twitter-%40kubecub-informational?kubecubo=twitter&style=flat-square&logo=twitter"></a> 添加 <a href="https://twitter.com/xxw3293172751" target="_blank" rel="noopener noreferrer">🕊️Twitter<ExternalLinkIcon/></a> 。如果您喜欢社交媒体，我们的 Twitter 帐户是了解 kubecub 项目新闻和趋势的好方法。在 Twitter 上，我们分享我们的最新技术和趋势，以及相关新闻和活动。</li>
<li><a href="http://sm.nsddd.top/sm0d220ad72063197b9875379403f6c88.jpg" target="_blank"><img src="https://img.shields.io/badge/微信-smile-brightgreen?kubecubo=wechat&style=flat-square?logo=wechat"></a> 添加 <a href="https://img.shields.io/badge/%E5%BE%AE%E4%BF%A1-smile-brightgreen?kubecubo=wechat&amp;style=flat-square" target="_blank" rel="noopener noreferrer">📲Wechat<ExternalLinkIcon/></a> 并指出您是 kubecub 的用户或开发人员。我们会尽快处理您的请求。</li>
</ul>
<p>无论您是想加入我们的社区还是有任何问题或建议，我们都欢迎您与我们联系。 👋</p>
<blockquote>
<p>Note 📝
这不是一个私有存储库，kubecub 的目的是帮助更多的人学习和进步。kubecub 的赞助和贡献将是公开透明的，所有赞助收益将用于善良的事业。 ❤️</p>
</blockquote>
<h2 id="backers" tabindex="-1"><a class="header-anchor" href="#backers" aria-hidden="true">#</a> Backers</h2>
<p>Thank you to all our backers! 🙏 [<a href="https://opencollective.com/kubecub#backer" target="_blank" rel="noopener noreferrer">Become a backer<ExternalLinkIcon/></a>]</p>
<p>We want anyone to get involved in our community, we offer gifts and rewards, and we welcome you to join us every Thursday night.</p>
<p>We take notes of each <a href="https://github.com/OpenIMSDK/Open-IM-Server/issues/381" target="_blank" rel="noopener noreferrer">biweekly meeting<ExternalLinkIcon/></a> in <a href="https://github.com/OpenIMSDK/Open-IM-Server/discussions/categories/meeting" target="_blank" rel="noopener noreferrer">GitHub discussions<ExternalLinkIcon/></a>, and our minutes are written in <a href="https://docs.google.com/document/d/1nx8MDpuG74NASx081JcCpxPgDITNTpIIos0DS6Vr9GU/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Google Docs<ExternalLinkIcon/></a>.</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '80.md' style='float:left'>⬆️上一节🔗  </a><a href = '82.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


