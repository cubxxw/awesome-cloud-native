import{_ as o,r as t,o as l,c as d,a as e,b as n,w as c,e as i,d as a}from"./app.9f14a191.js";const u={},m={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},v=i("author"),p=e("h1",{id:"\u7B2C99\u8282-systemd-configuration-installation-and-startup",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C99\u8282-systemd-configuration-installation-and-startup","aria-hidden":"true"},"#"),i(" \u7B2C99\u8282 Systemd Configuration, Installation, and Startup")],-1),h=e("div",null,[e("a",{href:"98.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"100.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),b=e("br",null,null,-1),g=i("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),_={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},f=i("sealos"),y=i("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),x={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},I=i("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),k=i("\u3002Myblog:"),E={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},S=i("http://nsddd.top"),q=a(`<ul><li><a href="#systemd-configuration-installation-and-startup">Systemd Configuration, Installation, and Startup</a><ul><li><a href="#1-introduction">1. Introduction</a></li><li><a href="#2-prerequisites-requires-root-permissions">2. Prerequisites (Requires root permissions)</a></li><li><a href="#3-create-openim-api-systemd-unit-template-file">3. Create <code>openim-api</code> systemd unit template file</a></li><li><a href="#4-copy-systemd-unit-template-file-to-systemd-config-directory-requires-root-permissions">4. Copy systemd unit template file to systemd config directory (Requires root permissions)</a></li><li><a href="#5-start-systemd-service">5. Start systemd service</a></li></ul></li></ul><h2 id="_1-introduction" tabindex="-1"><a class="header-anchor" href="#_1-introduction" aria-hidden="true">#</a> 1. Introduction</h2><p>Systemd is the default service management form for the latest Linux distributions, replacing the original init.</p><p>Format introduction:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>Unit<span class="token punctuation">]</span> <span class="token builtin class-name">:</span> Unit of the <span class="token function">service</span>

Description: Brief description of the <span class="token function">service</span>

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>: Configuration of the service&#39;s runtime behavior

ExecStart: Complete path of the program

Restart: Restart configurations like no, always, on-success, on-failure, on-abnormal, on-abort, on-watchdog

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>: Installation configuration

WantedBy: Multi-user, etc.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),D=i("For more details, refer to: "),O={href:"https://www.freedesktop.org/software/systemd/man/systemd.service.html",target:"_blank",rel:"noopener noreferrer"},R=i("Systemd Service Manual"),C=a(`<p>Starting command:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>systemctl daemon-reload &amp;&amp; systemctl enable openim-api &amp;&amp; systemctl restart openim-api
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Service status:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>systemctl status openim-api
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Stop command:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>systemctl stop openim-api
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Why choose systemd?</strong></p><p><strong>Advanced requirements:</strong></p><ul><li>Convenient service runtime log recording for problem analysis</li><li>Service management logs</li><li>Option to restart upon abnormal exit</li></ul><p>The daemon does not meet these advanced requirements.</p><p><code>nohup</code> only logs the service&#39;s runtime outputs and errors.</p><p>Only systemd can fulfill all of the above requirements.</p><blockquote><p>The default logs are enhanced with timestamps, usernames, service names, PIDs, etc., making them user-friendly. You can view logs of abnormal service exits. Advanced customization is possible through the configuration files in <code>/lib/systemd/system/</code>.</p></blockquote><p>In short, systemd is the current mainstream way to manage backend services on Linux, so I&#39;ve abandoned <code>nohup</code> in my new versions of bash scripts, opting instead for systemd.</p><h2 id="_2-prerequisites-requires-root-permissions" tabindex="-1"><a class="header-anchor" href="#_2-prerequisites-requires-root-permissions" aria-hidden="true">#</a> 2. Prerequisites (Requires root permissions)</h2><ol><li>Configure <code>environment.sh</code> based on the comments.</li><li>Create a data directory:</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>mkdir -p \${OPENIM_DATA_DIR}/{openim-api,openim-crontask}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>Create a bin directory and copy <code>openim-api</code> and <code>openim-crontask</code> executable files:</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>source ./environment.sh
mkdir -p \${OPENIM_INSTALL_DIR}/bin
cp openim-api openim-crontask \${OPENIM_INSTALL_DIR}/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>Copy the configuration files of <code>openim-api</code> and <code>openim-crontask</code> to the <code>\${OPENIM_CONFIG_DIR}</code> directory:</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>mkdir -p \${OPENIM_CONFIG_DIR}
cp openim-api.yaml openim-crontask.yaml \${OPENIM_CONFIG_DIR}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-create-openim-api-systemd-unit-template-file" tabindex="-1"><a class="header-anchor" href="#_3-create-openim-api-systemd-unit-template-file" aria-hidden="true">#</a> 3. Create <code>openim-api</code> systemd unit template file</h2><p>For each OpenIM service, we will create a systemd unit template. Follow the steps below for each service:</p><p>Run the following shell script to generate the <code>openim-api.service.template</code>:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>source ./environment.sh
cat &gt; openim-api.service.template &lt;&lt;EOF
[Unit]
Description=OpenIM Server API
Documentation=https://github.com/marmotedu/iam/blob/master/init/README.md

[Service]
WorkingDirectory=\${OPENIM_DATA_DIR}/openim-api
ExecStart=\${OPENIM_INSTALL_DIR}/bin/openim-api --config=\${OPENIM_CONFIG_DIR}/openim-api.yaml
Restart=always
RestartSec=5
StartLimitInterval=0

[Install]
WantedBy=multi-user.target
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Following the above style, create the respective template files or generate them in bulk:</p><p>First, make sure you&#39;ve sourced the environment variables:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>source ./environment.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Use the shell script to generate the systemd unit template for each service:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>declare -a services=(
&quot;openim-api&quot;
... [other services]
)

for service in &quot;\${services[@]}&quot;
do
   cat &gt; $service.service.template &lt;&lt;EOF
[Unit]
Description=OpenIM Server - $service
Documentation=https://github.com/marmotedu/iam/blob/master/init/README.md

[Service]
WorkingDirectory=\${OPENIM_DATA_DIR}/$service
ExecStart=\${OPENIM_INSTALL_DIR}/bin/$service --config=\${OPENIM_CONFIG_DIR}/$service.yaml
Restart=always
RestartSec=5
StartLimitInterval=0

[Install]
WantedBy=multi-user.target
EOF
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-copy-systemd-unit-template-file-to-systemd-config-directory-requires-root-permissions" tabindex="-1"><a class="header-anchor" href="#_4-copy-systemd-unit-template-file-to-systemd-config-directory-requires-root-permissions" aria-hidden="true">#</a> 4. Copy systemd unit template file to systemd config directory (Requires root permissions)</h2><p>Ensure you have root permissions to perform this operation:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>for service in &quot;\${services[@]}&quot;
do
   sudo cp $service.service.template /etc/systemd/system/$service.service
done
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-start-systemd-service" tabindex="-1"><a class="header-anchor" href="#_5-start-systemd-service" aria-hidden="true">#</a> 5. Start systemd service</h2><p>To start the OpenIM services:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>for service in &quot;\${services[@]}&quot;
do
   sudo systemctl daemon-reload 
   sudo systemctl enable $service 
   sudo systemctl restart $service
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="98.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="100.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,38),N=i("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),w={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},$=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),M=i(")"),A=i("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),F={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},L=i("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function P(T,B){const s=t("ExternalLinkIcon"),r=t("RouterLink");return l(),d("div",null,[e("ul",null,[e("li",null,[e("a",m,[v,n(s)])])]),p,h,b,e("blockquote",null,[e("p",null,[g,e("a",_,[f,n(s)]),y,e("a",x,[I,n(s)]),k,e("a",E,[S,n(s)])])]),q,e("p",null,[D,e("a",O,[R,n(s)])]),C,e("ul",null,[e("li",null,[e("p",null,[n(r,{to:"/"},{default:c(()=>[N]),_:1})])]),e("li",null,[e("p",null,[e("a",w,[$,n(s)]),M])]),e("li",null,[e("p",null,[A,e("a",F,[L,n(s)])])])])])}const G=o(u,[["render",P],["__file","99.html.vue"]]);export{G as default};
