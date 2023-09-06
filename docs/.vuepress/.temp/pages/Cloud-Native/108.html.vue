<template><div><h1 id="_108-automate-git-tag-creation-with-github-actions" tabindex="-1"><a class="header-anchor" href="#_108-automate-git-tag-creation-with-github-actions" aria-hidden="true">#</a> 108: Automate Git Tag Creation with GitHub Actions</h1>
<p>[toc]</p>
<p><strong>中文描述：</strong></p>
<p><strong>问题：使用 GitHub Actions 自动化 Git 标签创建</strong></p>
<h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2>
<p>在开发 OpenIM 项目时，我们面临着手动打标签的挑战。我们遵循的手动步骤如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bashCopy codegit tag -a v3.2.0-beta.0 -s -m "release(v3.2.0): new feat cluster"
git push upstream v3.2.0-beta.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此过程存在几个问题：</p>
<ol>
<li>根据我们的 <a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/CONTRIBUTING.md#getting-started" target="_blank" rel="noopener noreferrer"><code v-pre>CONTRIBUTING.md</code><ExternalLinkIcon/></a> 指南，不允许直接推送，使此过程变得繁琐。</li>
<li>我们当前的 PR 合并策略经常导致许多提交作为一个 PR 合并，导致冗长和复杂的提交信息，这对于发布说明不是很简洁。</li>
<li>该过程不是自动的，并需要手动努力，这增加了人为错误的机会。</li>
</ol>
<h2 id="提议的解决方案-打标签的-github-action" tabindex="-1"><a class="header-anchor" href="#提议的解决方案-打标签的-github-action" aria-hidden="true">#</a> 提议的解决方案：打标签的 GitHub Action</h2>
<p>为了解决这些问题，我们建议实现一个 GitHub action，自动化打标签的过程，同时遵循我们的工作流要求。</p>
<h3 id="功能" tabindex="-1"><a class="header-anchor" href="#功能" aria-hidden="true">#</a> 功能：</h3>
<ol>
<li><strong>GitOps 集成</strong>：
<ul>
<li>如果 git 版本号的最后一位是 0，并且后面没有编译号，这意味着新的次语义版本的开始。</li>
<li>机器人将自动创建名为 <code v-pre>release-v*.*</code> 的分支并启用分支保护。</li>
</ul>
</li>
<li><strong>ChatOps 集成</strong>：
<ul>
<li>使用 GitHub API 的标签以及 PR 或问题评论逻辑，我们可以命令机器人执行操作。</li>
<li>通过评论 <code v-pre>/content git-tag-name</code>，机器人将自动以 <code v-pre>git-tag-name</code> 的名称打标签。</li>
<li>将特定标签添加到 PR 或问题将提示机器人在最后一位上自动增加当前版本号。</li>
</ul>
</li>
</ol>
<h3 id="工作流" tabindex="-1"><a class="header-anchor" href="#工作流" aria-hidden="true">#</a> 工作流：</h3>
<ol>
<li>当 PR 被合并或问题被关闭时，操作检查版本号。</li>
<li>如果最后一位是 0，机器人创建一个 <code v-pre>release-v*.*</code> 分支并启用分支保护。</li>
<li>通过评论系统 (ChatOps)，开发人员可以指导机器人创建特定标签。</li>
<li>或者，可以使用特定的标签来自动递增并打新版本号的标签。</li>
</ol>
<h3 id="好处" tabindex="-1"><a class="header-anchor" href="#好处" aria-hidden="true">#</a> 好处：</h3>
<ul>
<li>简化打标签的过程，使发布更加高效。</li>
<li>减少人为错误。</li>
<li>打标签和分支的一致性。</li>
<li>发布说明的清晰和简洁的提交信息。</li>
</ul>
<h2 id="下一步" tabindex="-1"><a class="header-anchor" href="#下一步" aria-hidden="true">#</a> 下一步：</h2>
<ol>
<li>为 GitHub 操作草拟清晰的规范，定义所有触发器和输出。</li>
<li>确定现有工作流中可能存在的潜在挑战以及这种自动化如何影响它们。</li>
<li>与团队成员合作，收集反馈并对提案进行迭代。</li>
</ol>
<h2 id="background" tabindex="-1"><a class="header-anchor" href="#background" aria-hidden="true">#</a> Background</h2>
<p>While working on the OpenIM project, we've faced challenges with the current manual process of tagging our versions. The manual steps we follow are:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>tag <span class="token parameter variable">-a</span> v3.2.0-beta.0 <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">"release(v3.2.0): new feat cluster"</span>
<span class="token function">git</span> push upstream v3.2.0-beta.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This process has several shortcomings:</p>
<ol>
<li>Due to our <a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/CONTRIBUTING.md#getting-started" target="_blank" rel="noopener noreferrer"><code v-pre>CONTRIBUTING.md</code><ExternalLinkIcon/></a> guide, direct pushing is not allowed, making this process cumbersome.</li>
<li>Our current PR merge strategy often leads to many commits being merged as one PR, causing verbose and complex commit messages that aren't concise for release notes.</li>
<li>The process is not automated and requires manual effort, which increases the chance of human error.</li>
</ol>
<h2 id="proposed-solution-github-action-for-tagging" tabindex="-1"><a class="header-anchor" href="#proposed-solution-github-action-for-tagging" aria-hidden="true">#</a> Proposed Solution: GitHub Action for Tagging</h2>
<p>To address these issues, we propose implementing a GitHub action that automates the process of tagging while adhering to our workflow requirements.</p>
<h3 id="features" tabindex="-1"><a class="header-anchor" href="#features" aria-hidden="true">#</a> Features:</h3>
<ol>
<li><strong>GitOps Integration</strong>:
<ul>
<li>If the last digit of the git version number is 0, and there is no build number afterward, it signifies the beginning of a new minor semantic version.</li>
<li>The bot will automatically create a branch named <code v-pre>release-v*.*</code> and put it under branch protection.</li>
</ul>
</li>
<li><strong>ChatOps Integration</strong>:
<ul>
<li>Using GitHub API's labels and PR or issue comment logic, we can command the bot to execute actions.</li>
<li>By commenting <code v-pre>/content git-tag-name</code>, the bot will automatically tag with the name <code v-pre>git-tag-name</code>.</li>
<li>Adding a specific label to a PR or issue will prompt the bot to auto-increment the current version number by one on the last digit.</li>
</ul>
</li>
</ol>
<h3 id="workflow" tabindex="-1"><a class="header-anchor" href="#workflow" aria-hidden="true">#</a> Workflow:</h3>
<ol>
<li>When a PR is merged or an issue is closed, the action checks the version number.</li>
<li>If the last digit is 0, the bot creates a <code v-pre>release-v*.*</code> branch and enables branch protection.</li>
<li>Through the comment system (ChatOps), developers can instruct the bot to create specific tags.</li>
<li>Alternatively, specific labels can be used to auto-increment and tag new version numbers.</li>
</ol>
<h3 id="benefits" tabindex="-1"><a class="header-anchor" href="#benefits" aria-hidden="true">#</a> Benefits:</h3>
<ul>
<li>Streamlines the tagging process, making releases more efficient.</li>
<li>Reduces human errors.</li>
<li>Consistency in tagging and branching.</li>
<li>Clear and concise commit messages for release notes.</li>
</ul>
<h2 id="next-steps" tabindex="-1"><a class="header-anchor" href="#next-steps" aria-hidden="true">#</a> Next Steps:</h2>
<ol>
<li>Draft a clear specification for the GitHub action, defining all triggers and outputs.</li>
<li>Identify potential challenges in the existing workflow and how this automation might impact them.</li>
<li>Collaborate with team members to gather feedback and iterate on the proposal.</li>
</ol>
</div></template>


