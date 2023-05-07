<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第48节-contributing-to-name" tabindex="-1"><a class="header-anchor" href="#第48节-contributing-to-name" aria-hidden="true">#</a> 第48节 Contributing to {name}</h1>
<div><a href = '47.md' style='float:left'>⬆️上一节🔗  </a><a href = '49.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<hr>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>name: CONTRIBUTING.md
**替换：**

<span class="token punctuation">{</span>name<span class="token punctuation">}</span> -<span class="token operator">></span> log

<span class="token punctuation">{</span>github<span class="token punctuation">}</span> -<span class="token operator">></span> kubecub/log

<span class="token punctuation">{</span>blog<span class="token punctuation">}</span> -<span class="token operator">></span> 博客

<span class="token punctuation">{</span>slack<span class="token punctuation">}</span> -<span class="token operator">></span> 链接

<span class="token punctuation">{</span>email<span class="token punctuation">}</span> -<span class="token operator">></span> <span class="token punctuation">[</span>3293172751nss@gmail.com<span class="token punctuation">]</span><span class="token punctuation">(</span>mailto:3293172751nss@gmail.com<span class="token punctuation">)</span>

<span class="token punctuation">{</span>wechat<span class="token punctuation">}</span> -<span class="token operator">></span> 替换为图片连接地址

<span class="token punctuation">{</span>twitter<span class="token punctuation">}</span> -<span class="token operator">></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p><strong>Google docs:</strong></p>
<iframe src="https://docs.google.com/document/d/e/2PACX-1vTqvLkjWjchvA-TBGMNVsbjKx_aqZedOQ-No5zm_2kmiMuluK3zy1VlVAY2y3hgbWvw6zF1ZLLib8l1/pub?embedded=true"></iframe>
<h1 id="contributing-to-name" tabindex="-1"><a class="header-anchor" href="#contributing-to-name" aria-hidden="true">#</a> Contributing to {name}</h1>
<p>So, you want to hack on {name}? Yay!</p>
<p>First of all, thank you for considering contributing to our project! We appreciate your time and effort, and we value any contribution, whether it's reporting a bug, suggesting a new feature, or submitting a pull request.</p>
<p>This document provides guidelines and best practices to help you contribute effectively.</p>
<h2 id="📇topics" tabindex="-1"><a class="header-anchor" href="#📇topics" aria-hidden="true">#</a> 📇Topics</h2>
<ul>
<li><a href="#What-we-expect-of-you">What we expect of you</a></li>
<li><a href="#Code-of-Conduct">Code of Conduct</a></li>
<li><a href="#Getting-Started">Getting Started</a></li>
<li><a href="#Style-and-Specification">Style and Specification</a></li>
<li><a href="#Engage-to-help-anything">Engage to help anything</a></li>
<li><a href="#Release-version">Release version</a></li>
<li><a href="#Contact-Us">Contact Us</a></li>
</ul>
<h2 id="what-we-expect-of-you" tabindex="-1"><a class="header-anchor" href="#what-we-expect-of-you" aria-hidden="true">#</a> What we expect of you</h2>
<p>We hope that anyone can join {name} , even if you are a student, writer, translator</p>
<p>Please meet the minimum version of the Go language published in <a href="./go.mod">go.mod</a>. If you want to manage the Go language version, we provide tools to install <a href="https://github.com/moovweb/gvm" target="_blank" rel="noopener noreferrer">gvm<ExternalLinkIcon/></a> in our <a href="./Makefile">Makefile</a></p>
<p>You'd better use Linux as the development environment, Linux with <a href="./Makefile">Makefile</a> can help you quickly build and test {name} project.</p>
<p>If you are familiar with <a href="./Makefile">Makefile</a> , you can easily see the clever design of the {name} Makefile. Storing the necessary tools such as golangci in the <code v-pre>/tools</code> directory can avoid some tool version issues.</p>
<p>The <a href="./Makefile">Makefile</a> is for every developer, even if you don't know how to use the Makefile tool, don't worry, we provide two great commands to get you up to speed with the Makefile architecture, <code v-pre>make help</code> and <code v-pre>make help-all</code>, it can reduce problems of the developing environment.</p>
<h2 id="code-of-conductcode-of-conduct" tabindex="-1"><a class="header-anchor" href="#code-of-conductcode-of-conduct" aria-hidden="true">#</a> Code of ConductCode of Conduct</h2>
<p>We divide the problem into security and general problems:</p>
<h4 id="reporting-security-issues" tabindex="-1"><a class="header-anchor" href="#reporting-security-issues" aria-hidden="true">#</a> Reporting security issues</h4>
<p>Security issues are always treated seriously. As our usual principle, we discourage anyone to spread security issues. If you find a security issue of {name}, please do not discuss it in public and even do not open a public issue.</p>
<p>Instead we encourage you to send us a private email to {email} to report this.</p>
<h4 id="reporting-general-issues" tabindex="-1"><a class="header-anchor" href="#reporting-general-issues" aria-hidden="true">#</a> Reporting general issues</h4>
<p>To be honest, we regard every user of {name}as a very kind contributor. After experiencing {name}, you may have some feedback for the project. Then feel free to open an issue via <a href="https://github.com/%7Bgithub%7D/issues/new/choose" target="_blank" rel="noopener noreferrer">NEW ISSUE<ExternalLinkIcon/></a>.</p>
<p>Since we collaborate project {name} in a distributed way, we appreciate <strong>WELL-WRITTEN</strong>, <strong>DETAILED</strong>, <strong>EXPLICIT</strong> issue reports. To make the communication more efficient, we wish everyone could search if your issue is an existing one in the searching list. If you find it existing, please add your details in comments under the existing issue instead of opening a brand new one.</p>
<p>To make the issue details as standard as possible, we setup an <a href="https://github.com/%7Bgithub%7D/tree/main/.github/ISSUE_TEMPLATE" target="_blank" rel="noopener noreferrer">ISSUE TEMPLATE<ExternalLinkIcon/></a> for issue reporters. You can find three kinds of issue templates there: question, bug report and feature request. Please <strong>BE SURE</strong> to follow the instructions to fill fields in template.</p>
<p><strong>There are a lot of cases when you could open an issue:</strong></p>
<ul>
<li>bug report</li>
<li>feature request</li>
<li>{name} performance issues</li>
<li>feature proposal</li>
<li>feature design</li>
<li>help wanted</li>
<li>doc incomplete</li>
<li>test improvement</li>
<li>any questions on {name} project</li>
<li>and so on</li>
</ul>
<p>Also, we must be reminded when submitting a new question about {name}, please remember to remove the sensitive data from your post. Sensitive data could be password, secret key, network locations, private business data and so on.</p>
<h4 id="code-and-doc-contribution" tabindex="-1"><a class="header-anchor" href="#code-and-doc-contribution" aria-hidden="true">#</a> Code and doc contribution</h4>
<p>Every action to make project {name} better is encouraged. On GitHub, every improvement for {name} could be via a <a href="https://github.com/%7Bname%7D/pulls" target="_blank" rel="noopener noreferrer">PR<ExternalLinkIcon/></a> (short for pull request).</p>
<ul>
<li>If you find a typo, try to fix it!</li>
<li>If you find a bug, try to fix it!</li>
<li>If you find some redundant codes, try to remove them!</li>
<li>If you find some test cases missing, try to add them!</li>
<li>If you could enhance a feature, please <strong>DO NOT</strong> hesitate!</li>
<li>If you find code implicit, try to add comments to make it clear!</li>
<li>If you find code ugly, try to refactor that!</li>
<li>If you can help to improve documents, it could not be better!</li>
<li>If you find document incorrect, just do it and fix that!</li>
<li>...</li>
</ul>
<h4 id="where-should-i-start" tabindex="-1"><a class="header-anchor" href="#where-should-i-start" aria-hidden="true">#</a> Where should I start?</h4>
<ul>
<li>If you are new to the project, don't know how to contribute {name}, please check out the <a href="https://github.com/%7Bgithub%7D/issues?q=is%3Aopen+label%3A%22good+first+issue%22+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer">good first issue<ExternalLinkIcon/></a> label.</li>
<li>You should be good at filtering the {name} issue tags and finding the ones you like, such as <a href="https://github.com/%7Bgithub%7D/issues?q=is%3Aissue+is%3Aopen+RFC+label%3ARFC" target="_blank" rel="noopener noreferrer">RFC<ExternalLinkIcon/></a> for big initiatives, features for <a href="https://github.com/%7Bgithub%7D/issues?q=is%3Aissue+label%3Afeature" target="_blank" rel="noopener noreferrer">feature<ExternalLinkIcon/></a> proposals, and <a href="https://github.com/%7Bgithub/issues?q=is%3Aissue+label%3Abug+" target="_blank" rel="noopener noreferrer">bug<ExternalLinkIcon/></a> fixes.</li>
<li>If you are looking for something to work on, check out our <a href="https://github.com/%7Bgithub%7D/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer">open issues<ExternalLinkIcon/></a>.</li>
<li>If you have an idea for a new feature, please <a href="https://github.com/%7Bgithub%7D/issues/new/choose" target="_blank" rel="noopener noreferrer">open an issue<ExternalLinkIcon/></a>, and we can discuss it.</li>
</ul>
<h4 id="design-documents" tabindex="-1"><a class="header-anchor" href="#design-documents" aria-hidden="true">#</a> Design documents</h4>
<p>For any substantial design, there should be a well-crafted design document. This document is not just a simple record, but also a detailed description and manifestation, which can help team members better understand the design thinking and grasp the design direction. In the process of writing the design document, we can choose to use tools such as <code v-pre>Google Docs</code> or <code v-pre>Notion</code>, and even mark RFC in <a href="https://github.com/%7Bgithub%7D/issues?q=is%3Aissue+is%3Aopen+RFC+label%3ARFC" target="_blank" rel="noopener noreferrer">issues<ExternalLinkIcon/></a> or <a href="https://github.com/%7Bgithub%7D/discussions" target="_blank" rel="noopener noreferrer">discussions<ExternalLinkIcon/></a> for better collaboration. Of course, after completing the design document, we should also add it to our <a href="https://drive.google.com/drive/" target="_blank" rel="noopener noreferrer">Shared Drive<ExternalLinkIcon/></a> and notify the appropriate working group to let everyone know of its existence. Only by doing so can we maximize the effectiveness of the design document and provide strong support for the smooth progress of the project.</p>
<p>Anybody can access the shared Drive for reading. To get access to comment. Once you've done that, head to the <a href="https://drive.google.com/" target="_blank" rel="noopener noreferrer">shared Drive<ExternalLinkIcon/></a> and behold all the docs.</p>
<p>In addition to that, we'd love to invite you to <a href="%7Bslack%7D">Join Our Slack</a> where you can play with your imagination, tell us what you're working on, and get a quick response.</p>
<p>When documenting a new design, we recommend a 2-step approach:</p>
<ol>
<li>Use the short-form <strong>RFC</strong> template to outline your ideas and get early feedback.</li>
<li>Once you have received sufficient feedback and consensus, you may use the longer-form design doc template to specify and discuss your design in more details.</li>
</ol>
<p>In order to contribute a feature to {name} you'll need to go through the following steps:</p>
<ul>
<li>Discuss your idea with the appropriate <a href="%7Bslack%7D">working groups</a> on the working group's Slack channel.</li>
<li>Once there is general agreement that the feature is useful, create a GitHub issue to track the discussion. The issue should include information about the requirements and use cases that it is trying to address.</li>
<li>Include a discussion of the proposed design and technical details of the implementation in the issue.</li>
</ul>
<p>But keep in mind that there is no guarantee of it being accepted and so it is usually best to get agreement on the <strong>idea/design</strong> before time is spent coding it. However, sometimes seeing the exact code change can help focus discussions, so the choice is up to you.</p>
<h2 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started" aria-hidden="true">#</a> Getting Started</h2>
<p>To propose PR for the {name} item, we assume you have registered a GitHub ID. Then you could finish the preparation in the following steps:</p>
<ol>
<li>
<p><strong>Fork</strong> the repository({name})</p>
</li>
<li>
<p><strong>CLONE</strong> your own repository to master locally. Use <code v-pre>git clone https://github.com/&lt;your-username&gt;/{name}.git</code> to clone repository to your local machine. Then you can create new branches to finish the change you wish to make.</p>
</li>
<li>
<p><strong>Set Remote</strong> upstream to be <code v-pre>https://github.com/{github}.git</code> using the following two commands:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> remote <span class="token function">add</span> upstream https://github.com/<span class="token punctuation">{</span>github<span class="token punctuation">}</span>.git
❯ <span class="token function">git</span> remote set-url <span class="token parameter variable">--push</span> upstream no-pushing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>With this remote setting, you can check your <strong>git remote configuration</strong> like this:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>❯ git remote <span class="token operator">-</span>v
origin     https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span><span class="token operator">&lt;</span>your<span class="token operator">-</span>username<span class="token operator">></span><span class="token operator">/</span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token punctuation">.</span>git <span class="token punctuation">(</span>fetch<span class="token punctuation">)</span>
origin     https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span><span class="token operator">&lt;</span>your<span class="token operator">-</span>username<span class="token operator">></span><span class="token operator">/</span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token punctuation">.</span>git <span class="token punctuation">(</span>push<span class="token punctuation">)</span>
upstream   https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span><span class="token punctuation">{</span>github<span class="token punctuation">}</span><span class="token punctuation">.</span>git <span class="token punctuation">(</span>fetch<span class="token punctuation">)</span>
upstream   no<span class="token operator">-</span>pushing <span class="token punctuation">(</span>push<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Adding this, we can easily synchronize local branches with upstream branches.</p>
</li>
<li>
<p>Create a new branch for your changes (use a descriptive name, such as <code v-pre>fix-bug-123</code> or <code v-pre>add-new-feature</code>).</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token builtin class-name">cd</span> <span class="token punctuation">{</span>name<span class="token punctuation">}</span>
❯ <span class="token function">git</span> fetch upstream
❯ <span class="token function">git</span> checkout main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Create a new branch:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> <span class="token operator">&lt;</span>new-branch<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Make any change on the <code v-pre>new-branch</code> then use <a href="./Makefile">Makefile</a> build and test your codes.</p>
</li>
<li>
<p><strong>Commit your changes</strong> to your local branch, lint before committing and commit with sign-off</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> rebase upstream/main
❯ <span class="token function">make</span> lint	  <span class="token comment"># golangci-lint run -c .golangci.yml</span>
❯ <span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>  <span class="token comment"># add changes to staging</span>
❯ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">"message for your changes"</span> <span class="token comment"># -s adds a Signed-off-by trailer</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Push your branch</strong>  to your forked repository, it is recommended to have only one commit for a <strong>PR</strong>.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># sync up with upstream</span>
❯ <span class="token function">git</span> fetch upstream
❯ <span class="token function">git</span> rebase upstream/main
❯ <span class="token function">git</span> rebase <span class="token parameter variable">-i</span>	<span class="token operator">&lt;</span>commit-id<span class="token operator">></span> <span class="token comment"># rebase with interactive mode to squash your commits into a single one</span>
❯ <span class="token function">git</span> push <span class="token comment"># push to the remote repository, if it's a first time push, run git push --set-upstream origin &lt;new-branch></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can also use <code v-pre>git commit -s --amend &amp;&amp; git push -f</code> to update modifications on the previous commit.</p>
<p>If you have developed multiple features in the same branch, you should create PR separately by rebasing to the main branch between each push:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># create new branch, for example git checkout -b feature/infra</span>
❯ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> <span class="token operator">&lt;</span>new branch<span class="token operator">></span>
<span class="token comment"># update some code, feature1</span>
❯ <span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
❯ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token parameter variable">-s</span> <span class="token string">"feat: feature one"</span>
❯ <span class="token function">git</span> push <span class="token comment"># if it's first time push, run git push --set-upstream origin &lt;new-branch></span>
<span class="token comment"># then create pull request, and merge</span>
<span class="token comment"># update some new feature, feature2, rebase main branch first.</span>
❯ <span class="token function">git</span> rebase upstream/main <span class="token comment"># rebase the current branch to upstream/main branch</span>
❯ <span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
❯ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token parameter variable">-s</span> <span class="token string">"feat: feature two"</span>
<span class="token comment"># then create pull request, and merge</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>File a pull request</strong> to <code v-pre>{github}:main</code></p>
<p>It is recommended to review your changes before filing a pull request. Check if your code doesn't conflict with the main branch and no redundant code is included.</p>
</li>
</ol>
<h2 id="style-and-specification" tabindex="-1"><a class="header-anchor" href="#style-and-specification" aria-hidden="true">#</a> Style and Specification</h2>
<h4 id="commit-rules" tabindex="-1"><a class="header-anchor" href="#commit-rules" aria-hidden="true">#</a> Commit Rules</h4>
<p>Actually in {name}, we take two rules serious when committing:</p>
<p><strong>🥇 Commit Message:</strong></p>
<p>Commit message could help reviewers better understand what the purpose of submitted PR is. It could help accelerate the code review procedure as well. We encourage contributors to use <strong>EXPLICIT</strong> commit message rather than ambiguous message. In general, we advocate the following commit message type:</p>
<p>We use <a href="https://www.conventionalcommits.org/en/v1.0.0/" target="_blank" rel="noopener noreferrer">Semantic Commits<ExternalLinkIcon/></a> to make it easier to understand what a commit does and to build pretty changelogs. Please use the following prefixes for your commits:</p>
<ul>
<li><code v-pre>docs: xxxx</code>. For example, &quot;docs: add docs about storage installation&quot;.</li>
<li><code v-pre>feature: xxxx</code>.For example, &quot;feature: make result show in sorted order&quot;.</li>
<li><code v-pre>bugfix: xxxx</code>. For example, &quot;bugfix: fix panic when input nil parameter&quot;.</li>
<li><code v-pre>style: xxxx</code>. For example, &quot;style: format the code style of Constants.java&quot;.</li>
<li><code v-pre>refactor: xxxx.</code> For example, &quot;refactor: simplify to make codes more readable&quot;.</li>
<li><code v-pre>test: xxx</code>. For example, &quot;test: add unit test case for func InsertIntoArray&quot;.</li>
<li><code v-pre>chore: xxx.</code> For example, &quot;chore: integrate travis-ci&quot;. It's the type of mantainance change.</li>
<li>other readable and explicit expression ways.</li>
</ul>
<p>On the other side, we discourage contributors from committing message like the following ways:</p>
<ul>
<li><s>fix bug</s></li>
<li><s>update</s></li>
<li><s>add doc</s></li>
</ul>
<p><strong>🥈 Commit Content:</strong></p>
<p>Commit content represents all content changes included in one commit. We had better include things in one single commit which could support reviewer's complete review without any other commits' help.</p>
<p>In another word, contents in one single commit can pass the CI to avoid code mess. In brief, there are two minor rules for us to keep in mind:</p>
<ol>
<li>avoid very large change in a commit.</li>
<li>complete and reviewable for each commit.</li>
<li>words are written in lowercase English, not uppercase English or other languages such as Chinese.</li>
</ol>
<p>No matter what the commit message, or commit content is, we do take more emphasis on code review.</p>
<p>An example for this could be:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">"docs: add a new section to the README"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="pr-description" tabindex="-1"><a class="header-anchor" href="#pr-description" aria-hidden="true">#</a> PR Description</h4>
<p>PR is the only way to make change to {name} project files. To help reviewers better get your purpose, <strong>PR</strong> description could not be too detailed. We encourage contributors to follow the <a href="https://github.com/%7Bgithub%7D/tree/main/.github/PULL_REQUEST_TEMPLATE.md" target="_blank" rel="noopener noreferrer">PR template<ExternalLinkIcon/></a> to finish the pull request.</p>
<p>You can find some very formal PR in <a href="https://github.com/%7Bgithub%7D/issues?q=is%3Aissue+is%3Aopen+RFC+label%3ARFC" target="_blank" rel="noopener noreferrer">RFC<ExternalLinkIcon/></a> issues and learn about them.</p>
<p><strong>📖 Opening PRs:</strong></p>
<ul>
<li>As long as you are working on your <strong>PR</strong>, please mark it as a draft</li>
<li>Please make sure that your <strong>PR</strong> is up-to-date with the latest changes in <code v-pre>main</code></li>
<li>Mention the issue that your <strong>PR</strong> is addressing.  For example, <code v-pre>Fix: #{ID_1}, #{ID_2}</code></li>
<li>Make sure that your <strong>PR</strong> passes all checks</li>
</ul>
<p><strong>🈴 Reviewing PRs:</strong></p>
<ul>
<li>Be respectful and constructive.</li>
<li>Assign yourself to the <strong>PR</strong>.</li>
<li>Check if all checks are passing.</li>
<li>Suggest changes instead of simply commenting on found issues.</li>
<li>If you are unsure about something, ask the author.</li>
<li>If you are not sure if the changes work, try them out.</li>
<li>Reach out to other reviewers if you are unsure about something.</li>
<li>If you are happy with the changes, approve the <strong>PR</strong>.</li>
<li>Merge the <strong>PR</strong> once it has all approvals and the checks are passing.</li>
</ul>
<p><strong>⚠️ DCO check:</strong></p>
<p>We have a <a href="https://github.com/apps/dco" target="_blank" rel="noopener noreferrer">DCO check<ExternalLinkIcon/></a> which runs on every <strong>PR</strong> to verify that the commit has been signed off.</p>
<p>Once <a href="https://github.com/apps/dco#usage" target="_blank" rel="noopener noreferrer">installed<ExternalLinkIcon/></a>, this integration will set the <a href="https://developer.github.com/v3/repos/statuses/" target="_blank" rel="noopener noreferrer">status<ExternalLinkIcon/></a> to <code v-pre>failed</code> if commits in a <strong>Pull Request</strong> do not contain a valid <code v-pre>Signed-off-by</code> line.</p>
<p>To sign off the last commit you made, you can use:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">--signoffgit</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">--signoff</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Contributors <em>sign-off</em>  that they adhere to these requirements by adding a <code v-pre>Signed-off-by</code> line to commit messages.</p>
<p>Git even has a <code v-pre>-s</code> command line option to append this automatically to your commit message:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> commit <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">"docs: this is my commit message"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>You can also automate signing off your commits by adding the following to your <code v-pre>.zshrc</code> or <code v-pre>.bashrc</code>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token function">git</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> $# <span class="token operator">-</span>gt <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">"$1"</span> <span class="token operator">==</span> <span class="token string">"commit"</span> <span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">;</span> then
     shift
     command git commit <span class="token operator">--</span>signoff <span class="token string">"$@"</span>
  <span class="token keyword">else</span>
     command git <span class="token string">"$@"</span>
  fi
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="docs-contribution" tabindex="-1"><a class="header-anchor" href="#docs-contribution" aria-hidden="true">#</a> Docs Contribution</h4>
<p>The documentation for {name} includes:</p>
<ul>
<li><a href="https://github.com/%7Bgithub%7D/blob/main/README.md" target="_blank" rel="noopener noreferrer">README.md<ExternalLinkIcon/></a>: This file includes the basic information and instructions for getting started with {name}.</li>
<li><a href="https://github.com/%7Bgithub%7D/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">CONTRIBUTING.md<ExternalLinkIcon/></a>: This file contains guidelines for contributing to {name}'s codebase, such as how to submit issues, pull requests, and code reviews.</li>
<li><a href="https://github.com/%7Bgithub%7D/blob/main/DEVELOPGUIDE.md" target="_blank" rel="noopener noreferrer">DEVELOPGUIDE.md<ExternalLinkIcon/></a>: This file provides a more in-depth guide to developing {name}, including information on the project's architecture, coding conventions, and testing practices.</li>
<li><a href="%7Bblog%7D">Official Documentation</a>: This is the official documentation for {name}, which includes comprehensive information on all of its features, configuration options, and troubleshooting tips.</li>
</ul>
<p>Please obey the following rules to better format the docs, which would greatly improve the reading experience.</p>
<ol>
<li>Please do not use Chinese punctuations in English docs, and vice versa.</li>
<li>Please use upper case letters where applicable, like the first letter of sentences / headings, etc.</li>
<li>Please specify a language for each Markdown code blocks, unless there's no associated languages.</li>
<li>Please insert a whitespace between Chinese and English words.</li>
<li>Please use the correct case for technical terms, such as using <code v-pre>HTTP</code> instead of http, <code v-pre>MySQL</code> rather than mysql, <code v-pre>Kubernetes</code> instead of kubernetes, etc.</li>
<li>Please check if there's any typos in the docs before submitting PRs.</li>
</ol>
<h2 id="engage-to-help-anything" tabindex="-1"><a class="header-anchor" href="#engage-to-help-anything" aria-hidden="true">#</a> Engage to help anything</h2>
<p>We choose GitHub as the primary place for {name} to collaborate. So the latest updates of {name} are always here. Although contributions via <strong>PR</strong> is an explicit way to help, we still call for any other ways.</p>
<ul>
<li>reply to other's <a href="https://github.com/%7Bgithub%7D/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer">issues<ExternalLinkIcon/></a> if you could;</li>
<li>help solve other user's problems;</li>
<li>help review other's <a href="https://github.com/%7Bgithub%7D/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer">PR<ExternalLinkIcon/></a> design;</li>
<li>discuss about {name} to make things clearer;</li>
<li>advocate <a href="google.com/search?q=%7Bname%7D">{name}</a> technology beyond GitHub;</li>
<li>write blogs on {name} and so on.</li>
</ul>
<p>In a word, <strong>ANY HELP IS CONTRIBUTION.</strong></p>
<h2 id="release-version" tabindex="-1"><a class="header-anchor" href="#release-version" aria-hidden="true">#</a> Release version</h2>
<p>Releases of {name} are done using <a href="https://github.com/googleapis/release-please" target="_blank" rel="noopener noreferrer">Release Please<ExternalLinkIcon/></a> and <a href="https://goreleaser.com/" target="_blank" rel="noopener noreferrer">GoReleaser<ExternalLinkIcon/></a>. The workflow looks like this:</p>
<p>🎯 <strong>A PR is merged to the <code v-pre>main</code> branch:</strong></p>
<ul>
<li>Release please is triggered, creates or updates a new release PR</li>
<li>This is done with every merge to main, the current release PR is updated every time</li>
</ul>
<p>🎯 <strong>Merging the 'release please' PR to <code v-pre>main</code>:</strong></p>
<ul>
<li>Release please is triggered, creates a new release and updates the changelog based on the commit messages</li>
<li>GoReleaser is triggered, builds the binaries and attaches them to the release</li>
<li>Containers are created and pushed to the container registry</li>
</ul>
<p>With the next relevant merge, a new release PR will be created and the process starts again</p>
<p>👀 <strong>Manually setting the version:</strong></p>
<p>If you want to manually set the version, you can create a PR with an empty commit message that contains the version number in the commit message. For example:</p>
<p>Such a commit can get produced as follows:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> commit --allow-empty <span class="token parameter variable">-m</span> <span class="token string">"chore: release 0.0.3"</span> <span class="token parameter variable">-m</span> "Release-As: <span class="token number">0.0</span>.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="contact-us" tabindex="-1"><a class="header-anchor" href="#contact-us" aria-hidden="true">#</a> Contact Us</h2>
<p>We value close connections with our users, developers, and contributors here at {name}. With a large community and maintainer team, we're always here to help and support you. Whether you're looking to join our community or have any questions or suggestions, we welcome you to get in touch with us.</p>
<p>Our most recommended way to get in touch is through <a href="%7Bslack%7D">Slack</a>. Even if you're in China, Slack is usually not blocked by firewalls, making it an easy way to connect with us. Our Slack community is the ideal place to discuss and share ideas and suggestions with other users and developers of {name}. You can ask technical questions, seek help, or share your experiences with other users of {name}.</p>
<p>In addition to Slack, we also offer the following ways to get in touch:</p>
<ul>
<li><a href="{slack}" target="_blank"><img src="https://img.shields.io/badge/twitter-%40{name}-informational?logo=slack&style=flat-square"></a>:  We also have Slack channels for you to communicate and discuss. To join, visit https://slack.com/ and join our <a href="%7Bslack%7D">👀 {name} slack</a> team channel.</li>
<li><a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=3293172751nss@gmail.com" target="_blank"><img src="https://img.shields.io/badge/gmail-%40xiongxinwei-blue?style=social&logo=gmail"></a>: Get in touch with us on <a href="%7Bemail%7D">Gmail</a>. If you have any questions or issues that need resolving, or any suggestions and feedback for our open source projects, please feel free to contact us via email.</li>
<li><a href="http://nsddd.top" target="_blank"><img src="https://img.shields.io/badge/博客-%40xiongxinwei-blue?style=social&logo=Octopus Deploy"></a>: Read our <a href="%7Bblog%7D">blog</a>. Our blog is a great place to stay up-to-date with {name} projects and trends. On the blog, we share our latest developments, tech trends, and other interesting information.</li>
<li><a href="https://twitter.com/xxw3293172751" target="_blank"><img src="https://img.shields.io/badge/twitter-%40{name}-informational?logo=twitter&style=flat-square"></a> : Add <a href="%7Btwitter%7D">Twitter</a> . If you prefer social media, our Twitter account is a great way to stay up-to-date with {name} project news and trends. On Twitter, we share our latest tech and trends, as well as relevant news and events.</li>
<li><a href="http://sm.nsddd.top/sm0d220ad72063197b9875379403f6c88.jpg" target="_blank"><img src="https://img.shields.io/badge/微信-smile-brightgreen?k8s-iamo=wechat&style=flat-square"></a>: Add <a href="https://img.shields.io/badge/%E5%BE%AE%E4%BF%A1-smile-brightgreen?k8s-iamo=wechat&amp;style=flat-square" target="_blank" rel="noopener noreferrer">Wechat<ExternalLinkIcon/></a> and indicate that you are a user or developer of k8s-iam. We will process your request as soon as possible.</li>
</ul>
<p>Whether you're looking to join our community or have any questions or suggestions, we welcome you to get in touch with us.</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '47.md' style='float:left'>⬆️上一节🔗  </a><a href = '49.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


