<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第11节-k3s-ha" tabindex="-1"><a class="header-anchor" href="#第11节-k3s-ha" aria-hidden="true">#</a> 第11节 k3s HA ~</h1>
<div><a href = '10.md' style='float:left'>⬆️上一节🔗  </a><a href = '12.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="准备" tabindex="-1"><a class="header-anchor" href="#准备" aria-hidden="true">#</a> 准备</h2>
<p>三台基本配置的机器（避免了docker，测试过，namespace的隔离性并不让我满意）</p>
<h3 id="版本" tabindex="-1"><a class="header-anchor" href="#版本" aria-hidden="true">#</a> 版本</h3>
<ul>
<li>node：ubuntu22.04、Ubuntu20.04</li>
<li>master：Ubuntu</li>
</ul>
<p><strong>Go语言</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@smile:/usr/local/src<span class="token comment"># cat /etc/profile.d/mypath</span>
<span class="token comment"># GO语言路径</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GO_PATH</span><span class="token operator">=</span>$<span class="token string">"/usr/local/src/go"</span>

<span class="token comment"># path</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$GO_PATH</span>/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="固定ip" tabindex="-1"><a class="header-anchor" href="#固定ip" aria-hidden="true">#</a> 固定ip</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/hosts <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
192.168.71.130 cubmaster01
192.168.71.131 cubnode01
192.168.71.132 cubnode02
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">注意@！</p>
<p>考虑到后期维护性和可扩展性，取消了固定 IP</p>
<p>使用 DHCP 分配 IP：</p>
<img src="http://sm.nsddd.top/smimage-20221124170002829.png" alt="image-20221124170002829" style="zoom:33%;" />
</div>
<h3 id="rsync远程同步工具" tabindex="-1"><a class="header-anchor" href="#rsync远程同步工具" aria-hidden="true">#</a> rsync远程同步工具</h3>
<p><strong>rsync主要用于备份和镜像，具有速度快、避免相同内容和支持符号链接的优点</strong></p>
<blockquote>
<p>相比较scp,rsync速度更快，只对差异文件做更新</p>
</blockquote>
<p><strong>第一次同步等同于拷贝</strong></p>
<p><strong>基本语法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>rsync -rav atguigu@hadoop01:/opt/module atguigu@hadoop02:/opt/module
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th>-v</th>
<th>详细模式输出</th>
</tr>
</thead>
<tbody>
<tr>
<td>-z</td>
<td>压缩文件</td>
</tr>
<tr>
<td>-o</td>
<td>保留文件原始所有者身份</td>
</tr>
<tr>
<td>-g</td>
<td>保留文件原始所有组身份</td>
</tr>
<tr>
<td>-p</td>
<td>保留文件原始权限信息</td>
</tr>
<tr>
<td>-b</td>
<td>备份目标文件</td>
</tr>
<tr>
<td>-r</td>
<td>递归目录文件（传输目录内的子文件）</td>
</tr>
<tr>
<td>-d</td>
<td>不递归目录文件（不传输目录内的子文件）</td>
</tr>
<tr>
<td>-P</td>
<td>显示进度信息</td>
</tr>
<tr>
<td>-q</td>
<td>精简输出模式</td>
</tr>
<tr>
<td>-h</td>
<td>显示帮助信息</td>
</tr>
</tbody>
</table>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '10.md' style='float:left'>⬆️上一节🔗  </a><a href = '12.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


