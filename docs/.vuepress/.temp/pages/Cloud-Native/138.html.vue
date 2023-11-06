<template><div><h1 id="openim-docs" tabindex="-1"><a class="header-anchor" href="#openim-docs" aria-hidden="true">#</a> OpenIM Docs</h1>
<h1 id="openim-documentation" tabindex="-1"><a class="header-anchor" href="#openim-documentation" aria-hidden="true">#</a> OpenIM Documentation</h1>
<p>Welcome to the official documentation repository for OpenIM, an open-source, free, and universal instant messaging ecosystem. This repository contains the source files for our documentation, which is built with Docusaurus.</p>
<p>The documentation for OpenIM is hosted on GitHub as well as on an official documentation site. Here are the details:</p>
<ol>
<li><strong>GitHub Repository</strong>:
<ul>
<li>Repository URL: <a href="https://github.com/OpenIMSDK/docs/" target="_blank" rel="noopener noreferrer">https://github.com/OpenIMSDK/docs/<ExternalLinkIcon/></a>.</li>
<li>This repository contains the version 3 documentation for OpenIM, and developers can contribute to the documentation by creating a GitHub account and making pull requests.</li>
</ul>
</li>
<li><strong>Official Documentation Site</strong>:
<ul>
<li>Documentation URL: <a href="https://doc.rentsoft.cn/" target="_blank" rel="noopener noreferrer">https://doc.rentsoft.cn<ExternalLinkIcon/></a> Now update to <a href="https://openim.io" target="_blank" rel="noopener noreferrer">https://openim.io<ExternalLinkIcon/></a>.</li>
<li>The official documentation site provides a structured and detailed guide for using OpenIM, covering various SDKs, guides, and API references. It also offers links to demo applications and the community Slack channel for support and interaction with other developers.</li>
</ul>
</li>
<li><strong>Community and Additional Resources</strong>:
<ul>
<li>OpenIM also maintains a community-driven approach, providing a Slack community for developers to share ideas, get help, and connect with others. They encourage developers to join their community, contribute to open-source projects, and improve their <a href="https://github.com/openimsdk" target="_blank" rel="noopener noreferrer">engineering skills through collaboration<ExternalLinkIcon/></a>.</li>
</ul>
</li>
</ol>
<p>These resources should provide a comprehensive understanding and guide for anyone looking to work with or contribute to the OpenIM project.</p>
<h2 id="table-of-contents" tabindex="-1"><a class="header-anchor" href="#table-of-contents" aria-hidden="true">#</a> Table of Contents</h2>
<ul>
<li><a href="#project-overview">Project Overview</a></li>
<li><a href="#getting-started">Getting Started</a></li>
<li><a href="#other-projects">Other Projects</a></li>
<li><a href="#contributing">Contributing</a></li>
<li><a href="#license">License</a></li>
</ul>
<h2 id="project-overview" tabindex="-1"><a class="header-anchor" href="#project-overview" aria-hidden="true">#</a> Project Overview</h2>
<p>OpenIM provides both server-side and client-side SDKs, delivering high performance, lightweight, and easy-to-expand essential features. Developers can quickly integrate instant messaging and real-time network capabilities into their applications by integrating OpenIM components and privatizing the deployment of servers, ensuring the security and privacy of business data.</p>
<h2 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started" aria-hidden="true">#</a> Getting Started</h2>
<p>To set up the documentation locally, follow these steps:</p>
<ol>
<li>
<p>Clone this repository:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/openimsdk/docs.git
<span class="token builtin class-name">cd</span> docs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Install the dependencies:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>Start the development server:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<p>In the <code v-pre>package.json</code> file, the <code v-pre>scripts</code> section provides various commands to help you work with the documentation:</p>
<ul>
<li><code v-pre>start</code> or <code v-pre>dev</code>: Starts the development server.</li>
<li><code v-pre>build</code>: Builds the static files for your documentation.</li>
<li><code v-pre>serve</code>: Serves the built documentation.</li>
<li><code v-pre>deploy</code>: Deploys the documentation to GitHub Pages.</li>
<li><code v-pre>clear</code>: Clears the cache of the documentation.</li>
<li><code v-pre>swizzle</code>: Swizzles a Docusaurus theme component.</li>
<li><code v-pre>write-translations</code>: Writes translation files.</li>
<li><code v-pre>write-heading-ids</code>: Writes heading IDs.</li>
<li><code v-pre>lint</code>: Lints the project using ESLint.</li>
<li><code v-pre>lint:fix</code>: Fixes linting issues using ESLint.</li>
<li><code v-pre>format</code>: Formats the source files using Prettier.</li>
<li><code v-pre>format:docs</code>: Formats the documentation files using Prettier.</li>
<li><code v-pre>typecheck</code>: Runs TypeScript type checking.</li>
</ul>
<h2 id="other-projects" tabindex="-1"><a class="header-anchor" href="#other-projects" aria-hidden="true">#</a> Other Projects</h2>
<p>OpenIMSDK encompasses a variety of open-source projects, each serving different purposes in the realm of instant messaging. Here is an overview of the mentioned projects along with their GitHub repository URLs:</p>
<ol>
<li><strong>OpenIM Server (open-im-server)</strong>:
<ul>
<li>GitHub Repository: https://github.com/openimsdk/open-im-server<a href="https://github.com/openimsdk/open-im-server" target="_blank" rel="noopener noreferrer">1<ExternalLinkIcon/></a>.</li>
<li>This is the core server-side component of OpenIM, written in Go. It provides the backend infrastructure necessary for instant messaging. Features include supporting a variety of message types (text, images, voice, video, etc.), one-to-one and group chats, and more. The server is designed to be high-performance, easy to extend, and supports a layered governance architecture in clusters<a href="https://www.openim.online/en" target="_blank" rel="noopener noreferrer">2<ExternalLinkIcon/></a>.</li>
</ul>
</li>
<li><strong>Open IM Flutter Demo (open-im-flutter-demo)</strong>:
<ul>
<li>GitHub Repository: https://github.com/openimsdk/open-im-flutter-demo[3](https://github.com/openimsdk/open-im-flutter-demo#:~:text=URL%3A https%3A%2F%2Fgithub.com%2Fopenimsdk%2Fopen).</li>
<li>This project serves as a demonstration of how OpenIM can be implemented in Flutter, providing a practical example for developers interested in integrating OpenIM within a Flutter application.</li>
</ul>
</li>
<li><strong>OpenIM Electron Demo (openim-electron-demo)</strong>:
<ul>
<li>GitHub Repository: https://github.com/openimsdk/openim-electron-demo[4](https://github.com/openimsdk/openim-electron-demo#:~:text=URL%3A https%3A%2F%2Fgithub.com%2Fopenimsdk%2Fopenim).</li>
<li>This demo project showcases how OpenIM can be utilized in an Electron-based web application, providing a practical reference for developers.</li>
</ul>
</li>
<li><strong>OpenIM Android Demo (open-im-android-demo)</strong>:
<ul>
<li>GitHub Repository: https://github.com/openimsdk/open-im-android-demo[5](https://github.com/openimsdk/open-im-android-demo#:~:text=URL%3A https%3A%2F%2Fgithub.com%2Fopenimsdk%2Fopen).</li>
<li>This project provides a demonstration of OpenIM integration on the Android platform, serving as a useful reference for developers working on Android applications.</li>
</ul>
</li>
<li><strong>OpenIM UniApp Demo (open-im-uniapp-demo)</strong>:
<ul>
<li>GitHub Repository: https://github.com/openimsdk/open-im-uniapp-demo[6](https://github.com/openimsdk/open-im-uniapp-demo#:~:text=URL%3A https%3A%2F%2Fgithub.com%2Fopenimsdk%2Fopen).</li>
<li>This demo project showcases the integration of OpenIM in a UniApp application, providing a practical example for developers working with UniApp.</li>
</ul>
</li>
<li><strong>Community Management for OpenIM (community)</strong>:
<ul>
<li>GitHub Repository: https://github.com/openimsdk/community[7](https://github.com/openimsdk/community#:~:text=URL%3A https%3A%2F%2Fgithub).</li>
<li>This repository seems to be dedicated to community management aspects of OpenIM, although the exact details are not provided in the repository.</li>
</ul>
</li>
</ol>
<h2 id="contributing" tabindex="-1"><a class="header-anchor" href="#contributing" aria-hidden="true">#</a> Contributing</h2>
<p>We welcome contributions from the community! Please refer to our <a href="https://github.com/openimsdk/community/tree/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">CONTRIBUTING.md<ExternalLinkIcon/></a> file for detailed information on how to contribute.</p>
<h2 id="license" tabindex="-1"><a class="header-anchor" href="#license" aria-hidden="true">#</a> License</h2>
<p>This project is licensed under the <a href="https://github.com/openimsdk/docs/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License<ExternalLinkIcon/></a>.</p>
</div></template>


