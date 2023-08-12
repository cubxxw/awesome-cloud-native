<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第97节-openim-set-config" tabindex="-1"><a class="header-anchor" href="#第97节-openim-set-config" aria-hidden="true">#</a> 第97节 OpenIM Set Config</h1>
<div><a href = '96.md' style='float:left'>⬆️上一节🔗  </a><a href = '98.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="start" tabindex="-1"><a class="header-anchor" href="#start" aria-hidden="true">#</a> Start</h2>
<p>With the increasing complexity of software engineering, effective configuration management has become more and more important. Yaml and other configuration files provide the necessary parameters and guidance for systems, but they also impose additional management overhead for developers. This article explores how to automate and optimize configuration management, thereby improving efficiency and reducing the chances of errors.</p>
<p>First, obtain the OpenIM code through the contributor documentation and initialize it following the steps below.</p>
<h2 id="define-automated-configuration" tabindex="-1"><a class="header-anchor" href="#define-automated-configuration" aria-hidden="true">#</a> Define Automated Configuration</h2>
<p>We no longer strongly recommend modifying the same configuration file. If you have a new configuration file related to your business, we suggest generating and managing it through automation.</p>
<p>In the <code v-pre>scripts/init_config.sh</code> file, we defined some template files. These templates will be automatically generated to the corresponding directories when executing <code v-pre>make init</code>.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># Defines an associative array where the keys are the template files and the values are the corresponding output files.
declare -A TEMPLATES=(
  ["${OPENIM_ROOT}/scripts/template/config-tmpl/env.template"]="${OPENIM_OUTPUT_SUBPATH}/bin/.env"
  ["${OPENIM_ROOT}/scripts/template/config-tmpl/openim_config.yaml"]="${OPENIM_OUTPUT_SUBPATH}/bin/openim_config.yaml"
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you have your new mapping files, you can implement them by appending them to the array.</p>
<p>Lastly, run:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./scripts/init_config.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="define-configuration-variables" tabindex="-1"><a class="header-anchor" href="#define-configuration-variables" aria-hidden="true">#</a> Define Configuration Variables</h2>
<p>In the <code v-pre>scripts/install/environment.sh</code> file, we defined many reusable variables for automation convenience.</p>
<p>In the provided example, the def function is a core element. This function not only provides a concise way to define variables but also offers default value options for each variable. This way, even if a specific variable is not explicitly set in an environment or scenario, it can still have an expected value.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>function def() {
    local var_name="$1"
    local default_value="$2"
    eval "readonly $var_name=\${$var_name:-$default_value}"
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bash-parsing-features" tabindex="-1"><a class="header-anchor" href="#bash-parsing-features" aria-hidden="true">#</a> Bash Parsing Features</h3>
<p>Since bash is a parsing script language, it executes commands in the order they appear in the script. This characteristic means we can define commonly used or core variables at the beginning of the script and then reuse or modify them later on.</p>
<p>For instance, we can initially set a universal password and reuse this password in subsequent variable definitions.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># Set a consistent password for easy memory
def "PASSWORD" "openIM123"

# Linux system user for openim
def "LINUX_USERNAME" "openim"
def "LINUX_PASSWORD" "${PASSWORD}"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reasons-and-advantages-of-the-design" tabindex="-1"><a class="header-anchor" href="#reasons-and-advantages-of-the-design" aria-hidden="true">#</a> Reasons and Advantages of the Design</h2>
<ol>
<li><strong>Simplify Configuration Management</strong>: Through automation scripts, we can avoid manual operations and configurations, thus reducing tedious repetitive tasks.</li>
<li><strong>Reduce Errors</strong>: Manually editing yaml or other configuration files can lead to formatting mistakes or typographical errors. Automating with scripts can lower the risk of such errors.</li>
<li><strong>Enhanced Readability</strong>: Using the <code v-pre>def</code> function and other bash scripting techniques, we can establish a clear, easy-to-read, and maintainable configuration system.</li>
<li><strong>Improved Reusability</strong>: As demonstrated above, we can reuse variables and functions in different parts of the script, reducing redundant code and increasing overall consistency.</li>
<li><strong>Flexible Default Value Mechanism</strong>: By providing default values for variables, we can ensure configurations are complete and consistent across various scenarios, while also offering customization options for advanced users.</li>
</ol>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '96.md' style='float:left'>⬆️上一节🔗  </a><a href = '98.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


