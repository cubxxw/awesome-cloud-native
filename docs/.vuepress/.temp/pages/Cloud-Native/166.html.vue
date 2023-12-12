<template><div><p>Viper 是 Go 应用程序现代化的、完整的解决方案，能够处理不同格式的配置文件，让我们在构建现代应用程序时，不必担心配置文件格式。Viper 也能够满足我们对应用配置的各种需求。</p>
<p>Viper 可以从不同的位置读取配置，不同位置的配置具有不同的优先级，高优先级的配置会覆盖低优先级相同的配置，按优先级从高到低排列如下：</p>
<ol>
<li>通过 viper.Set 函数显示设置的配置</li>
<li>命令行参数</li>
<li>环境变量</li>
<li>配置文件</li>
<li>Key/Value 存储</li>
<li>默认值</li>
</ol>
<p>这里需要注意，Viper 配置键不区分大小写。</p>
<h3 id="读入配置" tabindex="-1"><a class="header-anchor" href="#读入配置" aria-hidden="true">#</a> 读入配置</h3>
<p><strong>读入配置，就是将配置读入到 Viper 中，有如下读入方式：</strong></p>
<ul>
<li>设置默认的配置文件名。</li>
<li>读取配置文件。</li>
<li>监听和重新读取配置文件。</li>
<li>从 <code v-pre>io.Reader</code> 读取配置。</li>
<li>从环境变量读取。</li>
<li>从命令行标志读取。</li>
<li>从远程 <code v-pre>Key/Value</code> 存储读取。</li>
</ul>
<h4 id="设置默认" tabindex="-1"><a class="header-anchor" href="#设置默认" aria-hidden="true">#</a> 设置默认</h4>
<p>一个好的配置系统应该支持默认值。Viper 支持对 key 设置默认值，当没有通过配置文件、环境变量、远程配置或命令行标志设置 key 时，设置默认值通常是很有用的，可以让程序在没有明确指定配置时也能够正常运行。例如：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>viper<span class="token punctuation">.</span><span class="token function">SetDefault</span><span class="token punctuation">(</span><span class="token string">"ContentDir"</span><span class="token punctuation">,</span> <span class="token string">"content"</span><span class="token punctuation">)</span>
viper<span class="token punctuation">.</span><span class="token function">SetDefault</span><span class="token punctuation">(</span><span class="token string">"LayoutDir"</span><span class="token punctuation">,</span> <span class="token string">"layouts"</span><span class="token punctuation">)</span>
viper<span class="token punctuation">.</span><span class="token function">SetDefault</span><span class="token punctuation">(</span><span class="token string">"Taxonomies"</span><span class="token punctuation">,</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"tag"</span><span class="token punctuation">:</span> <span class="token string">"tags"</span><span class="token punctuation">,</span> <span class="token string">"category"</span><span class="token punctuation">:</span> <span class="token string">"categories"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="读取配置文件" tabindex="-1"><a class="header-anchor" href="#读取配置文件" aria-hidden="true">#</a> 读取配置文件</h4>
<p>Viper 可以读取配置文件来解析配置，支持 JSON、TOML、YAML、YML、Properties、Props、Prop、HCL、Dotenv、Env 格式的配置文件。Viper 支持搜索多个路径，并且默认不配置任何搜索路径，将默认决策留给应用程序。</p>
<p>以下是如何使用 Viper 搜索和读取配置文件的示例：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">"fmt"</span>

  <span class="token string">"github.com/spf13/pflag"</span>
  <span class="token string">"github.com/spf13/viper"</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
  cfg  <span class="token operator">=</span> pflag<span class="token punctuation">.</span><span class="token function">StringP</span><span class="token punctuation">(</span><span class="token string">"config"</span><span class="token punctuation">,</span> <span class="token string">"c"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"Configuration file."</span><span class="token punctuation">)</span>
  help <span class="token operator">=</span> pflag<span class="token punctuation">.</span><span class="token function">BoolP</span><span class="token punctuation">(</span><span class="token string">"help"</span><span class="token punctuation">,</span> <span class="token string">"h"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">"Show this help message."</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  pflag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token operator">*</span>help <span class="token punctuation">{</span>
    pflag<span class="token punctuation">.</span><span class="token function">Usage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 从配置文件中读取配置</span>
  <span class="token keyword">if</span> <span class="token operator">*</span>cfg <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span>
    viper<span class="token punctuation">.</span><span class="token function">SetConfigFile</span><span class="token punctuation">(</span><span class="token operator">*</span>cfg<span class="token punctuation">)</span>   <span class="token comment">// 指定配置文件名</span>
    viper<span class="token punctuation">.</span><span class="token function">SetConfigType</span><span class="token punctuation">(</span><span class="token string">"yaml"</span><span class="token punctuation">)</span> <span class="token comment">// 如果配置文件名中没有文件扩展名，则需要指定配置文件的格式，告诉viper以何种格式解析文件</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    viper<span class="token punctuation">.</span><span class="token function">AddConfigPath</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">)</span>          <span class="token comment">// 把当前目录加入到配置文件的搜索路径中</span>
    viper<span class="token punctuation">.</span><span class="token function">AddConfigPath</span><span class="token punctuation">(</span><span class="token string">"$HOME/.iam"</span><span class="token punctuation">)</span> <span class="token comment">// 配置文件搜索路径，可以设置多个配置文件搜索路径</span>
    viper<span class="token punctuation">.</span><span class="token function">SetConfigName</span><span class="token punctuation">(</span><span class="token string">"config"</span><span class="token punctuation">)</span>     <span class="token comment">// 配置文件名称（没有文件扩展名）</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> err <span class="token operator">:=</span> viper<span class="token punctuation">.</span><span class="token function">ReadInConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span> <span class="token comment">// 读取配置文件。如果指定了配置文件名，则使用指定的配置文件，否则在注册的搜索路径中搜索</span>
    <span class="token function">panic</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Fatal error config file: %s \n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Used configuration file is: %s\n"</span><span class="token punctuation">,</span> viper<span class="token punctuation">.</span><span class="token function">ConfigFileUsed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Viper 支持设置多个配置文件搜索路径，需要注意添加搜索路径的顺序，Viper 会根据添加的路径顺序搜索配置文件，如果找到则停止搜索。如果调用 SetConfigFile 直接指定了配置文件名，并且配置文件名没有文件扩展名时，需要显式指定配置文件的格式，以使 Viper 能够正确解析配置文件。</p>
<p>如果通过搜索的方式查找配置文件，则需要注意，SetConfigName 设置的配置文件名是不带扩展名的，在搜索时 Viper 会在文件名之后追加文件扩展名，并尝试搜索所有支持的扩展类型。</p>
<h3 id="监听和重新读取" tabindex="-1"><a class="header-anchor" href="#监听和重新读取" aria-hidden="true">#</a> 监听和重新读取</h3>
<p>**Viper 支持在运行时让应用程序实时读取配置文件，也就是热加载配置。**可以通过 WatchConfig 函数热加载配置。在调用 WatchConfig 函数之前，需要确保已经添加了配置文件的搜索路径。另外，还可以为 Viper 提供一个回调函数，以便在每次发生更改时运行。这里我也给你个示例：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>viper<span class="token punctuation">.</span><span class="token function">WatchConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
viper<span class="token punctuation">.</span><span class="token function">OnConfigChange</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>e fsnotify<span class="token punctuation">.</span>Event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 配置文件发生变更之后会调用的回调函数</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Config file changed:"</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>不建议在实际开发中使用热加载功能</strong>，因为即使配置热加载了，程序中的代码也不一定会热加载。例如：修改了服务监听端口，但是服务没有重启，这时候服务还是监听在老的端口上，会造成不一致。</p>
<p>我们可以通过 viper.Set() 函数来显式设置配置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>viper.Set<span class="token punctuation">(</span><span class="token string">"user.username"</span>, <span class="token string">"colin"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Viper 还支持环境变量，通过如下 5 个函数来支持环境变量：</p>
<ul>
<li><code v-pre>AutomaticEnv()</code></li>
<li><code v-pre>BindEnv(input …string) error</code></li>
<li><code v-pre>SetEnvPrefix(in string)</code></li>
<li><code v-pre>SetEnvKeyReplacer(r *strings.Replacer)</code></li>
<li><code v-pre>AllowEmptyEnv(allowEmptyEnv bool)</code></li>
</ul>
<p>这里要注意：Viper 读取环境变量是区分大小写的。Viper 提供了一种机制来确保 Env 变量是唯一的。通过使用 SetEnvPrefix，可以告诉 Viper 在读取环境变量时使用前缀。BindEnv 和 AutomaticEnv 都将使用此前缀。比如，我们设置了 <code v-pre>viper.SetEnvPrefix(“VIPER”)</code>，当使用 <code v-pre>viper.Get(“apiversion”)</code> 时，实际读取的环境变量是<code v-pre>VIPER_APIVERSION</code>。</p>
<p>BindEnv 需要一个或两个参数。第一个参数是键名，第二个是环境变量的名称，环境变量的名称区分大小写。如果未提供 Env 变量名，则 Viper 将假定 Env 变量名为：<code v-pre>环境变量前缀_键名全大写</code>。例如：前缀为 VIPER，key 为 username，则 Env 变量名为<code v-pre>VIPER_USERNAME</code>。当显示提供 Env 变量名（第二个参数）时，它不会自动添加前缀。例如，如果第二个参数是 ID，Viper 将查找环境变量 ID。</p>
<p>还有一个魔法函数 SetEnvKeyReplacer，SetEnvKeyReplacer 允许你使用 strings.Replacer 对象来重写 Env 键。如果你想在 Get() 调用中使用<code v-pre>-</code>或者<code v-pre>.</code>，但希望你的环境变量使用<code v-pre>*</code>分隔符，可以通过 SetEnvKeyReplacer 来实现。比如，我们设置了环境变量<code v-pre>USER_SECRET_KEY=bVix2WBv0VPfrDrvlLWrhEdzjLpPCNYb</code>，但我们想用<code v-pre>viper.Get(&quot;user.secret-key&quot;)</code>，那我们就调用函数：<code v-pre>*</code></p>
</div></template>


