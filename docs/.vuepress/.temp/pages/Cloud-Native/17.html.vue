<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第17节-规范" tabindex="-1"><a class="header-anchor" href="#第17节-规范" aria-hidden="true">#</a> 第17节 规范</h1>
<div><a href = '16.md' style='float:left'>⬆️上一节🔗  </a><a href = '18.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="注释规范" tabindex="-1"><a class="header-anchor" href="#注释规范" aria-hidden="true">#</a> 注释规范</h2>
<ul>
<li>所有导出对象都需要注释说明其用途；非导出对象根据情况进行注释。</li>
<li>如果对象可数且无明确指定数量的情况下，一律使用单数形式和一般进行时描述；否则使用复数形式。</li>
<li>包、函数、方法和类型的注释说明都是一个完整的句子。</li>
<li>句子类型的注释首字母均需大写；短语类型的注释首字母需小写。</li>
<li>注释的单行长度不能超过 80 个字符。</li>
</ul>
<h3 id="包级别" tabindex="-1"><a class="header-anchor" href="#包级别" aria-hidden="true">#</a> 包级别</h3>
<ul>
<li>
<p>包级别的注释就是对包的介绍，只需在同个包的任一源文件中说明即可有效。</p>
</li>
<li>
<p>对于 <code v-pre>main</code> 包，一般只有一行简短的注释用以说明包的用途，且以项目名称开头：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>  // Gogs (Go Git Service) is a painless self-hosted Git Service.  package main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>对于一个复杂项目的子包，一般情况下不需要包级别注释，除非是代表某个特定功能的模块。</p>
</li>
<li>
<p>对于简单的非 <code v-pre>main</code> 包，也可用一行注释概括。</p>
</li>
<li>
<p>对于相对功能复杂的非 <code v-pre>main</code> 包，一般都会增加一些使用示例或基本说明，且以 <code v-pre>Package &lt;name&gt;</code> 开头：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*  Package regexp implements a simple library for regular expressions.  The syntax of the regular expressions accepted is:      regexp:          concatenation { '|' concatenation }      concatenation:          { closure }      closure:          term [ '*' | '+' | '?' ]      term:          '^'          '$'          '.'          character          '[' [ '^' ] character-ranges ']'          '(' regexp ')'  */</span> 
<span class="token keyword">package</span> regexp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>特别复杂的包说明，可单独创建 <a href="https://github.com/robfig/cron/blob/master/doc.go" target="_blank" rel="noopener noreferrer"><code v-pre>doc.go</code><ExternalLinkIcon/></a> 文件来加以说明。</p>
</li>
</ul>
<h3 id="结构、接口及其它类型" tabindex="-1"><a class="header-anchor" href="#结构、接口及其它类型" aria-hidden="true">#</a> 结构、接口及其它类型</h3>
<ul>
<li>
<p>类型的定义一般都以单数形式描述：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Request represents a request to run a command.  type Request struct { ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>如果为接口，则一般以以下形式描述：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// FileInfo is the interface that describes a file and is returned by Stat and Lstat.  type FileInfo interface { ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h3 id="函数与方法" tabindex="-1"><a class="header-anchor" href="#函数与方法" aria-hidden="true">#</a> 函数与方法</h3>
<ul>
<li>
<p>函数与方法的注释需以函数或方法的名称作为开头：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Post returns *BeegoHttpRequest with POST method.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>如果一句话不足以说明全部问题，则可换行继续进行更加细致的描述：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Copy copies file from source to target path.  // It returns false and error when error occurs in underlying function calls.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>若函数或方法为判断类型（返回值主要为 <code v-pre>bool</code> 类型），则以 <code v-pre>&lt;name&gt; returns true if</code> 开头：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// HasPrefix returns true if name has any string in given slice as prefix.  func HasPrefix(name string, prefixes []string) bool { ... }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h3 id="其它说明" tabindex="-1"><a class="header-anchor" href="#其它说明" aria-hidden="true">#</a> 其它说明</h3>
<ul>
<li>
<p>当某个部分等待完成时，可用 <code v-pre>TODO:</code> 开头的注释来提醒维护人员。</p>
</li>
<li>
<p>当某个部分存在已知问题进行需要修复或改进时，可用 <code v-pre>FIXME:</code> 开头的注释来提醒维护人员。</p>
</li>
<li>
<p>当需要特别说明某个问题时，可用 <code v-pre>NOTE:</code> 开头的注释：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// NOTE: os.Chmod and os.Chtimes don't recognize symbolic link,  </span>
<span class="token comment">// which will lead "no such file or directory" error.  return os.Symlink(target, dest)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="包括什么" tabindex="-1"><a class="header-anchor" href="#包括什么" aria-hidden="true">#</a> 包括什么</h2>
<ul>
<li>该<code v-pre>kubernetes</code>软件包包含用于访问 Kubernetes API 的客户端集。</li>
<li>该<code v-pre>discovery</code>包用于发现 Kubernetes API 服务器支持的 API。</li>
<li>该<code v-pre>dynamic</code>软件包包含一个动态客户端，可以对任意 Kubernetes API 对象执行通用操作。</li>
<li>这些<code v-pre>plugin/pkg/client/auth</code>软件包包含可选的身份验证插件，用于从外部来源获取凭证。</li>
<li>该<code v-pre>transport</code>包用于设置身份验证和启动连接。</li>
<li>该<code v-pre>tools/cache</code>包对于编写控制器很有用。</li>
</ul>
<h2 id="命名规则" tabindex="-1"><a class="header-anchor" href="#命名规则" aria-hidden="true">#</a> 命名规则</h2>
<ul>
<li>整个应用或包的主入口文件应当是 <code v-pre>main.go</code> 或与应用名称简写相同。例如：<code v-pre>Gogs</code> 的主入口文件名为 <code v-pre>gogs.go</code>。</li>
<li>若函数或方法为判断类型（返回值主要为 <code v-pre>bool</code> 类型），则名称应以 <code v-pre>Has</code>, <code v-pre>Is</code>, <code v-pre>Can</code> 或 <code v-pre>Allow</code> 等判断性动词开头：</li>
<li>常量均需使用全部大写字母组成，并使用下划线分词：</li>
<li>如果是枚举类型的常量，需要先创建相应类型</li>
<li>如果模块的功能较为复杂、常量名称容易混淆的情况下，为了更好地区分枚举类型，可以使用完整的前缀</li>
<li>变量命名基本上遵循相应的英文表达或简写。</li>
<li>在相对简单的环境（对象数量少、针对性强）中，可以将一些名称由完整单词简写为单个字母，例如：
<ul>
<li><code v-pre>user</code> 可以简写为 <code v-pre>u</code></li>
<li><code v-pre>userID</code> 可以简写 <code v-pre>uid</code></li>
</ul>
</li>
<li>若变量类型为 <code v-pre>bool</code> 类型，则名称应以 <code v-pre>Has</code>, <code v-pre>Is</code>, <code v-pre>Can</code> 或 <code v-pre>Allow</code> 开头</li>
</ul>
<h2 id="测试用例" tabindex="-1"><a class="header-anchor" href="#测试用例" aria-hidden="true">#</a> 测试用例</h2>
<ul>
<li>单元测试都必须使用 <a href="http://goconvey.co/" target="_blank" rel="noopener noreferrer">GoConvey<ExternalLinkIcon/></a> 编写，且辅助包覆盖率必须在 80% 以上。</li>
</ul>
<h3 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例" aria-hidden="true">#</a> 使用示例</h3>
<ul>
<li>为辅助包书写使用示例的时，文件名均命名为 <code v-pre>example_test.go</code>。</li>
<li>测试用例的函数名称必须以 <code v-pre>Test_</code> 开头，例如：<code v-pre>Test_Logger</code>。</li>
<li>如果为方法书写测试用例，则需要以 <code v-pre>Text_&lt;Struct&gt;_&lt;Method&gt;</code> 的形式命名，例如：<code v-pre>Test_Macaron_Run</code>。</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '16.md' style='float:left'>⬆️上一节🔗  </a><a href = '18.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


