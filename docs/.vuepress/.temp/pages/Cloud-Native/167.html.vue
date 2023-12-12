<template><div><h2 id="idea" tabindex="-1"><a class="header-anchor" href="#idea" aria-hidden="true">#</a> idea</h2>
<p>RPC 拆分多个文件，必然的 ！</p>
<p>Mysql 等中间件 组件要不要拆分？</p>
<ul>
<li>拆分：
<ul>
<li>优点：配置共享，灵活性增加</li>
<li>缺点：管理复杂，某些情况下可能有故障（组件对中间件依赖性增加)…</li>
</ul>
</li>
<li>整合：
<ul>
<li>优点: 每个组件维护自己的配置，配置简单直观，减少外部依赖</li>
<li>缺点：多个组件可能相同配置，每个组件可能重复配置，更新配置繁琐</li>
<li>同样，整合的话，对升级配置中心更友好：如果要将配置分成2个，那么如果要用配置中心管理配置，就需要分别请求2个配置key，并合并。</li>
</ul>
</li>
</ul>
<blockquote>
<p>整合的 缺点可以通过自动化解决。参考 kubeadm 或者 sealos （接口层封装）</p>
<p>但是更新配置呢？make init ≈ kubeadm init ；</p>
</blockquote>
<p>密码要不要拆分的问题：</p>
<ul>
<li>优点：从安全性来说，区别不是很大。因为secret只不过是base64加密过的字符串，并不显得比configmap安全多少，但是 可以通过 （RBAC）等机制，对 <code v-pre>Secret</code> 对象进行更细粒度的访问控制。也可以自己加密一遍，或者是用 HashiCorp Vault 。扩展性丰富</li>
<li>缺点：复杂</li>
</ul>
<blockquote>
<p>拆分密钥配置文件考虑本地加密存储（更安全）</p>
</blockquote>
<p>应用折业务配置和环境配置，环境配置拆敏感配置和非敏感配置。业务配置让业务方吸收掉。托管的直接用kms类似服务把敏感数据吸收掉。其实都代码化可见的。运行时不可信，就加密数据让应用使用时kms类似服务解密数据。</p>
<blockquote>
<p><strong>应用与环境配置分离</strong>： 业务代码配置（业务参数） 和 环境配置拆开（数据库连接、外部服务地址）：业务配置通常跟随应用代码，而环境配置则可以根据部署的不同环境（开发、测试、生产等）进行调整。</p>
<p><strong>环境配置中敏感与非敏感信息的分离</strong>： 环境配置中的敏感信息（如密码、密钥等）与非敏感信息（如服务地址、端口号等）分开处理：敏感信息可以通过更加安全的方式存储和访问，如Kubernetes的Secrets或云服务提供商的密钥管理服务（KMS）。</p>
<p><strong>使用KMS服务处理敏感数据</strong>：利用密钥管理服务（如AWS KMS、Azure Key Vault等）来处理敏感数据，可以提供更高级别的安全性。这些服务通常提供加密和解密功能，同时管理加密密钥的生命周期。应用程序可以在运行时通过这些服务来安全地访问和使用敏感数据。</p>
<p><strong>运行时安全</strong>：即使配置数据在存储和传输过程中是安全的，也需要确保在运行时同样安全。</p>
</blockquote>
<h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2>
<p><strong>用户执行 部署的 简单逻辑：</strong></p>
<p>make init 初始化工作：</p>
<blockquote>
<p>模仿 kubeadm 设计做</p>
</blockquote>
<ul>
<li>做一些初始化前的配置设置</li>
<li>初始化配置文件，初始化配置文件</li>
<li>选择合适的部署方案部署</li>
</ul>
<p><strong>修改配置：</strong></p>
<p>考虑热加载（不允许修改端口ip 啥的），密钥信息只读 密钥配置文件，</p>
<p>根据拆分的配置文件做处理，自动化逻辑</p>
<p>更新配置 ~</p>
<h2 id="升级" tabindex="-1"><a class="header-anchor" href="#升级" aria-hidden="true">#</a> 升级</h2>
<p>只支持一个版本到另一个版本升级，可控安全。</p>
<p>……</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li>https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/</li>
</ul>
</div></template>


