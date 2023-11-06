import{_ as s,r as i,o as r,c as l,a as e,b as t,w as d,e as n,d as c}from"./app.4ca049db.js";const u={},h={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},f=n("author"),p=e("h1",{id:"\u7B2C97\u8282-openim-set-config",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C97\u8282-openim-set-config","aria-hidden":"true"},"#"),n(" \u7B2C97\u8282 OpenIM Set Config")],-1),m=e("div",null,[e("a",{href:"96.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"98.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),g=e("br",null,null,-1),v=n("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),_={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},b=n("sealos"),y=n("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),x={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},w=n("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),q=n("\u3002Myblog:"),k={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},E=n("http://nsddd.top"),T=c(`<hr><p>[TOC]</p><h2 id="start" tabindex="-1"><a class="header-anchor" href="#start" aria-hidden="true">#</a> Start</h2><p>With the increasing complexity of software engineering, effective configuration management has become more and more important. Yaml and other configuration files provide the necessary parameters and guidance for systems, but they also impose additional management overhead for developers. This article explores how to automate and optimize configuration management, thereby improving efficiency and reducing the chances of errors.</p><p>First, obtain the OpenIM code through the contributor documentation and initialize it following the steps below.</p><h2 id="define-automated-configuration" tabindex="-1"><a class="header-anchor" href="#define-automated-configuration" aria-hidden="true">#</a> Define Automated Configuration</h2><p>We no longer strongly recommend modifying the same configuration file. If you have a new configuration file related to your business, we suggest generating and managing it through automation.</p><p>In the <code>scripts/init_config.sh</code> file, we defined some template files. These templates will be automatically generated to the corresponding directories when executing <code>make init</code>.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># Defines an associative array where the keys are the template files and the values are the corresponding output files.
declare -A TEMPLATES=(
  [&quot;\${OPENIM_ROOT}/scripts/template/config-tmpl/env.template&quot;]=&quot;\${OPENIM_OUTPUT_SUBPATH}/bin/.env&quot;
  [&quot;\${OPENIM_ROOT}/scripts/template/config-tmpl/openim_config.yaml&quot;]=&quot;\${OPENIM_OUTPUT_SUBPATH}/bin/openim_config.yaml&quot;
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you have your new mapping files, you can implement them by appending them to the array.</p><p>Lastly, run:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>./scripts/init_config.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="define-configuration-variables" tabindex="-1"><a class="header-anchor" href="#define-configuration-variables" aria-hidden="true">#</a> Define Configuration Variables</h2><p>In the <code>scripts/install/environment.sh</code> file, we defined many reusable variables for automation convenience.</p><p>In the provided example, the def function is a core element. This function not only provides a concise way to define variables but also offers default value options for each variable. This way, even if a specific variable is not explicitly set in an environment or scenario, it can still have an expected value.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>function def() {
    local var_name=&quot;$1&quot;
    local default_value=&quot;$2&quot;
    eval &quot;readonly $var_name=\\\${$var_name:-$default_value}&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bash-parsing-features" tabindex="-1"><a class="header-anchor" href="#bash-parsing-features" aria-hidden="true">#</a> Bash Parsing Features</h3><p>Since bash is a parsing script language, it executes commands in the order they appear in the script. This characteristic means we can define commonly used or core variables at the beginning of the script and then reuse or modify them later on.</p><p>For instance, we can initially set a universal password and reuse this password in subsequent variable definitions.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># Set a consistent password for easy memory
def &quot;PASSWORD&quot; &quot;openIM123&quot;

# Linux system user for openim
def &quot;LINUX_USERNAME&quot; &quot;openim&quot;
def &quot;LINUX_PASSWORD&quot; &quot;\${PASSWORD}&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reasons-and-advantages-of-the-design" tabindex="-1"><a class="header-anchor" href="#reasons-and-advantages-of-the-design" aria-hidden="true">#</a> Reasons and Advantages of the Design</h2><ol><li><strong>Simplify Configuration Management</strong>: Through automation scripts, we can avoid manual operations and configurations, thus reducing tedious repetitive tasks.</li><li><strong>Reduce Errors</strong>: Manually editing yaml or other configuration files can lead to formatting mistakes or typographical errors. Automating with scripts can lower the risk of such errors.</li><li><strong>Enhanced Readability</strong>: Using the <code>def</code> function and other bash scripting techniques, we can establish a clear, easy-to-read, and maintainable configuration system.</li><li><strong>Improved Reusability</strong>: As demonstrated above, we can reuse variables and functions in different parts of the script, reducing redundant code and increasing overall consistency.</li><li><strong>Flexible Default Value Mechanism</strong>: By providing default values for variables, we can ensure configurations are complete and consistent across various scenarios, while also offering customization options for advanced users.</li></ol><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="96.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="98.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,24),I=n("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),S={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},A=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),O=n(")"),C=n("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),M={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},P=n("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function N(R,$){const a=i("ExternalLinkIcon"),o=i("RouterLink");return r(),l("div",null,[e("ul",null,[e("li",null,[e("a",h,[f,t(a)])])]),p,m,g,e("blockquote",null,[e("p",null,[v,e("a",_,[b,t(a)]),y,e("a",x,[w,t(a)]),q,e("a",k,[E,t(a)])])]),T,e("ul",null,[e("li",null,[e("p",null,[t(o,{to:"/"},{default:d(()=>[I]),_:1})])]),e("li",null,[e("p",null,[e("a",S,[A,t(a)]),O])]),e("li",null,[e("p",null,[C,e("a",M,[P,t(a)])])])])])}const U=s(u,[["render",N],["__file","97.html.vue"]]);export{U as default};