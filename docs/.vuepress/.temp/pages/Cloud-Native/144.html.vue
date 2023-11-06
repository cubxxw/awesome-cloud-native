<template><div><h1 id="openim-jssdk-二" tabindex="-1"><a class="header-anchor" href="#openim-jssdk-二" aria-hidden="true">#</a> OpenIM JSSDK (二)</h1>
<h2 id="go-语言中-reflect-详解" tabindex="-1"><a class="header-anchor" href="#go-语言中-reflect-详解" aria-hidden="true">#</a> Go 语言中 reflect 详解</h2>
<p><code v-pre>reflect</code> 是 Go 语言的一个标准库，它允许程序操作任意类型的对象，包括动态类型检查、访问和修改对象的字段和方法等功能。使用 <code v-pre>reflect</code>，你可以检查类型（不仅仅是静态类型，还有运行时类型）、遍历结构体字段，调用方法，创建并操作数组、切片和字典等。</p>
<p><strong>反射 ！！！</strong></p>
<h3 id="reflect-的核心元素" tabindex="-1"><a class="header-anchor" href="#reflect-的核心元素" aria-hidden="true">#</a> reflect 的核心元素</h3>
<ol>
<li><strong>Type</strong>: 它表示 Go 语言中的类型。每个类型都对应一个 <code v-pre>reflect.Type</code>。</li>
<li><strong>Value</strong>: 它表示 Go 语言中的值。每个值都对应一个 <code v-pre>reflect.Value</code>。</li>
</ol>
<h3 id="常用的-reflect-功能" tabindex="-1"><a class="header-anchor" href="#常用的-reflect-功能" aria-hidden="true">#</a> 常用的 reflect 功能</h3>
<ol>
<li>
<p><strong>获取和检查类型与值</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> x <span class="token builtin">float64</span> <span class="token operator">=</span> <span class="token number">3.4</span>
v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"type:"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>            <span class="token comment">// float64</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"kind is float64:"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> reflect<span class="token punctuation">.</span>Float64<span class="token punctuation">)</span>  <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>修改值</strong>（需要注意是否可以被修改，如是否是地址引用、是否是导出字段等）:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> y <span class="token builtin">float64</span> <span class="token operator">=</span> <span class="token number">3.4</span>
p <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>y<span class="token punctuation">)</span> <span class="token comment">// 注意: 取 y 的地址</span>
v <span class="token operator">:=</span> p<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
v<span class="token punctuation">.</span><span class="token function">SetFloat</span><span class="token punctuation">(</span><span class="token number">7.1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>遍历结构体的字段</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> MyStruct <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Name <span class="token builtin">string</span>
    Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>
s <span class="token operator">:=</span> MyStruct<span class="token punctuation">{</span><span class="token string">"Alice"</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">}</span>
v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
typeOfS <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> v<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
    field <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s: %v\n"</span><span class="token punctuation">,</span> typeOfS<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>Name<span class="token punctuation">,</span> field<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>调用方法</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> MyStruct <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m MyStruct<span class="token punctuation">)</span> <span class="token function">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello, World!"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

m <span class="token operator">:=</span> MyStruct<span class="token punctuation">{</span><span class="token punctuation">}</span>
mv <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span>
method <span class="token operator">:=</span> mv<span class="token punctuation">.</span><span class="token function">MethodByName</span><span class="token punctuation">(</span><span class="token string">"Hello"</span><span class="token punctuation">)</span>
method<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h3>
<ol>
<li><strong>JSON/XML 的序列化与反序列化</strong>: 当解析 JSON 或 XML 时，经常需要将字符串映射到结构体字段，或者将结构体字段输出为特定格式的字符串。</li>
<li><strong>配置文件的解析</strong>: 如果配置文件的结构与 Go 结构体相对应，可以使用 <code v-pre>reflect</code> 进行自动解析。</li>
<li><strong>ORM（Object-Relational Mapping）系统</strong>: ORM 允许你将 Go 结构体与数据库表记录进行映射。</li>
<li><strong>插件系统或框架</strong>: 允许用户提供自定义逻辑或处理函数，并在运行时加载和执行它们。</li>
<li><strong>通用工具与库</strong>: 例如，一个可以比较两个任意对象并生成差异报告的工具。</li>
</ol>
<h3 id="在给出的场景中的作用" tabindex="-1"><a class="header-anchor" href="#在给出的场景中的作用" aria-hidden="true">#</a> 在给出的场景中的作用</h3>
<p>在上述代码片段中，<code v-pre>reflect</code> 被用于动态地处理 <code v-pre>WsFuncRouter</code> 的方法。这允许代码在运行时列出所有的方法、访问方法名称，并动态调用它们，而无需在编写代码时硬编码这些信息。</p>
<p>具体来说，该段代码生成了一个映射，其中键是方法的名称，值是对应的方法。然后，当需要调用特定的方法时（如在 WebSocket 请求中指定），可以简单地查找映射并动态调用相应的方法。这为框架提供了极大的灵活性，因为添加或修改 <code v-pre>WsFuncRouter</code> 中的方法不需要更改处理请求的核心逻辑。</p>
<h3 id="关于-go-语言的反射" tabindex="-1"><a class="header-anchor" href="#关于-go-语言的反射" aria-hidden="true">#</a> 关于 Go 语言的反射</h3>
<p>每种语言的反射模型都不同，并且有些语言根本不支持反射。Golang语言实现了反射，反射机制就是在运行时动态的调用对象的方法和属性，官方自带的reflect包就是反射相关的，只要包含这个包就可以使用。</p>
<p>多插一句，Golang的gRPC也是通过反射实现的。</p>
<h3 id="interface-和-反射" tabindex="-1"><a class="header-anchor" href="#interface-和-反射" aria-hidden="true">#</a> interface 和 反射</h3>
<p>在讲反射之前，先来看看Golang关于类型设计的一些原则</p>
<ul>
<li>变量包括（type, value）两部分： 理解这一点就知道为什么nil != nil了</li>
<li>type 包括 static type和concrete type. 简单来说 static type是你在编码是看见的类型(如int、string)，concrete type是runtime系统看见的类型</li>
<li>类型断言能否成功，取决于变量的concrete type，而不是static type. 因此，一个 reader变量如果它的concrete type也实现了write方法的话，它也可以被类型断言为writer.</li>
</ul>
<p>接下来要讲的反射，就是建立在类型之上的，Golang的指定类型的变量的类型是静态的（也就是指定int、string这些的变量，它的type是static type），在创建变量的时候就已经确定，<strong>反射主要与 Golang 的 interface 类型相关（它的 type 是concrete type），只有interface类型才有反射一说。</strong></p>
<p>在Golang的实现中，每个interface变量都有一个对应 <code v-pre>pair</code>，<code v-pre>pair</code> 中记录了实际变量的值和类型:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>(value<span class="token punctuation">,</span> type)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>value 是实际变量值，type是实际变量的类型。一个 <code v-pre>interface{}</code> 类型的变量包含了2个指针，一个指针指向值的类型【对应 concrete type 】，另外一个指针指向实际的值【对应value】。</p>
<p>例如，创建类型为 <code v-pre>*os.File</code> 的变量，然后将其赋给一个接口变量 <code v-pre>r</code>：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>tty<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span><span class="token string">"/dev/tty"</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_RDWR<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> r io<span class="token punctuation">.</span>Reader
r <span class="token operator">=</span> tty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接口变量 <code v-pre>r</code> 的 <code v-pre>pair</code> 中将记录如下信息：<code v-pre>(tty, *os.File)</code>，这个pair在接口变量的连续赋值过程中是不变的，将接口变量r赋给另一个接口变量w:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var w io.Writer
w = r.(io.Writer)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接口变量w的pair与r的pair相同，都是: <code v-pre>(tty, *os.File)</code>，即使w是空接口类型，pair也是不变的。</p>
<p>interface及其pair的存在，是Golang中实现反射的前提，理解了pair，就更容易理解反射。反射就是用来检测存储在接口变量内部(值value；类型concrete type) pair对的一种机制。</p>
<p><img src="http://sm.nsddd.top/sm202310312105266.png" alt="image-20231031210550170"></p>
<h3 id="reflect的基本功能typeof和valueof" tabindex="-1"><a class="header-anchor" href="#reflect的基本功能typeof和valueof" aria-hidden="true">#</a> reflect的基本功能TypeOf和ValueOf</h3>
<p>既然反射就是用来检测存储在接口变量内部(值value；类型concrete type) pair对的一种机制。</p>
<p>那么在 Golang 的 reflect 反射包中有什么样的方式可以让我们直接获取到变量内部的信息呢？ 它提供了两种类型（或者说两个方法）让我们可以很容易的访问接口变量内容，分别是 <code v-pre>reflect.ValueOf()</code> 和 <code v-pre>reflect.TypeOf()</code>，看看官方的解释</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>// ValueOf returns a new Value initialized to the concrete value
// stored <span class="token keyword">in</span> the interface i.  ValueOf<span class="token punctuation">(</span>nil<span class="token punctuation">)</span> returns the zero 
func ValueOf<span class="token punctuation">(</span>i interface<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> Value <span class="token punctuation">{</span><span class="token punctuation">..</span>.<span class="token punctuation">}</span>

翻译一下：ValueOf用来获取输入参数接口中的数据的值，如果接口为空则返回0


// TypeOf returns the reflection Type that represents the dynamic <span class="token builtin class-name">type</span> of i.
// If i is a nil interface value, TypeOf returns nil.
func TypeOf<span class="token punctuation">(</span>i interface<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> Type <span class="token punctuation">{</span><span class="token punctuation">..</span>.<span class="token punctuation">}</span>

翻译一下：TypeOf用来动态获取输入参数接口中的值的类型，如果接口为空则返回nil
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>reflect.TypeOf()</code> 是获取pair中的type，<code v-pre>reflect.ValueOf()</code> 获取pair中的value，示例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> num <span class="token builtin">float64</span> <span class="token operator">=</span> <span class="token number">1.2345</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"type: "</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"value: "</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

运行结果<span class="token punctuation">:</span>
<span class="token keyword">type</span><span class="token punctuation">:</span>  <span class="token builtin">float64</span>
value<span class="token punctuation">:</span>  <span class="token number">1.2345</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="说明" tabindex="-1"><a class="header-anchor" href="#说明" aria-hidden="true">#</a> 说明</h4>
<ol>
<li><code v-pre>reflect.TypeOf</code>： 直接给到了我们想要的type类型，如float64、int、各种pointer、struct 等等真实的类型</li>
<li><code v-pre>reflect.ValueOf</code>：直接给到了我们想要的具体的值，如1.2345这个具体数值，或者类似 <code v-pre>&amp;{1 &quot;Allen.Wu&quot; 25}</code> 这样的结构体struct的值</li>
<li>也就是说明反射可以将“接口类型变量”转换为“反射类型对象”，反射类型指的是<code v-pre>reflect.Type</code>和<code v-pre>reflect.Value</code>这两种</li>
</ol>
<h3 id="从relfect-value中获取接口interface的信息" tabindex="-1"><a class="header-anchor" href="#从relfect-value中获取接口interface的信息" aria-hidden="true">#</a> 从relfect.Value中获取接口interface的信息</h3>
<p>当执行 <code v-pre>reflect.ValueOf(interface)</code> 之后，就得到了一个类型为”relfect.Value”变量，可以通过它本身的Interface()方法获得接口变量的真实内容，然后可以通过类型判断进行转换，转换为原有真实类型。不过，我们可能是已知原有类型，也有可能是未知原有类型，因此，下面分两种情况进行说明。</p>
<h4 id="已知原有类型【进行-强制转换-】" tabindex="-1"><a class="header-anchor" href="#已知原有类型【进行-强制转换-】" aria-hidden="true">#</a> 已知原有类型【进行“强制转换”】</h4>
<p>已知类型后转换为其对应的类型的做法如下，直接通过Interface方法然后强制转换，如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>realValue <span class="token operator">:=</span> value<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span>已知的类型<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> num <span class="token builtin">float64</span> <span class="token operator">=</span> <span class="token number">1.2345</span>

	pointer <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>num<span class="token punctuation">)</span>
	value <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>

	<span class="token comment">// 可以理解为“强制转换”，但是需要注意的时候，转换的时候，如果转换的类型不完全符合，则直接panic</span>
	<span class="token comment">// Golang 对类型要求非常严格，类型一定要完全符合</span>
	<span class="token comment">// 如下两个，一个是*float64，一个是float64，如果弄混，则会panic</span>
	convertPointer <span class="token operator">:=</span> pointer<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token builtin">float64</span><span class="token punctuation">)</span>
	convertValue <span class="token operator">:=</span> value<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">float64</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>convertPointer<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>convertValue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

运行结果：
<span class="token number">0xc42000e238</span>
<span class="token number">1.2345</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="说明-1" tabindex="-1"><a class="header-anchor" href="#说明-1" aria-hidden="true">#</a> 说明</h5>
<ol>
<li>转换的时候，如果转换的类型不完全符合，则直接panic，类型要求非常严格！</li>
<li>转换的时候，要区分是指针还是指</li>
<li>也就是说反射可以将“反射类型对象”再重新转换为“接口类型变量”</li>
</ol>
<h3 id="未知原有类型【遍历探测其filed】" tabindex="-1"><a class="header-anchor" href="#未知原有类型【遍历探测其filed】" aria-hidden="true">#</a> 未知原有类型【遍历探测其Filed】</h3>
<p>很多情况下，我们可能并不知道其具体类型，那么这个时候，该如何做呢？需要我们进行遍历探测其Filed来得知，示例如下:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id   <span class="token builtin">int</span>
	Name <span class="token builtin">string</span>
	Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u User<span class="token punctuation">)</span> <span class="token function">ReflectCallFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Allen.Wu ReflectCallFunc"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	user <span class="token operator">:=</span> User<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"Allen.Wu"</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">}</span>

	<span class="token function">DoFiledAndMethod</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token comment">// 通过接口来获取任意参数，然后一一揭晓</span>
<span class="token keyword">func</span> <span class="token function">DoFiledAndMethod</span><span class="token punctuation">(</span>input <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	getType <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"get Type is :"</span><span class="token punctuation">,</span> getType<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	getValue <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"get all Fields is:"</span><span class="token punctuation">,</span> getValue<span class="token punctuation">)</span>

	<span class="token comment">// 获取方法字段</span>
	<span class="token comment">// 1. 先获取interface的reflect.Type，然后通过NumField进行遍历</span>
	<span class="token comment">// 2. 再通过reflect.Type的Field获取其Field</span>
	<span class="token comment">// 3. 最后通过Field的Interface()得到对应的value</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> getType<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		field <span class="token operator">:=</span> getType<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		value <span class="token operator">:=</span> getValue<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s: %v = %v\n"</span><span class="token punctuation">,</span> field<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> field<span class="token punctuation">.</span>Type<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 获取方法</span>
	<span class="token comment">// 1. 先获取interface的reflect.Type，然后通过.NumMethod进行遍历</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> getType<span class="token punctuation">.</span><span class="token function">NumMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		m <span class="token operator">:=</span> getType<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s: %v\n"</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> m<span class="token punctuation">.</span>Type<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

运行结果：
get Type is <span class="token punctuation">:</span> User
get all Fields is<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token number">1</span> Allen<span class="token punctuation">.</span>Wu <span class="token number">25</span><span class="token punctuation">}</span>
Id<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span>
Name<span class="token punctuation">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> Allen<span class="token punctuation">.</span>Wu
Age<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">25</span>
ReflectCallFunc<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>main<span class="token punctuation">.</span>User<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
</div></template>


