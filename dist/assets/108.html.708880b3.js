import{_ as o,r as s,o as r,c as l,a as e,b as n,d as a,e as t}from"./app.a634a71f.js";const c={},d=a(`<h1 id="automate-git-tag-creation-with-github-actions" tabindex="-1"><a class="header-anchor" href="#automate-git-tag-creation-with-github-actions" aria-hidden="true">#</a> Automate Git Tag Creation with GitHub Actions</h1><p>[toc]</p><p><strong>\u4E2D\u6587\u63CF\u8FF0\uFF1A</strong></p><p><strong>\u95EE\u9898\uFF1A\u4F7F\u7528 GitHub Actions \u81EA\u52A8\u5316 Git \u6807\u7B7E\u521B\u5EFA</strong></p><h2 id="\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#\u80CC\u666F" aria-hidden="true">#</a> \u80CC\u666F</h2><p>\u5728\u5F00\u53D1 OpenIM \u9879\u76EE\u65F6\uFF0C\u6211\u4EEC\u9762\u4E34\u7740\u624B\u52A8\u6253\u6807\u7B7E\u7684\u6311\u6218\u3002\u6211\u4EEC\u9075\u5FAA\u7684\u624B\u52A8\u6B65\u9AA4\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>bashCopy codegit tag -a v3.2.0-beta.0 -s -m &quot;release(v3.2.0): new feat cluster&quot;
git push upstream v3.2.0-beta.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u8FC7\u7A0B\u5B58\u5728\u51E0\u4E2A\u95EE\u9898\uFF1A</p>`,8),h=t("\u6839\u636E\u6211\u4EEC\u7684 "),u={href:"https://github.com/OpenIMSDK/Open-IM-Server/blob/main/CONTRIBUTING.md#getting-started",target:"_blank",rel:"noopener noreferrer"},g=e("code",null,"CONTRIBUTING.md",-1),m=t(" \u6307\u5357\uFF0C\u4E0D\u5141\u8BB8\u76F4\u63A5\u63A8\u9001\uFF0C\u4F7F\u6B64\u8FC7\u7A0B\u53D8\u5F97\u7E41\u7410\u3002"),p=e("li",null,"\u6211\u4EEC\u5F53\u524D\u7684 PR \u5408\u5E76\u7B56\u7565\u7ECF\u5E38\u5BFC\u81F4\u8BB8\u591A\u63D0\u4EA4\u4F5C\u4E3A\u4E00\u4E2A PR \u5408\u5E76\uFF0C\u5BFC\u81F4\u5197\u957F\u548C\u590D\u6742\u7684\u63D0\u4EA4\u4FE1\u606F\uFF0C\u8FD9\u5BF9\u4E8E\u53D1\u5E03\u8BF4\u660E\u4E0D\u662F\u5F88\u7B80\u6D01\u3002",-1),b=e("li",null,"\u8BE5\u8FC7\u7A0B\u4E0D\u662F\u81EA\u52A8\u7684\uFF0C\u5E76\u9700\u8981\u624B\u52A8\u52AA\u529B\uFF0C\u8FD9\u589E\u52A0\u4E86\u4EBA\u4E3A\u9519\u8BEF\u7684\u673A\u4F1A\u3002",-1),f=a(`<h2 id="\u63D0\u8BAE\u7684\u89E3\u51B3\u65B9\u6848-\u6253\u6807\u7B7E\u7684-github-action" tabindex="-1"><a class="header-anchor" href="#\u63D0\u8BAE\u7684\u89E3\u51B3\u65B9\u6848-\u6253\u6807\u7B7E\u7684-github-action" aria-hidden="true">#</a> \u63D0\u8BAE\u7684\u89E3\u51B3\u65B9\u6848\uFF1A\u6253\u6807\u7B7E\u7684 GitHub Action</h2><p>\u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E9B\u95EE\u9898\uFF0C\u6211\u4EEC\u5EFA\u8BAE\u5B9E\u73B0\u4E00\u4E2A GitHub action\uFF0C\u81EA\u52A8\u5316\u6253\u6807\u7B7E\u7684\u8FC7\u7A0B\uFF0C\u540C\u65F6\u9075\u5FAA\u6211\u4EEC\u7684\u5DE5\u4F5C\u6D41\u8981\u6C42\u3002</p><h3 id="\u529F\u80FD" tabindex="-1"><a class="header-anchor" href="#\u529F\u80FD" aria-hidden="true">#</a> \u529F\u80FD\uFF1A</h3><ol><li><strong>GitOps \u96C6\u6210</strong>\uFF1A <ul><li>\u5982\u679C git \u7248\u672C\u53F7\u7684\u6700\u540E\u4E00\u4F4D\u662F 0\uFF0C\u5E76\u4E14\u540E\u9762\u6CA1\u6709\u7F16\u8BD1\u53F7\uFF0C\u8FD9\u610F\u5473\u7740\u65B0\u7684\u6B21\u8BED\u4E49\u7248\u672C\u7684\u5F00\u59CB\u3002</li><li>\u673A\u5668\u4EBA\u5C06\u81EA\u52A8\u521B\u5EFA\u540D\u4E3A <code>release-v*.*</code> \u7684\u5206\u652F\u5E76\u542F\u7528\u5206\u652F\u4FDD\u62A4\u3002</li></ul></li><li><strong>ChatOps \u96C6\u6210</strong>\uFF1A <ul><li>\u4F7F\u7528 GitHub API \u7684\u6807\u7B7E\u4EE5\u53CA PR \u6216\u95EE\u9898\u8BC4\u8BBA\u903B\u8F91\uFF0C\u6211\u4EEC\u53EF\u4EE5\u547D\u4EE4\u673A\u5668\u4EBA\u6267\u884C\u64CD\u4F5C\u3002</li><li>\u901A\u8FC7\u8BC4\u8BBA <code>/content git-tag-name</code>\uFF0C\u673A\u5668\u4EBA\u5C06\u81EA\u52A8\u4EE5 <code>git-tag-name</code> \u7684\u540D\u79F0\u6253\u6807\u7B7E\u3002</li><li>\u5C06\u7279\u5B9A\u6807\u7B7E\u6DFB\u52A0\u5230 PR \u6216\u95EE\u9898\u5C06\u63D0\u793A\u673A\u5668\u4EBA\u5728\u6700\u540E\u4E00\u4F4D\u4E0A\u81EA\u52A8\u589E\u52A0\u5F53\u524D\u7248\u672C\u53F7\u3002</li></ul></li></ol><h3 id="\u5DE5\u4F5C\u6D41" tabindex="-1"><a class="header-anchor" href="#\u5DE5\u4F5C\u6D41" aria-hidden="true">#</a> \u5DE5\u4F5C\u6D41\uFF1A</h3><ol><li>\u5F53 PR \u88AB\u5408\u5E76\u6216\u95EE\u9898\u88AB\u5173\u95ED\u65F6\uFF0C\u64CD\u4F5C\u68C0\u67E5\u7248\u672C\u53F7\u3002</li><li>\u5982\u679C\u6700\u540E\u4E00\u4F4D\u662F 0\uFF0C\u673A\u5668\u4EBA\u521B\u5EFA\u4E00\u4E2A <code>release-v*.*</code> \u5206\u652F\u5E76\u542F\u7528\u5206\u652F\u4FDD\u62A4\u3002</li><li>\u901A\u8FC7\u8BC4\u8BBA\u7CFB\u7EDF (ChatOps)\uFF0C\u5F00\u53D1\u4EBA\u5458\u53EF\u4EE5\u6307\u5BFC\u673A\u5668\u4EBA\u521B\u5EFA\u7279\u5B9A\u6807\u7B7E\u3002</li><li>\u6216\u8005\uFF0C\u53EF\u4EE5\u4F7F\u7528\u7279\u5B9A\u7684\u6807\u7B7E\u6765\u81EA\u52A8\u9012\u589E\u5E76\u6253\u65B0\u7248\u672C\u53F7\u7684\u6807\u7B7E\u3002</li></ol><h3 id="\u597D\u5904" tabindex="-1"><a class="header-anchor" href="#\u597D\u5904" aria-hidden="true">#</a> \u597D\u5904\uFF1A</h3><ul><li>\u7B80\u5316\u6253\u6807\u7B7E\u7684\u8FC7\u7A0B\uFF0C\u4F7F\u53D1\u5E03\u66F4\u52A0\u9AD8\u6548\u3002</li><li>\u51CF\u5C11\u4EBA\u4E3A\u9519\u8BEF\u3002</li><li>\u6253\u6807\u7B7E\u548C\u5206\u652F\u7684\u4E00\u81F4\u6027\u3002</li><li>\u53D1\u5E03\u8BF4\u660E\u7684\u6E05\u6670\u548C\u7B80\u6D01\u7684\u63D0\u4EA4\u4FE1\u606F\u3002</li></ul><h2 id="\u4E0B\u4E00\u6B65" tabindex="-1"><a class="header-anchor" href="#\u4E0B\u4E00\u6B65" aria-hidden="true">#</a> \u4E0B\u4E00\u6B65\uFF1A</h2><ol><li>\u4E3A GitHub \u64CD\u4F5C\u8349\u62DF\u6E05\u6670\u7684\u89C4\u8303\uFF0C\u5B9A\u4E49\u6240\u6709\u89E6\u53D1\u5668\u548C\u8F93\u51FA\u3002</li><li>\u786E\u5B9A\u73B0\u6709\u5DE5\u4F5C\u6D41\u4E2D\u53EF\u80FD\u5B58\u5728\u7684\u6F5C\u5728\u6311\u6218\u4EE5\u53CA\u8FD9\u79CD\u81EA\u52A8\u5316\u5982\u4F55\u5F71\u54CD\u5B83\u4EEC\u3002</li><li>\u4E0E\u56E2\u961F\u6210\u5458\u5408\u4F5C\uFF0C\u6536\u96C6\u53CD\u9988\u5E76\u5BF9\u63D0\u6848\u8FDB\u884C\u8FED\u4EE3\u3002</li></ol><h2 id="background" tabindex="-1"><a class="header-anchor" href="#background" aria-hidden="true">#</a> Background</h2><p>While working on the OpenIM project, we&#39;ve faced challenges with the current manual process of tagging our versions. The manual steps we follow are:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>tag <span class="token parameter variable">-a</span> v3.2.0-beta.0 <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;release(v3.2.0): new feat cluster&quot;</span>
<span class="token function">git</span> push upstream v3.2.0-beta.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This process has several shortcomings:</p>`,14),_=t("Due to our "),v={href:"https://github.com/OpenIMSDK/Open-IM-Server/blob/main/CONTRIBUTING.md#getting-started",target:"_blank",rel:"noopener noreferrer"},w=e("code",null,"CONTRIBUTING.md",-1),x=t(" guide, direct pushing is not allowed, making this process cumbersome."),k=e("li",null,"Our current PR merge strategy often leads to many commits being merged as one PR, causing verbose and complex commit messages that aren't concise for release notes.",-1),I=e("li",null,"The process is not automated and requires manual effort, which increases the chance of human error.",-1),G=a('<h2 id="proposed-solution-github-action-for-tagging" tabindex="-1"><a class="header-anchor" href="#proposed-solution-github-action-for-tagging" aria-hidden="true">#</a> Proposed Solution: GitHub Action for Tagging</h2><p>To address these issues, we propose implementing a GitHub action that automates the process of tagging while adhering to our workflow requirements.</p><h3 id="features" tabindex="-1"><a class="header-anchor" href="#features" aria-hidden="true">#</a> Features:</h3><ol><li><strong>GitOps Integration</strong>: <ul><li>If the last digit of the git version number is 0, and there is no build number afterward, it signifies the beginning of a new minor semantic version.</li><li>The bot will automatically create a branch named <code>release-v*.*</code> and put it under branch protection.</li></ul></li><li><strong>ChatOps Integration</strong>: <ul><li>Using GitHub API&#39;s labels and PR or issue comment logic, we can command the bot to execute actions.</li><li>By commenting <code>/content git-tag-name</code>, the bot will automatically tag with the name <code>git-tag-name</code>.</li><li>Adding a specific label to a PR or issue will prompt the bot to auto-increment the current version number by one on the last digit.</li></ul></li></ol><h3 id="workflow" tabindex="-1"><a class="header-anchor" href="#workflow" aria-hidden="true">#</a> Workflow:</h3><ol><li>When a PR is merged or an issue is closed, the action checks the version number.</li><li>If the last digit is 0, the bot creates a <code>release-v*.*</code> branch and enables branch protection.</li><li>Through the comment system (ChatOps), developers can instruct the bot to create specific tags.</li><li>Alternatively, specific labels can be used to auto-increment and tag new version numbers.</li></ol><h3 id="benefits" tabindex="-1"><a class="header-anchor" href="#benefits" aria-hidden="true">#</a> Benefits:</h3><ul><li>Streamlines the tagging process, making releases more efficient.</li><li>Reduces human errors.</li><li>Consistency in tagging and branching.</li><li>Clear and concise commit messages for release notes.</li></ul><h2 id="next-steps" tabindex="-1"><a class="header-anchor" href="#next-steps" aria-hidden="true">#</a> Next Steps:</h2><ol><li>Draft a clear specification for the GitHub action, defining all triggers and outputs.</li><li>Identify potential challenges in the existing workflow and how this automation might impact them.</li><li>Collaborate with team members to gather feedback and iterate on the proposal.</li></ol>',10);function O(T,R){const i=s("ExternalLinkIcon");return r(),l("div",null,[d,e("ol",null,[e("li",null,[h,e("a",u,[g,n(i)]),m]),p,b]),f,e("ol",null,[e("li",null,[_,e("a",v,[w,n(i)]),x]),k,I]),G])}const N=o(c,[["render",O],["__file","108.html.vue"]]);export{N as default};
