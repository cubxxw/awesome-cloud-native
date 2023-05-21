<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第69节-github-中-owners-文件" tabindex="-1"><a class="header-anchor" href="#第69节-github-中-owners-文件" aria-hidden="true">#</a> 第69节 GitHub 中 OWNERS 文件</h1>
<div><a href = '68.md' style='float:left'>⬆️上一节🔗  </a><a href = '70.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>团队开发中，我们熟悉的术语有哪些？</p>
<table>
<thead>
<tr>
<th style="text-align:left">terms</th>
<th style="text-align:left">means</th>
<th style="text-align:left">翻译</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">WIP</td>
<td style="text-align:left">Work in progress, do not merge yet.</td>
<td style="text-align:left">开发中</td>
</tr>
<tr>
<td style="text-align:left">LGTM</td>
<td style="text-align:left">Looks good to me.</td>
<td style="text-align:left">Riview 完别人的 PR，没有问题，可以合并了</td>
</tr>
<tr>
<td style="text-align:left">PTAL</td>
<td style="text-align:left">Please take a look.</td>
<td style="text-align:left">帮我看下，一般都是请别人 review 自己的 PR</td>
</tr>
<tr>
<td style="text-align:left">CC</td>
<td style="text-align:left">Carbon copy</td>
<td style="text-align:left">一般代表抄送别人的意思</td>
</tr>
<tr>
<td style="text-align:left">RFC</td>
<td style="text-align:left">request for comments.</td>
<td style="text-align:left">我觉得这个想法很好, 我们来一起讨论下</td>
</tr>
<tr>
<td style="text-align:left">IIRC</td>
<td style="text-align:left">if I recall correctly.</td>
<td style="text-align:left">如果我没记错</td>
</tr>
<tr>
<td style="text-align:left">ACK</td>
<td style="text-align:left">acknowledgement.</td>
<td style="text-align:left">我确认了或者我接受了，我承认了</td>
</tr>
<tr>
<td style="text-align:left">NACK/NAK</td>
<td style="text-align:left">negative acknowledgement.</td>
<td style="text-align:left">我不同意</td>
</tr>
</tbody>
</table>
<p>这些术语挺有意思的，还可以通过术语学习一下单词。</p>
<h2 id="owners-文件" tabindex="-1"><a class="header-anchor" href="#owners-文件" aria-hidden="true">#</a> OWNERS 文件</h2>
<p>k8s 使用 <code v-pre>owners</code> 文件的灵感来自于<a href="https://chromium.googlesource.com/chromium/src/+/master/docs/code_reviews.md" target="_blank" rel="noopener noreferrer">Chromium OWNERS文件<ExternalLinkIcon/></a></p>
<p>owners 文件主要是为了解决代码审查过程中的问题：</p>
<ol>
<li>项目中代码审查的速度, 受到能够审查代码的人员数量的限制；</li>
<li>一个人的代码审查的质量受到他们对所审查代码的熟悉程度的限制。</li>
</ol>
<p><strong>owners：</strong></p>
<p>每个包含一个独立代码或内容单元的目录也可能包含一个OWNERS文件。该文件适用于目录中的所有内容，包括OWNERS文件本身，同级文件和子目录。</p>
<p>OWNERS 文件使用 YAML 格式，并且支持如下关键字：</p>
<ul>
<li>approvers: 一组Github的用户名或者别名，他们能够 <code v-pre>/approve</code> 一个 PR</li>
<li>labels: a list of GitHub labels to automatically apply to a PR</li>
<li>options: a map of options for how to interpret this OWNERS file, currently only one:
<ul>
<li>no_parent_owners: defaults to <code v-pre>false</code> if not present; if <code v-pre>true</code>, exclude parent OWNERS files. Allows the use case where <code v-pre>a/deep/nested/OWNERS</code> file prevents <code v-pre>a/OWNERS</code> file from having any effect on <code v-pre>a/deep/nested/bit/of/code</code></li>
</ul>
</li>
<li>lreviewers: a list of GitHub usernames or aliases that are good candidates to <code v-pre>/lgtm</code> a PR</li>
</ul>
<p>💡简单的一个案例如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>approvers:
  - alice
  - bob     <span class="token comment"># this is a comment</span>
reviewers:
  - alice
  - carol   <span class="token comment"># this is another comment</span>
  - sig-foo <span class="token comment"># this is an alias</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践" aria-hidden="true">#</a> 最佳实践</h2>
<ul>
<li>team aliases are used that correspond to sigs</li>
<li>reviewers 最好多于 approvers</li>
<li>批准者不在 <code v-pre>reviewers</code> 区块中</li>
<li>OWNERS 文件会定期更新 (至少每次发布变更一次)</li>
</ul>
<h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2>
<p>See the OWNERS docs at https://go.k8s.io/owners</p>
<h2 id="codeowners-文件" tabindex="-1"><a class="header-anchor" href="#codeowners-文件" aria-hidden="true">#</a> CODEOWNERS 文件</h2>
<p>CODEWONERS 文件是 GitHub 提供的，并且有相关的文档说明：</p>
<ul>
<li><a href="https://docs.github.com/zh/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#example-of-a-codeowners-file" target="_blank" rel="noopener noreferrer">https://docs.github.com/zh/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#example-of-a-codeowners-file<ExternalLinkIcon/></a></li>
</ul>
<p><strong>CODEOWNERS 文件和 OWNERS 文件主要区别是：</strong></p>
<ol>
<li>.CODEOWNERS 文件是 GitHub 提供的,它使用了 GitHub 的代码所有权功能。而 .OWNERS 文件是 Git 本身的一个约定,GitHub 识别并提供了支持。</li>
<li>.CODEOWNERS 文件支持更加精细的模式匹配,可以匹配文件路径,文件扩展名,甚至文件内容。而 .OWNERS 只支持基本的文件路径匹配。</li>
<li>.CODEOWNERS 中列出的审核者可以是个人用户,团队,也可以是外部的电子邮件地址。.OWNERS 只支持 GitHub 用户和团队。</li>
<li>更新 .CODEOWNERS 文件会自动通知被指定为所有者的人员。而 .OWNERS 文件需要人工通知。</li>
<li>CODEOWNERS文件中的审核者列表仅控制与文件相关的代码更改的审核者，而不是整个目录或仓库。当有人向仓库推送包含CODEOWNERS规则的文件更改时，GitHub会自动请求列出的审核者来review这些更改。</li>
<li>OWNERs文件控制整个目录或仓库的审核者，而不仅仅是与文件相关的更改。当有人向仓库提交代码更改时，GitHub会根据OWNERS文件中的规则来确定哪些人需要审查和批准更改。</li>
</ol>
<p>除此之外,这两个文件在作用上是完全相同的:指定目录或文件的审核责任人。</p>
<blockquote>
<p><strong>Note</strong></p>
<p>所以总体来说,建议优先使用 .CODEOWNERS 文件,因为它支持更丰富的功能,并且有 GitHub 的官方支持。.OWNERS 文件仅在需要兼容 Git 本身的情况下使用。两者也可以同时存在,GitHub 会同时识别。但如果有规则冲突,会以 .CODEOWNERS 文件为准。</p>
</blockquote>
<p><strong>CODEOWNERS 文件语法：</strong></p>
<p>CODEOWNERS 文件通常包含两列:</p>
<p>第一列是文件模式，用于匹配目录下的文件。例如:</p>
<ul>
<li><code v-pre>*</code> 表示匹配所有文件</li>
<li><code v-pre>*.go</code> 匹配所有 <code v-pre>.go</code> 后缀的文件</li>
<li><code v-pre>dir/</code> 匹配 <code v-pre>dir</code> 目录下的所有文件</li>
</ul>
<p>第二列是审核者列表,用于指定谁可以审核匹配的文件。可以是个人的 GitHub 用户名，也可以是团队名。例如:</p>
<ul>
<li><code v-pre>@octocat</code> 表示 GitHub 用户名为 <code v-pre>octocat</code> 的用户</li>
<li><code v-pre>@github/team-name</code> 表示 GitHub 的 <code v-pre>team-name</code> 团队</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '68.md' style='float:left'>⬆️上一节🔗  </a><a href = '70.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


