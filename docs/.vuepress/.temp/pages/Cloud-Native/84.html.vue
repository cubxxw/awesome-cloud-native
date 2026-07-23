<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第84节-openim-standardization" tabindex="-1"><a class="header-anchor" href="#第84节-openim-standardization" aria-hidden="true">#</a> 第84节 OpenIM standardization</h1>
<div><a href = '83.md' style='float:left'>⬆️上一节🔗  </a><a href = '85.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="document-driven" tabindex="-1"><a class="header-anchor" href="#document-driven" aria-hidden="true">#</a> <strong>document-driven</strong></h2>
<p>🔥 Questions THAT can BE SOLVED WITH DOCUMENTATION and SEARCH, DON'T ASK !!!</p>
<ul>
<li><strong>Github Issue</strong></li>
<li>Google Doc</li>
<li>Pull Request</li>
</ul>
<h2 id="automation-and-simplification" tabindex="-1"><a class="header-anchor" href="#automation-and-simplification" aria-hidden="true">#</a> Automation and Simplification</h2>
<p>Once the code is submitted, it is automatically put online</p>
<ul>
<li>util test</li>
<li>gray-box testing</li>
<li>auto build &amp; push images</li>
<li>auto code link</li>
<li>make</li>
</ul>
<h2 id="openim-owner-culture" tabindex="-1"><a class="header-anchor" href="#openim-owner-culture" aria-hidden="true">#</a> OpenIM Owner Culture</h2>
<p>Owner culture requires that everything should be defined as an Owner, and this Owner has the right to give orders to other people, and other people have the obligation to cooperate with him.</p>
<p><strong>A large RFC proposal can have many features:</strong></p>
<p><strong>RFC✨: OpenIM Test Auto @Xinwei Xiong (cubxxw)</strong></p>
<ul>
<li>[x] util test @Xinwei Xiong (cubxxw)</li>
<li>[x] ete test @hrxiang491064739@gmail.com</li>
<li>[ ] etc …</li>
</ul>
<p><strong>So for the issue:</strong></p>
<ul>
<li>example: https://github.com/OpenIMSDK/Open-IM-Server/issues/385</li>
</ul>
<h2 id="review-culture" tabindex="-1"><a class="header-anchor" href="#review-culture" aria-hidden="true">#</a> Review Culture *</h2>
<p><strong>For each PR, the conditions must be met, otherwise the review is forbidden to pass:</strong></p>
<ol>
<li>The code is logically correct.</li>
<li>Connect one or more issues</li>
<li>The actions test all pass</li>
<li>extrusion type and auto merging</li>
<li>It must be signed (1 to many)</li>
</ol>
<h2 id="collaborative-tool" tabindex="-1"><a class="header-anchor" href="#collaborative-tool" aria-hidden="true">#</a> Collaborative tool *</h2>
<blockquote>
<p>I tend to give people access to the most advanced tools, so that everyone in our team's tastes are imbued with these good tools.</p>
</blockquote>
<ul>
<li>**Github ***</li>
<li>**********Slack ***********</li>
<li><strong>Zoom</strong></li>
</ul>
<p>Work communication. Mainly use Slack, Slack as an information distribution center, can be divided into channels, can be divided thread discussion, wechat note is a slag.</p>
<p>Slack invite: https://join.slack.com/t/openimsdk/shared_invite/zt-1tmoj26uf-_FDy3dowVHBiGvLk9e5Xkg</p>
<h2 id="goal-and-commitment-1-0" tabindex="-1"><a class="header-anchor" href="#goal-and-commitment-1-0" aria-hidden="true">#</a> G<strong>oal and commitment (1 &amp; 0)</strong></h2>
<p>Every one of us is a leader, manage each of your tasks. It's great, but,</p>
<p>We need to be visible</p>
<ul>
<li>at least one issue a day</li>
<li>Summarize issues at least once a day (Comment OR PR)</li>
</ul>
<h2 id="release-agreement" tabindex="-1"><a class="header-anchor" href="#release-agreement" aria-hidden="true">#</a> Release agreement *</h2>
<p>The main repository does not allow the creation of any branches. (main, release-v*, dev etc</p>
<p>All branches of a personal repository must be named according to the specification</p>
<ul>
<li>example:</li>
</ul>
<p><a href="https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694#file-githook-md" target="_blank" rel="noopener noreferrer">自己的工作流总结，githook 设计和配置，以及 Makefile githook 支持<ExternalLinkIcon/></a></p>
<h2 id="distribution-agreement" tabindex="-1"><a class="header-anchor" href="#distribution-agreement" aria-hidden="true">#</a> Distribution agreement *</h2>
<ul>
<li><code v-pre>release</code> branch and <code v-pre>main</code> branch</li>
<li>Optionally merge the <code v-pre>main</code> branch into <code v-pre>release-v*</code> branch based on <code v-pre>milestone</code> and <code v-pre>bugs</code></li>
</ul>
<p><strong>tag strategy:</strong></p>
<p><a href="https://semver.org/lang/zh-CN/" target="_blank" rel="noopener noreferrer">语义化版本 2.0.0<ExternalLinkIcon/></a></p>
<h2 id="biweekly-meeting" tabindex="-1"><a class="header-anchor" href="#biweekly-meeting" aria-hidden="true">#</a> Biweekly meeting *</h2>
<ul>
<li>OpenKF <strong>weekly meeting:</strong> Maintain and develop the project, developers discuss and learn.</li>
<li>OpenIM <strong>Biweekly meeting:</strong> In the form of live broadcast + conference discussion, we will answer questions from users and community contributors.</li>
</ul>
<h2 id="representative-openkf" tabindex="-1"><a class="header-anchor" href="#representative-openkf" aria-hidden="true">#</a> R<strong>epresentative-OpenKF</strong></h2>
<p>https://github.com/OpenIMSDK/OpenKF</p>
<p>🔥 Specification of OpenIM from the OpenKF perspective， @Bo IRONIC</p>
<p><strong>An ordinary contributor to OpenIM: @Bo IRONIC</strong></p>
<ol>
<li><strong>Docs</strong>: raise an appropriate object in an issue, etc…</li>
<li><strong>Issue: b</strong>ut what else do I need to do when I finish the documentation, labels, Milestone, select Developmen, etc…</li>
<li><strong>User Tools</strong>: local use make tools test, build and run, etc…</li>
<li><strong>PR:</strong> how do I present a quality and qualified PR.</li>
<li><strong>Review</strong>: how do you review someone else's code</li>
</ol>
<h2 id="end" tabindex="-1"><a class="header-anchor" href="#end" aria-hidden="true">#</a> END</h2>
<ul>
<li><em><strong>Ownership &amp; Leadership</strong></em></li>
<li><em><strong>Initiative</strong></em></li>
<li><em><strong>Objectives Oriented</strong></em> (Project managers and product managers)</li>
<li><em><strong>Insists on High Standard</strong></em></li>
</ul>
<h2 id="link" tabindex="-1"><a class="header-anchor" href="#link" aria-hidden="true">#</a> Link</h2>
<ul>
<li>https://github.com/lukasz-madon/awesome-remote-job</li>
<li>https://github.com/OpenIMSDK/Open-IM-Server/blob/main/CONTRIBUTING.md</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '83.md' style='float:left'>⬆️上一节🔗  </a><a href = '85.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


