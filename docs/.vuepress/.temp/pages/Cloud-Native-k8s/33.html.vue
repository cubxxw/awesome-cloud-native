<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第33节-postman请求server" tabindex="-1"><a class="header-anchor" href="#第33节-postman请求server" aria-hidden="true">#</a> 第33节 Postman请求Server</h1>
<div><a href = '32.md' style='float:left'>⬆️上一节🔗  </a><a href = '34.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="需要" tabindex="-1"><a class="header-anchor" href="#需要" aria-hidden="true">#</a> 需要</h2>
<p><strong>因为我们一般 debug 我们的代码，那么需要这个代码被触发掉。kubernetes 的Informer 会导致许许多多的客户端都有本地的缓存。</strong></p>
<p>Informer 内部实现极其复杂，所以很少有相关的文章，如果需要请谷歌搜索外文。</p>
<p>Informer 是 Client-go 中的一个核心工具包。在 Kubernetes 源码中，如果 Kubernetes 的某个组件，需要 List/Get Kubernetes 中的 Object，在绝大多 数情况下，会直接使用 Informer 实例中的 Lister()方法（该方法包含 了 Get 和 List 方法），而很少直接请求 Kubernetes API。Informer 最基本 的功能就是 List/Get Kubernetes 中的 Object。</p>
<h2 id="api-server-在-cobra-下的实现" tabindex="-1"><a class="header-anchor" href="#api-server-在-cobra-下的实现" aria-hidden="true">#</a> API Server 在 Cobra 下的实现</h2>
<p><code v-pre>api-server.go</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"os"</span>
	<span class="token boolean">_</span> <span class="token string">"time/tzdata"</span> <span class="token comment">// for timeZone support in CronJob</span>

	<span class="token string">"k8s.io/component-base/cli"</span>
	<span class="token boolean">_</span> <span class="token string">"k8s.io/component-base/logs/json/register"</span>          <span class="token comment">// for JSON log format registration</span>
	<span class="token boolean">_</span> <span class="token string">"k8s.io/component-base/metrics/prometheus/clientgo"</span> <span class="token comment">// load all the prometheus client-go plugins</span>
	<span class="token boolean">_</span> <span class="token string">"k8s.io/component-base/metrics/prometheus/version"</span>  <span class="token comment">// for version metric registration</span>
	<span class="token string">"k8s.io/kubernetes/cmd/kube-apiserver/app"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	command <span class="token operator">:=</span> app<span class="token punctuation">.</span><span class="token function">NewAPIServerCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	code <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span>
	os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>很简单的一个函数，调用 command 方法一直跑就对了，Run 方法是个循环，直到你退出 API Server，code 交给 os.Exit。</p>
</div>
<p><strong>转到 定义：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// NewAPIServerCommand creates a *cobra.Command object with default parameters</span>
<span class="token keyword">func</span> <span class="token function">NewAPIServerCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> options<span class="token punctuation">.</span><span class="token function">NewServerRunOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	cmd <span class="token operator">:=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
		Use<span class="token punctuation">:</span> <span class="token string">"kube-apiserver"</span><span class="token punctuation">,</span>
		Long<span class="token punctuation">:</span> <span class="token string">`The Kubernetes API server validates and configures data
for the api objects which include pods, services, replicationcontrollers, and
others. The API Server services REST operations and provides the frontend to the
cluster's shared state through which all other components interact.`</span><span class="token punctuation">,</span>

		<span class="token comment">// stop printing usage when the command errors</span>
		SilenceUsage<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
		PersistentPreRunE<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			<span class="token comment">// silence client-go warnings.</span>
			<span class="token comment">// kube-apiserver loopback clients should not log self-issued warnings.</span>
			rest<span class="token punctuation">.</span><span class="token function">SetDefaultWarningHandler</span><span class="token punctuation">(</span>rest<span class="token punctuation">.</span>NoWarnings<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		RunE<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			verflag<span class="token punctuation">.</span><span class="token function">PrintAndExitIfRequested</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			fs <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">Flags</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

			<span class="token comment">// Activate logging as soon as possible, after that</span>
			<span class="token comment">// show flags with the final logging configuration.</span>
			<span class="token keyword">if</span> err <span class="token operator">:=</span> logsapi<span class="token punctuation">.</span><span class="token function">ValidateAndApply</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>Logs<span class="token punctuation">,</span> utilfeature<span class="token punctuation">.</span>DefaultFeatureGate<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> err
			<span class="token punctuation">}</span>
			cliflag<span class="token punctuation">.</span><span class="token function">PrintFlags</span><span class="token punctuation">(</span>fs<span class="token punctuation">)</span>

			<span class="token comment">// set default options</span>
			completedOptions<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">Complete</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> err
			<span class="token punctuation">}</span>

			<span class="token comment">// validate options</span>
			<span class="token keyword">if</span> errs <span class="token operator">:=</span> completedOptions<span class="token punctuation">.</span><span class="token function">Validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token function">len</span><span class="token punctuation">(</span>errs<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> utilerrors<span class="token punctuation">.</span><span class="token function">NewAggregate</span><span class="token punctuation">(</span>errs<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// add feature enablement metrics</span>
			utilfeature<span class="token punctuation">.</span>DefaultMutableFeatureGate<span class="token punctuation">.</span><span class="token function">AddMetrics</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token function">Run</span><span class="token punctuation">(</span>completedOptions<span class="token punctuation">,</span> genericapiserver<span class="token punctuation">.</span><span class="token function">SetupSignalHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		Args<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> arg <span class="token operator">:=</span> <span class="token keyword">range</span> args <span class="token punctuation">{</span>
				<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
					<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"%q does not take any arguments, got %q"</span><span class="token punctuation">,</span> cmd<span class="token punctuation">.</span><span class="token function">CommandPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	fs <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">Flags</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	namedFlagSets <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">Flags</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	verflag<span class="token punctuation">.</span><span class="token function">AddFlags</span><span class="token punctuation">(</span>namedFlagSets<span class="token punctuation">.</span><span class="token function">FlagSet</span><span class="token punctuation">(</span><span class="token string">"global"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	globalflag<span class="token punctuation">.</span><span class="token function">AddGlobalFlags</span><span class="token punctuation">(</span>namedFlagSets<span class="token punctuation">.</span><span class="token function">FlagSet</span><span class="token punctuation">(</span><span class="token string">"global"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> cmd<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> logs<span class="token punctuation">.</span><span class="token function">SkipLoggingConfigurationFlags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	options<span class="token punctuation">.</span><span class="token function">AddCustomGlobalFlags</span><span class="token punctuation">(</span>namedFlagSets<span class="token punctuation">.</span><span class="token function">FlagSet</span><span class="token punctuation">(</span><span class="token string">"generic"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> f <span class="token operator">:=</span> <span class="token keyword">range</span> namedFlagSets<span class="token punctuation">.</span>FlagSets <span class="token punctuation">{</span>
		fs<span class="token punctuation">.</span><span class="token function">AddFlagSet</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	cols<span class="token punctuation">,</span> <span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> term<span class="token punctuation">.</span><span class="token function">TerminalSize</span><span class="token punctuation">(</span>cmd<span class="token punctuation">.</span><span class="token function">OutOrStdout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	cliflag<span class="token punctuation">.</span><span class="token function">SetUsageAndHelpFunc</span><span class="token punctuation">(</span>cmd<span class="token punctuation">,</span> namedFlagSets<span class="token punctuation">,</span> cols<span class="token punctuation">)</span>

	<span class="token keyword">return</span> cmd
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>cri 是 如何 run command 的：</strong></p>
<ul>
<li><a href="https://github.com/kubernetes/component-base" target="_blank" rel="noopener noreferrer">cri仓库<ExternalLinkIcon/></a></li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">run</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">)</span> <span class="token punctuation">(</span>logsInitialized <span class="token builtin">bool</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> logs<span class="token punctuation">.</span><span class="token function">FlushLogs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	cmd<span class="token punctuation">.</span><span class="token function">SetGlobalNormalizationFunc</span><span class="token punctuation">(</span>cliflag<span class="token punctuation">.</span>WordSepNormalizeFunc<span class="token punctuation">)</span>

	<span class="token comment">// When error printing is enabled for the Cobra command, a flag parse</span>
	<span class="token comment">// error gets printed first, then optionally the often long usage</span>
	<span class="token comment">// text. This is very unreadable in a console because the last few</span>
	<span class="token comment">// lines that will be visible on screen don't include the error.</span>
	<span class="token comment">//</span>
	<span class="token comment">// The recommendation from #sig-cli was to print the usage text, then</span>
	<span class="token comment">// the error. We implement this consistently for all commands here.</span>
	<span class="token comment">// However, we don't want to print the usage text when command</span>
	<span class="token comment">// execution fails for other reasons than parsing. We detect this via</span>
	<span class="token comment">// the FlagParseError callback.</span>
	<span class="token comment">//</span>
	<span class="token comment">// Some commands, like kubectl, already deal with this themselves.</span>
	<span class="token comment">// We don't change the behavior for those.</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>cmd<span class="token punctuation">.</span>SilenceUsage <span class="token punctuation">{</span>
		cmd<span class="token punctuation">.</span>SilenceUsage <span class="token operator">=</span> <span class="token boolean">true</span>
		cmd<span class="token punctuation">.</span><span class="token function">SetFlagErrorFunc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			<span class="token comment">// Re-enable usage printing.</span>
			c<span class="token punctuation">.</span>SilenceUsage <span class="token operator">=</span> <span class="token boolean">false</span>
			<span class="token keyword">return</span> err
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// In all cases error printing is done below.</span>
	cmd<span class="token punctuation">.</span>SilenceErrors <span class="token operator">=</span> <span class="token boolean">true</span>

	<span class="token comment">// This is idempotent.</span>
	logs<span class="token punctuation">.</span><span class="token function">AddFlags</span><span class="token punctuation">(</span>cmd<span class="token punctuation">.</span><span class="token function">PersistentFlags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// Inject logs.InitLogs after command line parsing into one of the</span>
	<span class="token comment">// PersistentPre* functions.</span>
	<span class="token keyword">switch</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> cmd<span class="token punctuation">.</span>PersistentPreRun <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">:</span>
		pre <span class="token operator">:=</span> cmd<span class="token punctuation">.</span>PersistentPreRun
		cmd<span class="token punctuation">.</span>PersistentPreRun <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			logs<span class="token punctuation">.</span><span class="token function">InitLogs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			logsInitialized <span class="token operator">=</span> <span class="token boolean">true</span>
			<span class="token function">pre</span><span class="token punctuation">(</span>cmd<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token keyword">case</span> cmd<span class="token punctuation">.</span>PersistentPreRunE <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">:</span>
		pre <span class="token operator">:=</span> cmd<span class="token punctuation">.</span>PersistentPreRunE
		cmd<span class="token punctuation">.</span>PersistentPreRunE <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			logs<span class="token punctuation">.</span><span class="token function">InitLogs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			logsInitialized <span class="token operator">=</span> <span class="token boolean">true</span>
			<span class="token keyword">return</span> <span class="token function">pre</span><span class="token punctuation">(</span>cmd<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		cmd<span class="token punctuation">.</span>PersistentPreRun <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			logs<span class="token punctuation">.</span><span class="token function">InitLogs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			logsInitialized <span class="token operator">=</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> cmd<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个蛮简单的过程，进行 run 操作最后调用 <code v-pre>cmd.Execute()</code></p>
<h2 id="postman请求-api-server" tabindex="-1"><a class="header-anchor" href="#postman请求-api-server" aria-hidden="true">#</a> Postman请求 APi Server</h2>
<p><strong>最大的问题：如何登陆和授权。</strong></p>
<h2 id="建立-server-account" tabindex="-1"><a class="header-anchor" href="#建立-server-account" aria-hidden="true">#</a> 建立 Server Account</h2>
<p>Server Account 机制是 Kubernetes 中组件和 API Server 交互的标准方式</p>
<h2 id="建立-secret-1-24" tabindex="-1"><a class="header-anchor" href="#建立-secret-1-24" aria-hidden="true">#</a> 建立 Secret ( &gt;=1.24)</h2>
<p>出于安全考虑，1.24版本和以后版本，不再自动为一个 Server Account 创建 Secret ，需要自己手动创建。</p>
<h2 id="建立-clusterrole" tabindex="-1"><a class="header-anchor" href="#建立-clusterrole" aria-hidden="true">#</a> 建立 ClusterRole</h2>
<p>为 SA 授权，能够操作 API 对象</p>
<h2 id="获取-secret-中的证书" tabindex="-1"><a class="header-anchor" href="#获取-secret-中的证书" aria-hidden="true">#</a> 获取 Secret 中的证书</h2>
<p>Token 将放在http Header 中发送到 API Server 从而进行鉴权</p>
<h2 id="提取-secret-中的证书" tabindex="-1"><a class="header-anchor" href="#提取-secret-中的证书" aria-hidden="true">#</a> 提取 Secret 中的证书</h2>
<p>为了能和 API  Server 建立安全连接，Postman需要 改 SA 对应证书</p>
<h2 id="下载证书并且上传到-postman" tabindex="-1"><a class="header-anchor" href="#下载证书并且上传到-postman" aria-hidden="true">#</a> 下载证书并且上传到 Postman</h2>
<p>把下载好的证书 下载到 Postman 所在机器，并上传到 Postman 设置中</p>
<h2 id="访问" tabindex="-1"><a class="header-anchor" href="#访问" aria-hidden="true">#</a> 访问</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>https://192.168.100.6443/apis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '32.md' style='float:left'>⬆️上一节🔗  </a><a href = '34.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


