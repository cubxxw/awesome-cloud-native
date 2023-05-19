<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第59节-rfc-0001-openimsdk-cicd-robot-machine-proposal" tabindex="-1"><a class="header-anchor" href="#第59节-rfc-0001-openimsdk-cicd-robot-machine-proposal" aria-hidden="true">#</a> 第59节 [RFC #0001] OpenIMSDK cicd robot machine proposal</h1>
<div><a href = '58.md' style='float:left'>⬆️上一节🔗  </a><a href = '60.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="meta" tabindex="-1"><a class="header-anchor" href="#meta" aria-hidden="true">#</a> Meta</h2>
<ul>
<li>Name: OpenIMSDK cicd machine proposal</li>
<li>Start Date: 2023-05-13</li>
<li>Author(s): @cubxxw</li>
<li>Status: Draft</li>
<li>RFC Pull Request: (leave blank)</li>
<li>OpenIMSDK Pull Request: (leave blank)</li>
<li>OpenIMSDK Issue: (leave blank)</li>
<li>Supersedes: N/A</li>
</ul>
<h2 id="📇topics" tabindex="-1"><a class="header-anchor" href="#📇topics" aria-hidden="true">#</a> 📇Topics</h2>
<ul>
<li><a href="#rfc-0000-openimsdk-proposal-template">[RFC #0000] OpenIMSDK proposal template</a>
<ul>
<li><a href="#meta">Meta</a></li>
<li><a href="#topics">📇Topics</a></li>
<li><a href="#summary">Summary</a></li>
<li><a href="#definitions">Definitions</a></li>
<li><a href="#motivation">Motivation</a></li>
<li><a href="#what-it-is">What it is</a></li>
<li><a href="#how-it-works">How it Works</a></li>
<li><a href="#migration">Migration</a></li>
<li><a href="#drawbacks">Drawbacks</a></li>
<li><a href="#alternatives">Alternatives</a></li>
<li><a href="#prior-art">Prior Art</a></li>
<li><a href="#unresolved-questions">Unresolved Questions</a></li>
<li><a href="#spec-changes-optional">Spec. Changes (OPTIONAL)</a></li>
<li><a href="#history">History</a></li>
</ul>
</li>
</ul>
<h2 id="summary" tabindex="-1"><a class="header-anchor" href="#summary" aria-hidden="true">#</a> Summary</h2>
<p>The OpenIMSDK cicd machine is an automated system that performs continuous integration and deployment for OpenIMSDK projects. It streamlines the development process and ensures high quality code by running automated tests, code quality checks, and deployment pipelines.</p>
<h2 id="definitions" tabindex="-1"><a class="header-anchor" href="#definitions" aria-hidden="true">#</a> Definitions</h2>
<ul>
<li>Continuous integration (CI): the practice of automatically building and testing code changes on a frequent basis.</li>
<li>Continuous deployment (CD): the practice of automatically deploying code changes to production environments after they pass automated tests.</li>
</ul>
<h2 id="motivation" tabindex="-1"><a class="header-anchor" href="#motivation" aria-hidden="true">#</a> Motivation</h2>
<ul>
<li>Improve development efficiency by automating repetitive tasks such as testing and deployment.</li>
<li>Reduce the risk of human error by automating tasks that can be prone to mistakes.</li>
<li>Ensure consistent code quality by enforcing automated checks.</li>
<li>Facilitate collaboration by providing a central location for code review and feedback.</li>
</ul>
<h2 id="what-it-is" tabindex="-1"><a class="header-anchor" href="#what-it-is" aria-hidden="true">#</a> What it is</h2>
<p>The OpenIMSDK cicd machine is a combination of multiple tools and services that work together to automate the development process. It includes:</p>
<ul>
<li>A version control system (VCS) for storing code, such as GitHub.</li>
<li>A continuous integration (CI) server, such as Jenkins or CircleCI, to build and test the code on every commit.</li>
<li>A container registry, such as Docker Hub, to store built images.</li>
<li>A continuous deployment (CD) system, such as Kubernetes, to deploy new code changes to production environments.</li>
<li>Configuration management tools, such as Ansible or Chef, to manage the deployment of infrastructure and application dependencies.</li>
</ul>
<h2 id="how-it-works" tabindex="-1"><a class="header-anchor" href="#how-it-works" aria-hidden="true">#</a> How it Works</h2>
<p>The OpenIMSDK cicd machine works as follows:</p>
<ol>
<li>Developers create feature branches in the VCS and make changes to the code.</li>
<li>Developers push their changes to the VCS, triggering a webhook that starts the CI process.</li>
<li>The CI server pulls the latest code changes, builds the application, and runs automated tests and code quality checks.</li>
<li>After the tests have passed, the CI server deploys the updated application to the staging environment for manual testing. Once the application passes manual testing, it is deployed to the production environment.</li>
<li>To automate this process, we propose the creation of an OpenIMSDK CICD bot. The bot will be responsible for automating the build, test, and deployment process of OpenIMSDK.</li>
</ol>
<p>The OpenIMSDK CICD bot will integrate with the Git repository hosting the OpenIMSDK source code. It will monitor for changes to the repository and trigger the build and test process automatically.</p>
<p>The bot will also be responsible for deploying the updated application to the staging and production environments. Deployment to the staging environment will happen automatically after the tests have passed. Deployment to the production environment will require manual approval from a designated team member.</p>
<h2 id="migration" tabindex="-1"><a class="header-anchor" href="#migration" aria-hidden="true">#</a> Migration</h2>
<p>The OpenIMSDK CICD bot will require changes to the existing build and deployment process. The existing build scripts and deployment configurations will need to be updated to work with the bot.</p>
<p>Existing OpenIMSDK developers will need to be trained on the new CICD process and the use of Kubernetes.</p>
<h2 id="drawbacks" tabindex="-1"><a class="header-anchor" href="#drawbacks" aria-hidden="true">#</a> Drawbacks</h2>
<p>The OpenIMSDK CICD bot will require additional infrastructure to support. This includes setting up and managing the Kubernetes clusters and configuring the bot.</p>
<h2 id="alternatives" tabindex="-1"><a class="header-anchor" href="#alternatives" aria-hidden="true">#</a> Alternatives</h2>
<p>Alternatives to the OpenIMSDK CICD bot include using an existing CICD service such as Jenkins or Travis CI. However, using an existing service may not provide the necessary customization and control required for the OpenIMSDK build and deployment process.</p>
<h2 id="prior-art" tabindex="-1"><a class="header-anchor" href="#prior-art" aria-hidden="true">#</a> Prior Art</h2>
<p>Similar CICD bots have been developed for other projects, such as the Kubernetes project's Prow bot.</p>
<ul>
<li><a href="https://docs.prow.k8s.io/docs/overview/" target="_blank" rel="noopener noreferrer">https://docs.prow.k8s.io/docs/overview/<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/test-infra/blob/master/prow/cron/cron.go" target="_blank" rel="noopener noreferrer">https://github.com/kubernetes/test-infra/blob/master/prow/cron/cron.go<ExternalLinkIcon/></a></li>
</ul>
<h2 id="unresolved-questions" tabindex="-1"><a class="header-anchor" href="#unresolved-questions" aria-hidden="true">#</a> Unresolved Questions</h2>
<ul>
<li>What additional features could be added to the OpenIMSDK CICD bot?</li>
<li>What is the impact of the bot on the development workflow?</li>
<li>How can we ensure the security of the deployment process?</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '58.md' style='float:left'>⬆️上一节🔗  </a><a href = '60.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


