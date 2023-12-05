<template><div><h1 id="openim-e2e-test-设计" tabindex="-1"><a class="header-anchor" href="#openim-e2e-test-设计" aria-hidden="true">#</a> OpenIM E2E Test 设计</h1>
<p>首先看一下 Go 语言有两个很有名的 <a href="https://github.com/topics/selenium" target="_blank" rel="noopener noreferrer">selenium<ExternalLinkIcon/></a></p>
<ul>
<li>https://github.com/aerokube/selenoid</li>
<li>https://github.com/tebeka/selenium</li>
</ul>
<p>OpenIM 端到端（End-to-End，E2E）测试设计是一个多步骤的过程，其中包括规划、编写测试用例、自动化测试脚本，以及监控和维护测试环境。在设计 E2E 测试时，考虑到使用 Go 语言，我们可以使用 <code v-pre>selenoid</code> 或 <code v-pre>tebeka/selenium</code> 这两个有名的 Selenium 工具。以下是一个基于这些工具的 E2E 测试设计的概要步骤：</p>
<h2 id="确定步骤" tabindex="-1"><a class="header-anchor" href="#确定步骤" aria-hidden="true">#</a> 确定步骤</h2>
<h3 id="_1-确定测试范围" tabindex="-1"><a class="header-anchor" href="#_1-确定测试范围" aria-hidden="true">#</a> 1. 确定测试范围</h3>
<ul>
<li>确定哪些功能需要 E2E 测试。参考 https://docs.google.com/spreadsheets/d/1zELWkwxgOOZ7u5pmYCqqaFnvZy2SVajv/edit?usp=drive_link&amp;ouid=103266350914914783293&amp;rtpof=true&amp;sd=true</li>
<li>确定测试环境的需求，例如不同的操作系统、浏览器版本等。</li>
</ul>
<h3 id="_2-测试规划" tabindex="-1"><a class="header-anchor" href="#_2-测试规划" aria-hidden="true">#</a> 2. 测试规划</h3>
<ul>
<li>定义测试目标和目的。</li>
<li>设定测试时间表。</li>
<li>确定资源分配（如人员、服务器等）。</li>
</ul>
<h3 id="_3-选择工具" tabindex="-1"><a class="header-anchor" href="#_3-选择工具" aria-hidden="true">#</a> 3. 选择工具</h3>
<ul>
<li><code v-pre>selenoid</code> 是一个 Selenium hub 的实现，用于在容器中运行浏览器，可以更容易地部署和伸缩。</li>
<li><code v-pre>tebeka/selenium</code> 是一个 Go 语言客户端，用于和 Selenium WebDriver 交互。</li>
</ul>
<h3 id="_4-设置测试环境" tabindex="-1"><a class="header-anchor" href="#_4-设置测试环境" aria-hidden="true">#</a> 4. 设置测试环境</h3>
<ul>
<li>使用 Docker 安装并运行 <code v-pre>selenoid</code> 或配置本地/远程 WebDriver 服务。</li>
<li>确保所有依赖的服务和数据均已就绪。</li>
</ul>
<h3 id="_5-编写测试用例" tabindex="-1"><a class="header-anchor" href="#_5-编写测试用例" aria-hidden="true">#</a> 5. 编写测试用例</h3>
<ul>
<li>根据功能需求，编写详细的测试用例。</li>
<li>为每个测试用例定义预期的结果。</li>
</ul>
<h3 id="_6-自动化测试脚本" tabindex="-1"><a class="header-anchor" href="#_6-自动化测试脚本" aria-hidden="true">#</a> 6. 自动化测试脚本</h3>
<ul>
<li>使用 <code v-pre>tebeka/selenium</code> 编写测试脚本来自动化浏览器操作。</li>
<li>使用 <code v-pre>selenoid</code> 进行浏览器的管理和日志收集。</li>
<li>实现数据驱动的测试来处理多个测试数据集。</li>
</ul>
<h3 id="_7-执行测试" tabindex="-1"><a class="header-anchor" href="#_7-执行测试" aria-hidden="true">#</a> 7. 执行测试</h3>
<ul>
<li>运行自动化测试脚本。</li>
<li>收集测试结果和日志。</li>
</ul>
<h3 id="_8-结果分析和报告" tabindex="-1"><a class="header-anchor" href="#_8-结果分析和报告" aria-hidden="true">#</a> 8. 结果分析和报告</h3>
<ul>
<li>分析测试结果，查找失败的原因。</li>
<li>编写测试报告，包括成功率、性能问题等。</li>
</ul>
<h3 id="_9-维护和迭代" tabindex="-1"><a class="header-anchor" href="#_9-维护和迭代" aria-hidden="true">#</a> 9. 维护和迭代</h3>
<ul>
<li>根据测试反馈优化测试用例和脚本。</li>
<li>定期更新测试环境和测试数据。</li>
</ul>
<h2 id="小试牛刀" tabindex="-1"><a class="header-anchor" href="#小试牛刀" aria-hidden="true">#</a> 小试牛刀</h2>
<p>在使用这些工具时，你需要熟悉 Go 语言以及与 <code v-pre>WebDriver</code> 交互的方式。Selenoid 和 <code v-pre>tebeka/selenium</code> 两者可以配合使用，</p>
<ul>
<li><code v-pre>Selenoid</code> 管理和运行浏览器实例</li>
<li>而 <code v-pre>tebeka/selenium</code> 可用于编写 Go 语言中的测试脚本。</li>
</ul>
<p>以下是一个使用 <code v-pre>tebeka/selenium</code> 的示例 Go 代码片段，用于演示如何启动一个浏览器会话，打开一个页面，并进行简单的操作：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"time"</span>
    <span class="token string">"github.com/tebeka/selenium"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Start a Selenium WebDriver server instance (if one is not already running).</span>
    <span class="token keyword">const</span> <span class="token punctuation">(</span>
        seleniumPath    <span class="token operator">=</span> <span class="token string">"path/to/selenium-server-standalone.jar"</span>
        geckoDriverPath <span class="token operator">=</span> <span class="token string">"path/to/geckodriver"</span>
        port            <span class="token operator">=</span> <span class="token number">4444</span>
    <span class="token punctuation">)</span>
    opts <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>selenium<span class="token punctuation">.</span>ServiceOption<span class="token punctuation">{</span>
        selenium<span class="token punctuation">.</span><span class="token function">GeckoDriver</span><span class="token punctuation">(</span>geckoDriverPath<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// Specify the path to GeckoDriver in order to use Firefox.</span>
        selenium<span class="token punctuation">.</span><span class="token function">Output</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">,</span>                   <span class="token comment">// Output debug information to STDERR.</span>
    <span class="token punctuation">}</span>
    selenium<span class="token punctuation">.</span><span class="token function">SetDebug</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    service<span class="token punctuation">,</span> err <span class="token operator">:=</span> selenium<span class="token punctuation">.</span><span class="token function">NewSeleniumService</span><span class="token punctuation">(</span>seleniumPath<span class="token punctuation">,</span> port<span class="token punctuation">,</span> opts<span class="token operator">...</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token comment">// Simplified error handling for the example</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> service<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Connect to the WebDriver instance running locally.</span>
    caps <span class="token operator">:=</span> selenium<span class="token punctuation">.</span>Capabilities<span class="token punctuation">{</span><span class="token string">"browserName"</span><span class="token punctuation">:</span> <span class="token string">"firefox"</span><span class="token punctuation">}</span>
    wd<span class="token punctuation">,</span> err <span class="token operator">:=</span> selenium<span class="token punctuation">.</span><span class="token function">NewRemote</span><span class="token punctuation">(</span>caps<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"http://localhost:%d/wd/hub"</span><span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> wd<span class="token punctuation">.</span><span class="token function">Quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Set a timeout for the Find operation.</span>
    wd<span class="token punctuation">.</span><span class="token function">SetImplicitWaitTimeout</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span>

    <span class="token comment">// Navigate to the desired website.</span>
    err <span class="token operator">=</span> wd<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"https://www.example.com"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Find an element by its name and send a value to it.</span>
    elem<span class="token punctuation">,</span> err <span class="token operator">:=</span> wd<span class="token punctuation">.</span><span class="token function">FindElement</span><span class="token punctuation">(</span>selenium<span class="token punctuation">.</span>ByName<span class="token punctuation">,</span> <span class="token string">"q"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    err <span class="token operator">=</span> elem<span class="token punctuation">.</span><span class="token function">SendKeys</span><span class="token punctuation">(</span><span class="token string">"selenium user"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Click on the element.</span>
    btn<span class="token punctuation">,</span> err <span class="token operator">:=</span> wd<span class="token punctuation">.</span><span class="token function">FindElement</span><span class="token punctuation">(</span>selenium<span class="token punctuation">.</span>ByCSSSelector<span class="token punctuation">,</span> <span class="token string">"input[type='submit']"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    err <span class="token operator">=</span> btn<span class="token punctuation">.</span><span class="token function">Click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Wait for a specific element to be found in the DOM.</span>
    cond <span class="token operator">:=</span> selenium<span class="token punctuation">.</span><span class="token function">Condition</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>wd selenium<span class="token punctuation">.</span>WebDriver<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> wd<span class="token punctuation">.</span><span class="token function">FindElement</span><span class="token punctuation">(</span>selenium<span class="token punctuation">.</span>ByID<span class="token punctuation">,</span> <span class="token string">"resultStats"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> err <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    wd<span class="token punctuation">.</span><span class="token function">WaitWithTimeoutAndInterval</span><span class="token punctuation">(</span>cond<span class="token punctuation">,</span> <span class="token number">30</span><span class="token operator">*</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span> <span class="token number">500</span><span class="token operator">*</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>

    <span class="token comment">// Take a screenshot of the current page.</span>
    screenshot<span class="token punctuation">,</span> err <span class="token operator">:=</span> wd<span class="token punctuation">.</span><span class="token function">Screenshot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...Save or process the screenshot.</span>

    <span class="token comment">// Close the current window.</span>
    err <span class="token operator">=</span> wd<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Finish the session.</span>
    err <span class="token operator">=</span> wd<span class="token punctuation">.</span><span class="token function">Quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有三个项目， openim-server 是服务端，启动的 API 和 各个 RPC 组件。</p>
<p>其中包括如下组件：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>openim-api
openim-cmdutils
openim-crontask
openim-msggateway
openim-msgtransfer
openim-push
openim-rpc-auth
openim-rpc-conversation
openim-rpc-friend
openim-rpc-group
openim-rpc-msg
openim-rpc-third
openim-rpc-user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>openim-chat 是 server 的业务服务器，包括两个 API 和 两个 rpc ，包括登录注册等逻辑</p>
<p>openim-web 是 网页 端，有登录注册，以及收发信息等等。</p>
<p>我想为 openim-server 设计 E2E ，请问该怎么设计</p>
</div></template>


