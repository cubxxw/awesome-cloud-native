import{_ as r,r as i,o as l,c as a,a as e,b as t,w as d,e as o,d as c}from"./app.9f14a191.js";const u="/assets/IMC5rzTvKxS9Dlf.adec0f8e.png",_={},h=e("h1",{id:"\u5728-ubuntu-\u4E0A\u5B89\u88C5-docker-\u5F15\u64CE",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u5728-ubuntu-\u4E0A\u5B89\u88C5-docker-\u5F15\u64CE","aria-hidden":"true"},"#"),o(" \u5728 Ubuntu \u4E0A\u5B89\u88C5 Docker \u5F15\u64CE")],-1),p={class:"table-of-contents"},k=o("\u5148\u51B3\u6761\u4EF6"),g=o("\u64CD\u4F5C\u7CFB\u7EDF\u8981\u6C42"),b=o("\u5378\u8F7D\u65E7\u7248\u672C"),m=o("\u652F\u6301\u7684\u5B58\u50A8\u9A71\u52A8\u7A0B\u5E8F"),v=o("\u5B89\u88C5\u65B9\u6CD5"),x=o("\u4F7F\u7528\u5B58\u50A8\u5E93\u5B89\u88C5"),f=o("\u4ECE\u5305\u5B89\u88C5"),D=o("\u4F7F\u7528\u4FBF\u6377\u811A\u672C\u5B89\u88C5"),L=o("\u5378\u8F7D Docker \u5F15\u64CE"),$=e("p",null,"[toc]",-1),S=e("p",null,"**\u9002\u7528\u4E8E Linux \u7684 Docker \u684C\u9762 **",-1),y=o("Docker Desktop \u53EF\u5E2E\u52A9\u60A8\u5728 Mac \u548C Windows \u4E0A\u8F7B\u677E\u6784\u5EFA\u3001\u5171\u4EAB\u548C\u8FD0\u884C\u5BB9\u5668\uFF0C\u5C31\u50CF\u5728 Linux \u4E0A\u4E00\u6837\u3002\u6211\u4EEC\u5F88\u9AD8\u5174\u5730\u5206\u4EAB Docker Desktop for Linux\uFF08Beta\uFF09\u73B0\u5728\u53EF\u4F9B\u60A8\u6D4B\u8BD5\u3002\u6709\u5173\u66F4\u591A\u4FE1\u606F\uFF0C\u8BF7\u53C2\u9605 "),E={href:"https://docs.docker.com/desktop/linux/",target:"_blank",rel:"noopener noreferrer"},q=o("\u9002\u7528\u4E8E Linux \u7684 Docker \u684C\u9762"),U=o("\u3002"),w=o("\u8981\u5728 Ubuntu \u4E0A\u5F00\u59CB\u4F7F\u7528 Docker Engine\uFF0C\u8BF7\u786E\u4FDD "),T={href:"https://docs.docker.com/engine/install/ubuntu/#prerequisites",target:"_blank",rel:"noopener noreferrer"},R=o("\u6EE1\u8DB3\u5148\u51B3\u6761\u4EF6"),I=o("\uFF0C\u7136\u540E "),N={href:"https://docs.docker.com/engine/install/ubuntu/#installation-methods",target:"_blank",rel:"noopener noreferrer"},C=o("\u5B89\u88C5 Docker"),P=o("\u3002"),V=c(`<h2 id="\u5148\u51B3\u6761\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5148\u51B3\u6761\u4EF6" aria-hidden="true">#</a> \u5148\u51B3\u6761\u4EF6</h2><h3 id="\u64CD\u4F5C\u7CFB\u7EDF\u8981\u6C42" tabindex="-1"><a class="header-anchor" href="#\u64CD\u4F5C\u7CFB\u7EDF\u8981\u6C42" aria-hidden="true">#</a> \u64CD\u4F5C\u7CFB\u7EDF\u8981\u6C42</h3><p>\u8981\u5B89\u88C5 Docker Engine\uFF0C\u60A8\u9700\u8981\u4EE5\u4E0B Ubuntu \u7248\u672C\u4E4B\u4E00\u7684 64 \u4F4D\u7248\u672C\uFF1A</p><ul><li>Ubuntu Jammy 22.04 (LTS)</li><li>Ubuntu \u5C0F\u9B3C 21.10</li><li>Ubuntu \u7126\u70B9 20.04 (LTS)</li><li>Ubuntu \u4EFF\u751F 18.04 (LTS)</li></ul><p><code>x86_64</code>\uFF08\u6216<code>amd64</code>\uFF09<code>armhf</code>\u3001<code>arm64</code>\u548C<code>s390x</code>\u67B6\u6784\u652F\u6301 Docker \u5F15\u64CE\u3002</p><blockquote><p>Ubuntu 16.04 LTS \u201CXenial Xerus\u201D \u62A5\u5E9F</p><p>Ubuntu Linux 16.04 LTS \u5DF2\u4E8E 2021 \u5E74 4 \u6708 30 \u65E5\u7ED3\u675F\u5176\u4E94\u5E74 LTS \u7A97\u53E3\u671F\uFF0C\u4E0D\u518D\u53D7\u652F\u6301\u3002Docker \u4E0D\u518D\u53D1\u5E03\u6B64\u53D1\u884C\u7248\u7684\u8F6F\u4EF6\u5305\uFF08\u5305\u62EC\u8865\u4E01\u548C\u5B89\u5168\u7248\u672C\uFF09\u3002\u5EFA\u8BAE\u5728 Ubuntu 16.04 \u4E0A\u8FD0\u884C Docker \u7684\u7528\u6237\u5C06\u5176\u7CFB\u7EDF\u66F4\u65B0\u5230\u5F53\u524D\u652F\u6301\u7684 LTS \u7248\u672C\u7684 Ubuntu\u3002</p></blockquote><h3 id="\u5378\u8F7D\u65E7\u7248\u672C" tabindex="-1"><a class="header-anchor" href="#\u5378\u8F7D\u65E7\u7248\u672C" aria-hidden="true">#</a> \u5378\u8F7D\u65E7\u7248\u672C</h3><p>\u65E7\u7248\u672C\u7684 Docker \u88AB\u79F0\u4E3A<code>docker</code>,<code>docker.io</code>\u6216<code>docker-engine</code>. \u5982\u679C\u5B89\u88C5\u4E86\u8FD9\u4E9B\uFF0C\u8BF7\u5378\u8F7D\u5B83\u4EEC\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ sudo apt-get remove docker docker-engine docker.io containerd runc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>apt-get</code>\u5982\u679C\u62A5\u544A\u6CA1\u6709\u5B89\u88C5\u8FD9\u4E9B\u8F6F\u4EF6\u5305\uFF0C\u90A3\u4E5F\u6CA1\u5173\u7CFB\u3002</p>`,10),B=o("\u7684\u5185\u5BB9"),G=e("code",null,"/var/lib/docker/",-1),H=o("\uFF0C\u5305\u62EC\u56FE\u50CF\u3001\u5BB9\u5668\u3001\u5377\u548C\u7F51\u7EDC\uFF0C\u90FD\u88AB\u4FDD\u7559\u3002\u5982\u679C\u60A8\u4E0D\u9700\u8981\u4FDD\u5B58\u73B0\u6709\u6570\u636E\uFF0C\u5E76\u4E14\u60F3\u4ECE\u5168\u65B0\u5B89\u88C5\u5F00\u59CB\uFF0C\u8BF7\u53C2\u9605 \u672C\u9875\u5E95\u90E8\u7684"),M={href:"https://docs.docker.com/engine/install/ubuntu/#uninstall-docker-engine",target:"_blank",rel:"noopener noreferrer"},O=o("\u5378\u8F7D Docker \u5F15\u64CE\u90E8\u5206\u3002"),z=e("h3",{id:"\u652F\u6301\u7684\u5B58\u50A8\u9A71\u52A8\u7A0B\u5E8F",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u652F\u6301\u7684\u5B58\u50A8\u9A71\u52A8\u7A0B\u5E8F","aria-hidden":"true"},"#"),o(" \u652F\u6301\u7684\u5B58\u50A8\u9A71\u52A8\u7A0B\u5E8F")],-1),F=e("p",null,[o("Ubuntu \u4E0A\u7684 Docker \u5F15\u64CE\u652F\u6301"),e("code",null,"overlay2"),o(","),e("code",null,"aufs"),o("\u548C"),e("code",null,"btrfs"),o("\u5B58\u50A8\u9A71\u52A8\u7A0B\u5E8F\u3002")],-1),X=o("Docker Engine"),Y=e("code",null,"overlay2",-1),A=o("\u9ED8\u8BA4\u4F7F\u7528\u5B58\u50A8\u9A71\u52A8\u7A0B\u5E8F\u3002\u5982\u679C\u9700\u8981 "),J=e("code",null,"aufs",-1),K=o("\u6539\u7528\uFF0C\u9700\u8981\u624B\u52A8\u914D\u7F6E\u3002\u8BF7\u53C2\u9605"),W={href:"https://docs.docker.com/storage/storagedriver/aufs-driver/",target:"_blank",rel:"noopener noreferrer"},j=o("\u4F7F\u7528 AUFS \u5B58\u50A8\u9A71\u52A8\u7A0B\u5E8F"),Q=e("h2",{id:"\u5B89\u88C5\u65B9\u6CD5",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u5B89\u88C5\u65B9\u6CD5","aria-hidden":"true"},"#"),o(" \u5B89\u88C5\u65B9\u6CD5")],-1),Z=e("p",null,"\u60A8\u53EF\u4EE5\u6839\u636E\u9700\u8981\u4EE5\u4E0D\u540C\u7684\u65B9\u5F0F\u5B89\u88C5 Docker Engine\uFF1A",-1),ee=o("\u5927\u591A\u6570\u7528\u6237 "),oe={href:"https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository",target:"_blank",rel:"noopener noreferrer"},te=o("\u8BBE\u7F6E Docker \u7684\u5B58\u50A8\u5E93"),ne=o("\u5E76\u4ECE\u4E2D\u5B89\u88C5\uFF0C\u4EE5\u4FBF\u4E8E\u5B89\u88C5\u548C\u5347\u7EA7\u4EFB\u52A1\u3002\u8FD9\u662F\u63A8\u8350\u7684\u65B9\u6CD5\u3002"),se=o("\u4E00\u4E9B\u7528\u6237\u4E0B\u8F7D DEB \u5305\u5E76 "),de={href:"https://docs.docker.com/engine/install/ubuntu/#install-from-a-package",target:"_blank",rel:"noopener noreferrer"},ce=o("\u624B\u52A8\u5B89\u88C5\uFF0C"),ie=o("\u5B8C\u5168\u624B\u52A8\u7BA1\u7406\u5347\u7EA7\u3002\u8FD9\u5728\u8BF8\u5982\u5728\u65E0\u6CD5\u8BBF\u95EE Internet \u7684\u6C14\u9699\u7CFB\u7EDF\u4E0A\u5B89\u88C5 Docker \u7B49\u60C5\u51B5\u4E0B\u5F88\u6709\u7528\u3002"),re=o("\u5728\u6D4B\u8BD5\u548C\u5F00\u53D1\u73AF\u5883\u4E2D\uFF0C\u4E00\u4E9B\u7528\u6237\u9009\u62E9\u4F7F\u7528\u81EA\u52A8\u5316 "),le={href:"https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script",target:"_blank",rel:"noopener noreferrer"},ae=o("\u4FBF\u5229\u811A\u672C"),ue=o("\u6765\u5B89\u88C5 Docker\u3002"),_e=e("h3",{id:"\u4F7F\u7528\u5B58\u50A8\u5E93\u5B89\u88C5",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u4F7F\u7528\u5B58\u50A8\u5E93\u5B89\u88C5","aria-hidden":"true"},"#"),o(" \u4F7F\u7528\u5B58\u50A8\u5E93\u5B89\u88C5")],-1),he=e("p",null,"\u5728\u65B0\u4E3B\u673A\u4E0A\u9996\u6B21\u5B89\u88C5 Docker Engine \u4E4B\u524D\uFF0C\u60A8\u9700\u8981\u8BBE\u7F6E Docker \u5B58\u50A8\u5E93\u3002\u4E4B\u540E\uFF0C\u60A8\u53EF\u4EE5\u4ECE\u5B58\u50A8\u5E93\u5B89\u88C5\u548C\u66F4\u65B0 Docker\u3002",-1),pe=e("h4",{id:"\u8BBE\u7F6E\u5B58\u50A8\u5E93",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u8BBE\u7F6E\u5B58\u50A8\u5E93","aria-hidden":"true"},"#"),o(" \u8BBE\u7F6E\u5B58\u50A8\u5E93")],-1),ke=c(`<li><p>\u66F4\u65B0<code>apt</code>\u5305\u7D22\u5F15\u5E76\u5B89\u88C5\u5305\u4EE5\u5141\u8BB8<code>apt</code>\u901A\u8FC7 HTTPS \u4F7F\u7528\u5B58\u50A8\u5E93\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ sudo apt-get update

$ sudo apt-get install \\
    ca-certificates \\
    curl \\
    gnupg \\
    lsb-release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u5728\u8BBE\u7F6E\u5B58\u50A8\u5E93\u7684\u65F6\u5019\uFF0C\u6CE8\u610F\u7F51\u7EDC\u5982\u679C\u662F\u56FD\u5916\u7684\u53EF\u80FD\u4F1A\u51FA\u95EE\u9898</p></blockquote></li><li><p>\u6DFB\u52A0 Docker \u7684\u5B98\u65B9 GPG \u5BC6\u94A5\uFF1A\uFF08\u53EF\u4EE5\u8DF3\u8FC7\uFF09</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>`,2),ge=o("\u4F7F\u7528\u4EE5\u4E0B\u547D\u4EE4\u8BBE\u7F6E"),be=e("strong",null,"\u7A33\u5B9A",-1),me=o("\u5B58\u50A8\u5E93\u3002\u8981\u6DFB\u52A0 "),ve=e("strong",null,"nightly",-1),xe=o("\u6216"),fe=e("strong",null,"test",-1),De=o("\u5B58\u50A8\u5E93\uFF0C\u8BF7\u5728\u4EE5\u4E0B\u547D\u4EE4\u4E2D\u7684\u5355\u8BCD\u4E4B\u540E\u6DFB\u52A0\u5355\u8BCD"),Le=e("code",null,"nightly",-1),$e=o("\u6216"),Se=e("code",null,"test",-1),ye=o("\uFF08\u6216\u4E24\u8005\uFF09 \u3002"),Ee={href:"https://docs.docker.com/engine/install/",target:"_blank",rel:"noopener noreferrer"},qe=o("\u4E86\u89E3"),Ue={href:"https://docs.docker.com/engine/install/",target:"_blank",rel:"noopener noreferrer"},we=e("strong",null,"\u591C\u95F4",-1),Te={href:"https://docs.docker.com/engine/install/",target:"_blank",rel:"noopener noreferrer"},Re=o("\u548C"),Ie={href:"https://docs.docker.com/engine/install/",target:"_blank",rel:"noopener noreferrer"},Ne=e("strong",null,"\u6D4B\u8BD5",-1),Ce={href:"https://docs.docker.com/engine/install/",target:"_blank",rel:"noopener noreferrer"},Pe=o("\u9891\u9053"),Ve=o("\u3002"),Be=e("code",null,"stable",-1),Ge=c(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ echo \\
  &quot;deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \\
  $(lsb_release -cs) stable&quot; | sudo tee /etc/apt/sources.list.d/docker.list &gt; /dev/null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>echo \\
  &quot;deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \\
  $(lsb_release -cs) stable&quot; | sudo tee /etc/apt/sources.list.d/docker.list &gt; /dev/null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u6211\u4EEC\u7684\u662Famd64</p></blockquote>`,3),He=c(`<h4 id="\u5B89\u88C5-docker-\u5F15\u64CE" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-docker-\u5F15\u64CE" aria-hidden="true">#</a> \u5B89\u88C5 Docker \u5F15\u64CE</h4><ol><li><p>\u66F4\u65B0<code>apt</code>\u5305\u7D22\u5F15\uFF0C\u5B89\u88C5<em>\u6700\u65B0\u7248\u672C</em>\u7684 Docker Engine\u3001containerd \u548C Docker Compose\uFF0C\u6216\u8005\u8FDB\u5165\u4E0B\u4E00\u6B65\u5B89\u88C5\u7279\u5B9A\u7248\u672C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> $ sudo apt-get update
 $ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u6709\u591A\u4E2A Docker \u5B58\u50A8\u5E93\uFF1F</p><p><code>apt-get install</code>\u5982\u679C\u60A8\u542F\u7528\u4E86\u591A\u4E2A Docker \u5B58\u50A8\u5E93\uFF0C\u5219\u5B89\u88C5\u6216\u66F4\u65B0\u800C\u4E0D\u5728or \u547D\u4EE4\u4E2D\u6307\u5B9A\u7248\u672C<code>apt-get update</code>\u59CB\u7EC8\u4F1A\u5B89\u88C5\u53EF\u80FD\u7684\u6700\u9AD8\u7248\u672C\uFF0C\u8FD9\u53EF\u80FD\u4E0D\u9002\u5408\u60A8\u7684\u7A33\u5B9A\u6027\u9700\u6C42\u3002</p></blockquote></li><li><p>\u8981\u5B89\u88C5<em>\u7279\u5B9A\u7248\u672C</em>\u7684 Docker Engine\uFF0C\u8BF7\u5728 repo \u4E2D\u5217\u51FA\u53EF\u7528\u7248\u672C\uFF0C\u7136\u540E\u9009\u62E9\u5E76\u5B89\u88C5\uFF1A\uFF08\u53EF\u4EE5\u8DF3\u8FC7\uFF09</p><p>\u4E00\u79CD\u3002\u5217\u51FA\u60A8\u7684\u5B58\u50A8\u5E93\u4E2D\u53EF\u7528\u7684\u7248\u672C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ apt-cache madison docker-ce

  docker-ce | 5:18.09.1~3-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
  docker-ce | 5:18.09.0~3-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
  docker-ce | 18.06.1~ce~3-0~ubuntu       | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
  docker-ce | 18.06.0~ce~3-0~ubuntu       | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528\u7B2C\u4E8C\u5217\u4E2D\u7684\u7248\u672C\u5B57\u7B26\u4E32\u5B89\u88C5\u7279\u5B9A\u7248\u672C\uFF0C\u4F8B\u5982<code>5:18.09.1~3-0~ubuntu-xenial</code>.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ sudo apt-get install docker-ce=&lt;VERSION_STRING&gt; docker-ce-cli=&lt;VERSION_STRING&gt; containerd.io docker-compose-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><code>hello-world</code> \u901A\u8FC7\u8FD0\u884C\u6620\u50CF\u6765\u9A8C\u8BC1 Docker \u5F15\u64CE\u662F\u5426\u5DF2\u6B63\u786E\u5B89\u88C5\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ sudo docker run hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6B64\u547D\u4EE4\u4E0B\u8F7D\u6D4B\u8BD5\u6620\u50CF\u5E76\u5728\u5BB9\u5668\u4E2D\u8FD0\u884C\u5B83\u3002\u5F53\u5BB9\u5668\u8FD0\u884C\u65F6\uFF0C\u5B83\u4F1A\u6253\u5370\u4E00\u6761\u6D88\u606F\u5E76\u9000\u51FA\u3002</p></li></ol>`,2),Me=o("Docker \u5F15\u64CE\u5DF2\u5B89\u88C5\u5E76\u6B63\u5728\u8FD0\u884C\u3002\u8BE5"),Oe=e("code",null,"docker",-1),ze=o("\u7EC4\u5DF2\u521B\u5EFA\uFF0C\u4F46\u672A\u5411\u5176\u4E2D\u6DFB\u52A0\u4EFB\u4F55\u7528\u6237\u3002\u60A8\u9700\u8981\u4F7F\u7528"),Fe=e("code",null,"sudo",-1),Xe=o("\u6765\u8FD0\u884C Docker \u547D\u4EE4\u3002\u7EE7\u7EED"),Ye={href:"https://docs.docker.com/engine/install/linux-postinstall/",target:"_blank",rel:"noopener noreferrer"},Ae=o("Linux \u540E\u5B89\u88C5"),Je=o("\u4EE5\u5141\u8BB8\u975E\u7279\u6743\u7528\u6237\u8FD0\u884C Docker \u547D\u4EE4\u548C\u5176\u4ED6\u53EF\u9009\u914D\u7F6E\u6B65\u9AA4\u3002"),Ke=c(`<p><strong>\u67E5\u770B\u7248\u672C\u4FE1\u606F\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="`+u+'" alt="image-20220508171810472" style="zoom:23%;"><h4 id="\u5347\u7EA7-docker-\u5F15\u64CE" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7-docker-\u5F15\u64CE" aria-hidden="true">#</a> \u5347\u7EA7 Docker \u5F15\u64CE</h4>',4),We=o("\u8981\u5347\u7EA7 Docker Engine\uFF0C\u9996\u5148\u8FD0\u884C"),je=e("code",null,"sudo apt-get update",-1),Qe=o("\uFF0C\u7136\u540E\u6309\u7167 "),Ze={href:"https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository",target:"_blank",rel:"noopener noreferrer"},eo=o("\u5B89\u88C5\u8BF4\u660E"),oo=o("\uFF0C\u9009\u62E9\u60A8\u8981\u5B89\u88C5\u7684\u65B0\u7248\u672C\u3002"),to=e("h3",{id:"\u4ECE\u5305\u5B89\u88C5",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u4ECE\u5305\u5B89\u88C5","aria-hidden":"true"},"#"),o(" \u4ECE\u5305\u5B89\u88C5")],-1),no=e("p",null,[o("\u5982\u679C\u60A8\u65E0\u6CD5\u4F7F\u7528 Docker \u7684\u5B58\u50A8\u5E93\u6765\u5B89\u88C5 Docker Engine\uFF0C\u60A8\u53EF\u4EE5\u4E0B\u8F7D\u8BE5 "),e("code",null,".deb"),o("\u7248\u672C\u7684\u6587\u4EF6\u5E76\u624B\u52A8\u5B89\u88C5\u3002\u6BCF\u6B21\u5347\u7EA7 Docker \u65F6\u90FD\u9700\u8981\u4E0B\u8F7D\u4E00\u4E2A\u65B0\u6587\u4EF6\u3002")],-1),so=o("\u8F6C\u5230"),co={href:"https://download.docker.com/linux/ubuntu/dists/",target:"_blank",rel:"noopener noreferrer"},io=e("code",null,"https://download.docker.com/linux/ubuntu/dists/",-1),ro=o("\uFF0C\u9009\u62E9\u60A8\u7684 Ubuntu \u7248\u672C\uFF0C\u7136\u540E\u6D4F\u89C8\u5230"),lo=e("code",null,"pool/stable/",-1),ao=o("\u3001\u9009\u62E9"),uo=e("code",null,"amd64",-1),_o=o("\u3001 "),ho=e("code",null,"armhf",-1),po=o("\u3001"),ko=e("code",null,"arm64",-1),go=o("\u6216"),bo=e("code",null,"s390x",-1),mo=o("\uFF0C\u7136\u540E\u4E0B\u8F7D"),vo=e("code",null,".deb",-1),xo=o("\u60A8\u8981\u5B89\u88C5\u7684 Docker \u5F15\u64CE\u7248\u672C\u7684\u6587\u4EF6\u3002"),fo=e("p",null,[e("strong",null,"\u7B14\u8BB0")],-1),Do=o("\u8981\u5B89\u88C5"),Lo=e("strong",null,"nightly",-1),$o=o("\u6216"),So=e("strong",null,"test",-1),yo=o("\uFF08\u9884\u53D1\u5E03\uFF09\u5305\uFF0C"),Eo=e("code",null,"stable",-1),qo=o("\u8BF7\u5C06\u4E0A\u8FF0 URL \u4E2D\u7684\u5355\u8BCD\u66F4\u6539\u4E3A"),Uo=e("code",null,"nightly",-1),wo=o("or "),To=e("code",null,"test",-1),Ro=o("\u3002 "),Io={href:"https://docs.docker.com/engine/install/",target:"_blank",rel:"noopener noreferrer"},No=o("\u4E86\u89E3"),Co=e("strong",null,"\u591C\u95F4",-1),Po=o("\u548C"),Vo=e("strong",null,"\u6D4B\u8BD5",-1),Bo=o("\u9891\u9053"),Go=o("\u3002"),Ho=c(`<li><p>\u5B89\u88C5 Docker Engine\uFF0C\u5C06\u4E0B\u9762\u7684\u8DEF\u5F84\u66F4\u6539\u4E3A\u60A8\u4E0B\u8F7D Docker \u5305\u7684\u8DEF\u5F84\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ sudo dpkg -i /path/to/package.deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Docker \u5B88\u62A4\u8FDB\u7A0B\u81EA\u52A8\u542F\u52A8\u3002</p></li><li><p><code>hello-world</code> \u901A\u8FC7\u8FD0\u884C\u6620\u50CF\u6765\u9A8C\u8BC1 Docker \u5F15\u64CE\u662F\u5426\u5DF2\u6B63\u786E\u5B89\u88C5\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ sudo docker run hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6B64\u547D\u4EE4\u4E0B\u8F7D\u6D4B\u8BD5\u6620\u50CF\u5E76\u5728\u5BB9\u5668\u4E2D\u8FD0\u884C\u5B83\u3002\u5F53\u5BB9\u5668\u8FD0\u884C\u65F6\uFF0C\u5B83\u4F1A\u6253\u5370\u4E00\u6761\u6D88\u606F\u5E76\u9000\u51FA\u3002</p></li>`,2),Mo=o("Docker \u5F15\u64CE\u5DF2\u5B89\u88C5\u5E76\u6B63\u5728\u8FD0\u884C\u3002\u8BE5"),Oo=e("code",null,"docker",-1),zo=o("\u7EC4\u5DF2\u521B\u5EFA\uFF0C\u4F46\u672A\u5411\u5176\u4E2D\u6DFB\u52A0\u4EFB\u4F55\u7528\u6237\u3002\u60A8\u9700\u8981\u4F7F\u7528"),Fo=e("code",null,"sudo",-1),Xo=o("\u6765\u8FD0\u884C Docker \u547D\u4EE4\u3002\u7EE7\u7EED"),Yo={href:"https://docs.docker.com/engine/install/linux-postinstall/",target:"_blank",rel:"noopener noreferrer"},Ao=o("\u6267\u884C Linux \u7684\u5B89\u88C5\u540E\u6B65\u9AA4"),Jo=o("\u4EE5\u5141\u8BB8\u975E\u7279\u6743\u7528\u6237\u8FD0\u884C Docker \u547D\u4EE4\u548C\u5176\u4ED6\u53EF\u9009\u914D\u7F6E\u6B65\u9AA4\u3002"),Ko=e("h4",{id:"\u5347\u7EA7-docker-\u5F15\u64CE-1",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u5347\u7EA7-docker-\u5F15\u64CE-1","aria-hidden":"true"},"#"),o(" \u5347\u7EA7 Docker \u5F15\u64CE")],-1),Wo=o("\u8981\u5347\u7EA7 Docker Engine\uFF0C\u8BF7\u4E0B\u8F7D\u66F4\u65B0\u7684\u5305\u6587\u4EF6\u5E76\u91CD\u590D "),jo={href:"https://docs.docker.com/engine/install/ubuntu/#install-from-a-package",target:"_blank",rel:"noopener noreferrer"},Qo=o("\u5B89\u88C5\u8FC7\u7A0B"),Zo=o("\uFF0C\u6307\u5411\u65B0\u6587\u4EF6\u3002"),et=e("h3",{id:"\u4F7F\u7528\u4FBF\u6377\u811A\u672C\u5B89\u88C5",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u4F7F\u7528\u4FBF\u6377\u811A\u672C\u5B89\u88C5","aria-hidden":"true"},"#"),o(" \u4F7F\u7528\u4FBF\u6377\u811A\u672C\u5B89\u88C5")],-1),ot={href:"https://get.docker.com/",target:"_blank",rel:"noopener noreferrer"},tt=o("Docker \u5728get.docker.com"),nt=o("\u4E0A\u63D0\u4F9B\u4E86\u4E00\u4E2A\u65B9\u4FBF\u7684\u811A\u672C\uFF0C \u53EF\u4EE5\u5FEB\u901F\u3001\u975E\u4EA4\u4E92\u5730\u5C06 Docker \u5B89\u88C5\u5230\u5F00\u53D1\u73AF\u5883\u4E2D\u3002\u4E0D\u5EFA\u8BAE\u5C06\u4FBF\u5229\u811A\u672C\u7528\u4E8E\u751F\u4EA7\u73AF\u5883\uFF0C\u4F46\u53EF\u4EE5\u7528\u4F5C\u793A\u4F8B\u6765\u521B\u5EFA\u9002\u5408\u60A8\u9700\u6C42\u7684\u914D\u7F6E\u811A\u672C\u3002\u53E6\u8BF7\u53C2\u9605"),st={href:"https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository",target:"_blank",rel:"noopener noreferrer"},dt=o("\u4F7F\u7528\u5B58\u50A8\u5E93"),ct=o(" \u5B89\u88C5\u6B65\u9AA4\u4EE5\u4E86\u89E3\u4F7F\u7528\u5305\u5B58\u50A8\u5E93\u5B89\u88C5\u7684\u5B89\u88C5\u6B65\u9AA4\u3002\u8BE5\u811A\u672C\u7684\u6E90\u4EE3\u7801\u662F\u5F00\u6E90\u7684\uFF0C\u53EF\u4EE5 "),it={href:"https://github.com/docker/docker-install",target:"_blank",rel:"noopener noreferrer"},rt=e("code",null,"docker-install",-1),lt=o("\u5728 GitHub \u4E0A\u7684\u5B58\u50A8\u5E93\u4E2D\u627E\u5230"),at=o("\u3002"),ut=c(`<p>\u5728\u672C\u5730\u8FD0\u884C\u811A\u672C\u4E4B\u524D\uFF0C\u8BF7\u52A1\u5FC5\u68C0\u67E5\u4ECE Internet \u4E0B\u8F7D\u7684\u811A\u672C\u3002\u5728\u5B89\u88C5\u4E4B\u524D\uFF0C\u8BF7\u8BA9\u81EA\u5DF1\u719F\u6089\u4FBF\u6377\u811A\u672C\u7684\u6F5C\u5728\u98CE\u9669\u548C\u9650\u5236\uFF1A</p><ul><li>\u8BE5\u811A\u672C\u9700\u8981<code>root</code>\u6216<code>sudo</code>\u7279\u6743\u624D\u80FD\u8FD0\u884C\u3002</li><li>\u8BE5\u811A\u672C\u4F1A\u5C1D\u8BD5\u68C0\u6D4B\u60A8\u7684 Linux \u53D1\u884C\u7248\u548C\u7248\u672C\u5E76\u4E3A\u60A8\u914D\u7F6E\u5305\u7BA1\u7406\u7CFB\u7EDF\uFF0C\u5E76\u4E14\u4E0D\u5141\u8BB8\u60A8\u81EA\u5B9A\u4E49\u5927\u591A\u6570\u5B89\u88C5\u53C2\u6570\u3002</li><li>\u8BE5\u811A\u672C\u4F1A\u5728\u4E0D\u8981\u6C42\u786E\u8BA4\u7684\u60C5\u51B5\u4E0B\u5B89\u88C5\u4F9D\u8D56\u9879\u548C\u5EFA\u8BAE\u3002\u8FD9\u53EF\u80FD\u4F1A\u5B89\u88C5\u5927\u91CF\u8F6F\u4EF6\u5305\uFF0C\u5177\u4F53\u53D6\u51B3\u4E8E\u4E3B\u673A\u7684\u5F53\u524D\u914D\u7F6E\u3002</li><li>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u8BE5\u811A\u672C\u4F1A\u5B89\u88C5 Docker\u3001containerd \u548C runc \u7684\u6700\u65B0\u7A33\u5B9A\u7248\u672C\u3002\u4F7F\u7528\u6B64\u811A\u672C\u914D\u7F6E\u673A\u5668\u65F6\uFF0C\u8FD9\u53EF\u80FD\u4F1A\u5BFC\u81F4 Docker \u7684\u4E3B\u8981\u7248\u672C\u5347\u7EA7\u610F\u5916\u3002\u5728\u90E8\u7F72\u5230\u751F\u4EA7\u7CFB\u7EDF\u4E4B\u524D\uFF0C\u59CB\u7EC8\u5728\u6D4B\u8BD5\u73AF\u5883\u4E2D\u6D4B\u8BD5\uFF08\u4E3B\u8981\uFF09\u5347\u7EA7\u3002</li><li>\u8BE5\u811A\u672C\u5E76\u975E\u65E8\u5728\u5347\u7EA7\u73B0\u6709\u7684 Docker \u5B89\u88C5\u3002\u4F7F\u7528\u811A\u672C\u66F4\u65B0\u73B0\u6709\u5B89\u88C5\u65F6\uFF0C\u4F9D\u8D56\u9879\u53EF\u80FD\u4E0D\u4F1A\u66F4\u65B0\u5230\u9884\u671F\u7248\u672C\uFF0C\u5BFC\u81F4\u4F7F\u7528\u8FC7\u65F6\u7684\u7248\u672C\u3002</li></ul><blockquote><p>\u63D0\u793A\uFF1A\u8FD0\u884C\u524D\u9884\u89C8\u811A\u672C\u6B65\u9AA4</p><p>\u60A8\u53EF\u4EE5\u4F7F\u7528<code>DRY_RUN=1</code>\u9009\u9879\u8FD0\u884C\u811A\u672C\u4EE5\u4E86\u89E3\u811A\u672C\u5728\u5B89\u88C5\u671F\u95F4\u5C06\u6267\u884C\u7684\u6B65\u9AA4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ curl -fsSL https://get.docker.com -o get-docker.sh
$ DRY_RUN=1 sh ./get-docker.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>`,3),_t=o("\u6B64\u793A\u4F8B\u4ECE"),ht={href:"https://get.docker.com/",target:"_blank",rel:"noopener noreferrer"},pt=o("get.docker.com"),kt=o("\u4E0B\u8F7D\u811A\u672C \u5E76\u8FD0\u884C\u5B83\u4EE5\u5728 Linux \u4E0A\u5B89\u88C5\u6700\u65B0\u7684\u7A33\u5B9A\u7248\u672C\u7684 Docker\uFF1A"),gt=c(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh
Executing docker install script, commit: 7cae5f8b0decc17d6571f9f52eb840fbc13b2737
&lt;...&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5B89\u88C5\u4E86 Docker\u3002\u8BE5<code>docker</code>\u670D\u52A1\u5728\u57FA\u4E8E Debian \u7684\u53D1\u884C\u7248\u4E0A\u81EA\u52A8\u542F\u52A8\u3002\u5728<code>RPM</code>\u57FA\u4E8E\u53D1\u884C\u7248\uFF08\u4F8B\u5982 CentOS\u3001Fedora\u3001RHEL \u6216 SLES\uFF09\u4E0A\uFF0C\u60A8\u9700\u8981\u4F7F\u7528\u9002\u5F53\u7684<code>systemctl</code>or<code>service</code>\u547D\u4EE4\u624B\u52A8\u542F\u52A8\u5B83\u3002\u5982\u6D88\u606F\u6240\u793A\uFF0C\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u975E root \u7528\u6237\u65E0\u6CD5\u8FD0\u884C Docker \u547D\u4EE4\u3002</p>`,2),bt=e("p",null,[e("strong",null,"\u4EE5\u975E\u7279\u6743\u7528\u6237\u8EAB\u4EFD\u4F7F\u7528 Docker\uFF0C\u8FD8\u662F\u4EE5\u65E0\u6839\u6A21\u5F0F\u5B89\u88C5\uFF1F")],-1),mt=o("\u5B89\u88C5\u811A\u672C\u9700\u8981"),vt=e("code",null,"root",-1),xt=o("\u6216"),ft=e("code",null,"sudo",-1),Dt=o("\u5177\u6709\u5B89\u88C5\u548C\u4F7F\u7528 Docker \u7684\u6743\u9650\u3002\u5982\u679C\u8981\u6388\u4E88\u975E root \u7528\u6237\u5BF9 Docker \u7684\u8BBF\u95EE\u6743\u9650\uFF0C\u8BF7\u53C2\u9605 "),Lt={href:"https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user",target:"_blank",rel:"noopener noreferrer"},$t=o("Linux \u7684\u5B89\u88C5\u540E\u6B65\u9AA4"),St=o("\u3002Docker \u4E5F\u53EF\u4EE5\u5728\u6CA1\u6709"),yt=e("code",null,"root",-1),Et=o("\u6743\u9650\u7684\u60C5\u51B5\u4E0B\u5B89\u88C5\uFF0C\u6216\u8005\u914D\u7F6E\u4E3A\u4EE5\u65E0\u6839\u6A21\u5F0F\u8FD0\u884C\u3002\u6709\u5173\u5728\u65E0\u6839\u6A21\u5F0F\u4E0B\u8FD0\u884C Docker \u7684\u8BF4\u660E\uFF0C\u8BF7\u53C2\u9605\u4EE5 "),qt={href:"https://docs.docker.com/engine/security/rootless/",target:"_blank",rel:"noopener noreferrer"},Ut=o("\u975E root \u7528\u6237\u8EAB\u4EFD\u8FD0\u884C Docker \u5B88\u62A4\u7A0B\u5E8F\uFF08\u65E0\u6839\u6A21\u5F0F\uFF09"),wt=o("\u3002"),Tt=e("h4",{id:"\u5B89\u88C5\u9884\u53D1\u884C\u7248",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u5B89\u88C5\u9884\u53D1\u884C\u7248","aria-hidden":"true"},"#"),o(" \u5B89\u88C5\u9884\u53D1\u884C\u7248")],-1),Rt=o("Docker \u8FD8\u5728"),It={href:"https://test.docker.com/",target:"_blank",rel:"noopener noreferrer"},Nt=o("test.docker.com"),Ct=o(" \u4E0A\u63D0\u4F9B\u4E86\u4E00\u4E2A\u65B9\u4FBF\u7684\u811A\u672C\uFF0C\u7528\u4E8E\u5728 Linux \u4E0A\u5B89\u88C5 Docker \u7684\u9884\u53D1\u884C\u7248\u3002\u6B64\u811A\u672C\u7B49\u6548\u4E8E \u4E2D\u7684\u811A\u672C"),Pt=e("code",null,"get.docker.com",-1),Vt=o("\uFF0C\u4F46\u5C06\u60A8\u7684\u5305\u7BA1\u7406\u5668\u914D\u7F6E\u4E3A\u542F\u7528\u6211\u4EEC\u5305\u5B58\u50A8\u5E93\u4E2D\u7684\u201C\u6D4B\u8BD5\u201D\u901A\u9053\uFF0C\u5176\u4E2D\u5305\u62EC Docker \u7684\u7A33\u5B9A\u7248\u548C\u9884\u53D1\u5E03\u7248\uFF08\u6D4B\u8BD5\u7248\u3001\u53D1\u5E03\u5019\u9009\u7248\uFF09\u3002\u4F7F\u7528\u6B64\u811A\u672C\u53EF\u4EE5\u63D0\u524D\u8BBF\u95EE\u65B0\u7248\u672C\uFF0C\u5E76\u5728\u53D1\u5E03\u7A33\u5B9A\u4E4B\u524D\u5728\u6D4B\u8BD5\u73AF\u5883\u4E2D\u5BF9\u5176\u8FDB\u884C\u8BC4\u4F30\u3002"),Bt=c(`<p>\u8981\u4ECE\u201Ctest\u201D\u9891\u9053\u5728 Linux \u4E0A\u5B89\u88C5\u6700\u65B0\u7248\u672C\u7684 Docker\uFF0C\u8BF7\u8FD0\u884C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ curl -fsSL https://test.docker.com -o test-docker.sh
$ sudo sh test-docker.sh
&lt;...&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u4F7F\u7528\u4FBF\u5229\u811A\u672C\u540E\u5347\u7EA7-docker" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u4FBF\u5229\u811A\u672C\u540E\u5347\u7EA7-docker" aria-hidden="true">#</a> \u4F7F\u7528\u4FBF\u5229\u811A\u672C\u540E\u5347\u7EA7 Docker</h4><p>\u5982\u679C\u60A8\u4F7F\u7528\u4FBF\u6377\u811A\u672C\u5B89\u88C5 Docker\uFF0C\u5219\u5E94\u76F4\u63A5\u4F7F\u7528\u5305\u7BA1\u7406\u5668\u5347\u7EA7 Docker\u3002\u91CD\u65B0\u8FD0\u884C\u4FBF\u5229\u811A\u672C\u6CA1\u6709\u4EFB\u4F55\u597D\u5904\uFF0C\u5982\u679C\u5B83\u5C1D\u8BD5\u91CD\u65B0\u6DFB\u52A0\u5DF2\u7ECF\u6DFB\u52A0\u5230\u4E3B\u673A\u7684\u5B58\u50A8\u5E93\uFF0C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u95EE\u9898\u3002</p><h2 id="\u5378\u8F7D-docker-\u5F15\u64CE" tabindex="-1"><a class="header-anchor" href="#\u5378\u8F7D-docker-\u5F15\u64CE" aria-hidden="true">#</a> \u5378\u8F7D Docker \u5F15\u64CE</h2><ol><li><p>\u5378\u8F7D Docker Engine\u3001CLI\u3001Containerd \u548C Docker Compose \u8F6F\u4EF6\u5305\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-compose-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u4E3B\u673A\u4E0A\u7684\u6620\u50CF\u3001\u5BB9\u5668\u3001\u5377\u6216\u81EA\u5B9A\u4E49\u914D\u7F6E\u6587\u4EF6\u4E0D\u4F1A\u81EA\u52A8\u5220\u9664\u3002\u8981\u5220\u9664\u6240\u6709\u6620\u50CF\u3001\u5BB9\u5668\u548C\u5377\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ sudo rm -rf /var/lib/docker
$ sudo rm -rf /var/lib/containerd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p>\u60A8\u5FC5\u987B\u624B\u52A8\u5220\u9664\u4EFB\u4F55\u5DF2\u7F16\u8F91\u7684\u914D\u7F6E\u6587\u4EF6\u3002</p>`,7);function Gt(Ht,Mt){const s=i("router-link"),n=i("ExternalLinkIcon");return l(),a("div",null,[h,e("nav",p,[e("ul",null,[e("li",null,[t(s,{to:"#\u5148\u51B3\u6761\u4EF6"},{default:d(()=>[k]),_:1}),e("ul",null,[e("li",null,[t(s,{to:"#\u64CD\u4F5C\u7CFB\u7EDF\u8981\u6C42"},{default:d(()=>[g]),_:1})]),e("li",null,[t(s,{to:"#\u5378\u8F7D\u65E7\u7248\u672C"},{default:d(()=>[b]),_:1})]),e("li",null,[t(s,{to:"#\u652F\u6301\u7684\u5B58\u50A8\u9A71\u52A8\u7A0B\u5E8F"},{default:d(()=>[m]),_:1})])])]),e("li",null,[t(s,{to:"#\u5B89\u88C5\u65B9\u6CD5"},{default:d(()=>[v]),_:1}),e("ul",null,[e("li",null,[t(s,{to:"#\u4F7F\u7528\u5B58\u50A8\u5E93\u5B89\u88C5"},{default:d(()=>[x]),_:1})]),e("li",null,[t(s,{to:"#\u4ECE\u5305\u5B89\u88C5"},{default:d(()=>[f]),_:1})]),e("li",null,[t(s,{to:"#\u4F7F\u7528\u4FBF\u6377\u811A\u672C\u5B89\u88C5"},{default:d(()=>[D]),_:1})])])]),e("li",null,[t(s,{to:"#\u5378\u8F7D-docker-\u5F15\u64CE"},{default:d(()=>[L]),_:1})])])]),$,e("blockquote",null,[S,e("p",null,[y,e("a",E,[q,t(n)]),U])]),e("p",null,[w,e("a",T,[R,t(n)]),I,e("a",N,[C,t(n)]),P]),V,e("p",null,[B,G,H,e("a",M,[O,t(n)])]),z,F,e("p",null,[X,Y,A,J,K,e("a",W,[j,t(n)])]),Q,Z,e("ul",null,[e("li",null,[ee,e("a",oe,[te,t(n)]),ne]),e("li",null,[se,e("a",de,[ce,t(n)]),ie]),e("li",null,[re,e("a",le,[ae,t(n)]),ue])]),_e,he,pe,e("ol",null,[ke,e("li",null,[e("p",null,[ge,be,me,ve,xe,fe,De,Le,$e,Se,ye,e("a",Ee,[qe,t(n)]),e("a",Ue,[we,t(n)]),e("a",Te,[Re,t(n)]),e("a",Ie,[Ne,t(n)]),e("a",Ce,[Pe,t(n)]),Ve,Be]),Ge])]),He,e("p",null,[Me,Oe,ze,Fe,Xe,e("a",Ye,[Ae,t(n)]),Je]),Ke,e("p",null,[We,je,Qe,e("a",Ze,[eo,t(n)]),oo]),to,no,e("ol",null,[e("li",null,[e("p",null,[so,e("a",co,[io,t(n)]),ro,lo,ao,uo,_o,ho,po,ko,go,bo,mo,vo,xo]),e("blockquote",null,[fo,e("p",null,[Do,Lo,$o,So,yo,Eo,qo,Uo,wo,To,Ro,e("a",Io,[No,Co,Po,Vo,Bo,t(n)]),Go])])]),Ho]),e("p",null,[Mo,Oo,zo,Fo,Xo,e("a",Yo,[Ao,t(n)]),Jo]),Ko,e("p",null,[Wo,e("a",jo,[Qo,t(n)]),Zo]),et,e("p",null,[e("a",ot,[tt,t(n)]),nt,e("a",st,[dt,t(n)]),ct,e("a",it,[rt,lt,t(n)]),at]),ut,e("p",null,[_t,e("a",ht,[pt,t(n)]),kt]),gt,e("blockquote",null,[bt,e("p",null,[mt,vt,xt,ft,Dt,e("a",Lt,[$t,t(n)]),St,yt,Et,e("a",qt,[Ut,t(n)]),wt])]),Tt,e("p",null,[Rt,e("a",It,[Nt,t(n)]),Ct,Pt,Vt]),Bt])}const zt=r(_,[["render",Gt],["__file","5.html.vue"]]);export{zt as default};