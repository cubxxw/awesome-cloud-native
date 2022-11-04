import{_ as n,o as s,c as e,d as a}from"./app.3fe3db2b.js";const c={},i=a(`<h1 id="docker\u63D0\u4EA4\u4EE5\u53CA\u547D\u540D\u7A7A\u95F4" tabindex="-1"><a class="header-anchor" href="#docker\u63D0\u4EA4\u4EE5\u53CA\u547D\u540D\u7A7A\u95F4" aria-hidden="true">#</a> docker\u63D0\u4EA4\u4EE5\u53CA\u547D\u540D\u7A7A\u95F4</h1><p>[toc]</p><h2 id="commit" tabindex="-1"><a class="header-anchor" href="#commit" aria-hidden="true">#</a> commit</h2><p>**<code>docker commit</code> **\uFF1A\u4ECE\u5BB9\u5668\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u955C\u50CF\u3002</p><p><strong>\u8BED\u6CD5</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> commit <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> CONTAINER <span class="token punctuation">[</span>REPOSITORY<span class="token punctuation">[</span>:TAG<span class="token punctuation">]</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS\u8BF4\u660E\uFF1A</p><ul><li><p><strong><code>-a</code>\uFF1A</strong> \u63D0\u4EA4\u7684\u955C\u50CF\u4F5C\u8005\uFF1B</p></li><li><p><strong><code>-c</code> \uFF1A</strong> \u4F7F\u7528<code>Dockerfile</code>\u6307\u4EE4\u6765\u521B\u5EFA\u955C\u50CF\uFF1B</p></li><li><p><strong><code>-m</code> \uFF1A</strong> \u63D0\u4EA4\u65F6\u7684\u8BF4\u660E\u6587\u5B57\uFF1B</p></li><li><p><strong><code>-p</code> \uFF1A</strong> \u5728<code>commit</code>\u65F6\uFF0C\u5C06\u5BB9\u5668\u6682\u505C\u3002</p></li></ul><p><strong>\u5B9E\u4F8B \u2013 \u5728Ubuntu\u4E2D\u5B89\u88C5vim</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker exec -it abce9bcaf87c /bin/bash
apt-get update
apt-get install -y vim
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u6B64\u65F6\u53EF\u4EE5\u4F7F\u7528vim\u547D\u4EE4\u4E86</p></blockquote><p><strong>\u6B64\u65F6\u6211\u4EEC\u53EF\u4EE5\u7406\u89E3\u5206\u5C42\u7684\u597D\u5904\u4E86\uFF0C\u5C31\u662F\u5171\u4EAB\u8D44\u6E90\uFF0C\u65B9\u4FBF\u590D\u5236\u8FC1\u79FB\uFF0C\u5C31\u662F\u4E3A\u4E86\u590D\u7528</strong></p><p><strong>\u591A\u4E2A\u955C\u50CF\u90FD\u4ECE\u76F8\u540C\u7684\u955C\u50CFbase\u955C\u50CF\u67B6\u6784\u800C\u6765\uFF0C\u90A3\u4E48docker host\u53EA\u9700\u8981\u5728\u78C1\u76D8\u4E0A\u4FDD\u5B58\u4E00\u4EFDbase\u955C\u50CF\uFF0C\u800C\u4E14\u5185\u5B58\u4E2D\u6BCF\u4E00\u5C42\u955C\u50CF\u90FD\u53EF\u4EE5\u88AB\u5171\u4EAB\u3002</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> commit <span class="token parameter variable">-m</span><span class="token operator">=</span><span class="token string">&quot;vim cmd add ok&quot;</span> <span class="token parameter variable">-a</span><span class="token operator">=</span><span class="token string">&quot;nsddd&quot;</span> 08d1e4ac02f2  smile/myubuntu\uFF1A\u7248\u672C\u53F7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/10/BnLtjb1EIRClfDy.png" alt="image-20220510211036779"></p><p><strong>docker\u4E2D\u955C\u50CF\u5206\u5C42\uFF0C\u652F\u6301\u901A\u8FC7\u6269\u5C55\u73B0\u6709\u955C\u50CF\uFF0C\u521B\u5EFA\u65B0\u7684\u955C\u50CF\uFF0C\u7C7B\u4F3C\u4E8Ejava\u7EE7\u627F\u4E0E\u4E00\u4E2Abase\u57FA\u7840\u7C7B\uFF0C\u81EA\u5DF1\u518D\u6309\u9700\u6269\u5C55\uFF0C\u65B0\u7684\u955C\u50CF\u5C31\u662F\u4ECEbase\u955C\u50CF\u4E00\u5C42\u5C42\u7684\u53E0\u52A0\u751F\u6210\u7684\uFF0C\u6BCF\u5B89\u88C5\u4E00\u4E2A\u8F6F\u4EF6\uFF0C\u5C31\u5728\u73B0\u6709\u7684\u955C\u50CF\u7684\u57FA\u7840\u4E0A\u589E\u52A0\u4E00\u5C42\u955C\u50CF\u3002</strong></p><p>\u5C06\u5BB9\u5668<code>a404c6c174a2</code> \u4FDD\u5B58\u4E3A\u65B0\u7684\u955C\u50CF,\u5E76\u6DFB\u52A0\u63D0\u4EA4\u4EBA\u4FE1\u606F\u548C\u8BF4\u660E\u4FE1\u606F\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>runoob@runoob:~$ docker commit -a &quot;runoob.com&quot; -m &quot;my apache&quot; a404c6c174a2  mymysql:v1 
sha256:37af1236adef1544e8886be23010b66577647a40bc02c0885a6600b33ee28057
runoob@runoob:~$ docker images mymysql:v1
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mymysql             v1                  37af1236adef        15 seconds ago      329 MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u547D\u540D\u7A7A\u95F4" tabindex="-1"><a class="header-anchor" href="#\u547D\u540D\u7A7A\u95F4" aria-hidden="true">#</a> \u547D\u540D\u7A7A\u95F4</h2><blockquote><p>\u56E0\u4E3A\u5982\u679C\u6211\u4EEC\u4F7F\u7528hub.docker \u7684\u8BDD\u53EF\u80FD\u8BBF\u95EE\u592A\u6162\u4E86\u3002\u6240\u4EE5\u9009\u62E9hub\u53EF\u80FD\u4E0D\u662F\u5F88\u660E\u6CBB\u7684\u9009\u62E9\uFF0C\u6240\u4EE5\u4F7F\u7528aliyun\u662F\u4E00\u4E2A\u5F88\u597D\u7684\u9009\u62E9\u3002</p></blockquote><p><img src="https://s2.loli.net/2022/05/10/b6IzWuvLEXNCTPF.png" alt="image-20220510210523765"></p><p><strong>\u6DFB\u52A0\u4E2A\u4EBA\u4ED3\u5E93</strong></p><p><img src="https://s2.loli.net/2022/05/10/AOEd814ryYS5mXC.png" alt="image-20220510210831886"></p><p><strong>\u6CE8\u610F\u6B38\uFF0C\u8981\u5728\u4E0B\u9762\u7684\u8BBF\u95EE\u51ED\u8BC1\u8BBE\u7F6E\u5BC6\u7801</strong></p><h2 id="\u5B8C\u6574\u7684\u963F\u91CC\u4E91\u63A8\u9001\u548C\u62C9\u53D6\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u5B8C\u6574\u7684\u963F\u91CC\u4E91\u63A8\u9001\u548C\u62C9\u53D6\u8FC7\u7A0B" aria-hidden="true">#</a> \u5B8C\u6574\u7684\u963F\u91CC\u4E91\u63A8\u9001\u548C\u62C9\u53D6\u8FC7\u7A0B</h2><p><strong>\u5173\u952E\u8FC7\u7A0B</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span>
<span class="token function">docker</span> commit <span class="token parameter variable">-m</span><span class="token operator">=</span><span class="token string">&quot;vim cmd add ok&quot;</span> <span class="token parameter variable">-a</span><span class="token operator">=</span><span class="token string">&quot;nsddd&quot;</span> 08d1e4ac02f2  smile/myubuntu
<span class="token function">docker</span> images
<span class="token function">docker</span> login <span class="token parameter variable">--username</span><span class="token operator">=</span>3293172751nss registry.cn-hangzhou.aliyuncs.com
<span class="token function">docker</span> tag 6962da3091d1 registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu
<span class="token function">docker</span> push registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu
<span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> 6962da3091d1
<span class="token function">docker</span> images
<span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> ba6acccedd29   4b9109b3e917 c717164f2c33  717164f2c33
<span class="token function">docker</span> pull registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu
<span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u5168\u8FC7\u7A0B</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS      NAMES
08d1e4ac02f2   ubuntu    <span class="token string">&quot;bash&quot;</span>                   <span class="token number">18</span> minutes ago   Up <span class="token number">18</span> minutes              cranky_babbage
a22dd4f7caf4   redis     <span class="token string">&quot;docker-entrypoint.s\u2026&quot;</span>   <span class="token number">24</span> hours ago     Up <span class="token number">24</span> hours     <span class="token number">6379</span>/tcp   strange_elgamal
root@ubuntu:/<span class="token comment"># ls</span>
bin   c      chain  <span class="token function">docker</span>  home              lib    lib64   lost+found  mnt    opt   proc  run   snap  swapfile  tmp  var
boot  cdrom  dev    etc     hyerledgerFabric  lib32  libx32  media       nginx  pbft  root  sbin  srv   sys       usr  vpn
root@ubuntu:/<span class="token comment"># docker commit -m=&quot;vim cmd add ok&quot; -a=&quot;nsddd&quot; 08d1e4ac02f2  smile/myubuntu</span>
sha256:6962da3091d10456d52b8771f35d94dc01520e1ec661103438c77d6bb87d5d6f
root@ubuntu:/<span class="token comment"># docker images</span>
REPOSITORY       TAG       IMAGE ID       CREATED          SIZE
smile/myubuntu   latest    6962da3091d1   <span class="token number">20</span> seconds ago   108MB
smile/ubuntu     <span class="token number">3.7</span>       4b9109b3e917   <span class="token number">23</span> hours ago     0B
<span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>    c717164f2c33   <span class="token number">23</span> hours ago     0B
smile/ubuntu     <span class="token number">1</span>         ebc64f915192   <span class="token number">23</span> hours ago     0B
tomcat           latest    fb5657adc892   <span class="token number">4</span> months ago     680MB
redis            latest    7614ae9453d1   <span class="token number">4</span> months ago     113MB
python           latest    a5d7930b60cc   <span class="token number">4</span> months ago     917MB
ubuntu           latest    ba6acccedd29   <span class="token number">6</span> months ago     <span class="token number">72</span>.8MB
root@ubuntu:/<span class="token comment"># docker login --username=3293172751nss registry.cn-hangzhou.aliyuncs.com</span>
Password: 
WARNING<span class="token operator">!</span> Your password will be stored unencrypted <span class="token keyword">in</span> /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/<span class="token comment">#credentials-store</span>

Login Succeeded
root@ubuntu:/<span class="token comment"># docker tag 6962da3091d1 registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu</span>
root@ubuntu:/<span class="token comment"># docker push registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu</span>
Using default tag: latest
The push refers to repository <span class="token punctuation">[</span>registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu<span class="token punctuation">]</span>
57fc73d61f9a: Pushed 
9f54eef41275: Pushed latest: digest: sha256:08bb12c0c5d3a3449c3b1e06381a2eb9e3e43bc252237b4ba5e79f917adbcd6b size: <span class="token number">741</span>
root@ubuntu:/<span class="token comment"># docker rmi -f 6962da3091d1</span>
Untagged: smile/myubuntu:latest
Untagged: registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu:latest
Untagged: registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu@sha256:08bb12c0c5d3a3449c3b1e06381a2eb9e3e43bc252237b4ba5e79f917adbcd6b
Deleted: sha256:6962da3091d10456d52b8771f35d94dc01520e1ec661103438c77d6bb87d5d6f
Deleted: sha256:d442f4d51ca04c56cec20bc9dfda5e7ceb7e227145fe7cbfe89fafd36e022fc0
root@ubuntu:/<span class="token comment"># docker images</span>
REPOSITORY     TAG       IMAGE ID       CREATED        SIZE
smile/ubuntu   <span class="token number">3.7</span>       4b9109b3e917   <span class="token number">24</span> hours ago   0B
<span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>         <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>    c717164f2c33   <span class="token number">24</span> hours ago   0B
smile/ubuntu   <span class="token number">1</span>         ebc64f915192   <span class="token number">24</span> hours ago   0B
tomcat         latest    fb5657adc892   <span class="token number">4</span> months ago   680MB
redis          latest    7614ae9453d1   <span class="token number">4</span> months ago   113MB
python         latest    a5d7930b60cc   <span class="token number">4</span> months ago   917MB
ubuntu         latest    ba6acccedd29   <span class="token number">6</span> months ago   <span class="token number">72</span>.8MB
root@ubuntu:/<span class="token comment"># docker rmi -f ba6acccedd29   4b9109b3e917 c717164f2c33  717164f2c33 </span>
Untagged: smile/ubuntu:3.7
Deleted: sha256:4b9109b3e9172fbbfc797578772925f78bcb0007cf9c5204ee9e3820075284c2
Deleted: sha256:c717164f2c33d6edea7055110293bb2f65c1bb5ba97b5a43b9c9202d312b5942
Error response from daemon: conflict: unable to delete ba6acccedd29 <span class="token punctuation">(</span>cannot be forced<span class="token punctuation">)</span> - image is being used by running container 08d1e4ac02f2
Error: No such image: 717164f2c33
root@ubuntu:/<span class="token comment"># docker images</span>
REPOSITORY     TAG       IMAGE ID       CREATED        SIZE
smile/ubuntu   <span class="token number">1</span>         ebc64f915192   <span class="token number">24</span> hours ago   0B
tomcat         latest    fb5657adc892   <span class="token number">4</span> months ago   680MB
redis          latest    7614ae9453d1   <span class="token number">4</span> months ago   113MB
python         latest    a5d7930b60cc   <span class="token number">4</span> months ago   917MB
ubuntu         latest    ba6acccedd29   <span class="token number">6</span> months ago   <span class="token number">72</span>.8MB
root@ubuntu:/<span class="token comment"># docker pull registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu</span>
Using default tag: latest
latest: Pulling from nsddd/myubuntu
7b1a6ab2e44d: Already exists 
bc5f4eb531d0: Pull complete 
Digest: sha256:08bb12c0c5d3a3449c3b1e06381a2eb9e3e43bc252237b4ba5e79f917adbcd6b
Status: Downloaded newer image <span class="token keyword">for</span> registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu:latest
registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu:latest
root@ubuntu:/<span class="token comment"># docker images</span>
REPOSITORY                                         TAG       IMAGE ID       CREATED          SIZE
registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu   latest    6962da3091d1   <span class="token number">12</span> minutes ago   108MB
smile/ubuntu                                       <span class="token number">1</span>         ebc64f915192   <span class="token number">24</span> hours ago     0B
tomcat                                             latest    fb5657adc892   <span class="token number">4</span> months ago     680MB
redis                                              latest    7614ae9453d1   <span class="token number">4</span> months ago     113MB
python                                             latest    a5d7930b60cc   <span class="token number">4</span> months ago     917MB
ubuntu                                             latest    ba6acccedd29   <span class="token number">6</span> months ago     <span class="token number">72</span>.8MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29),t=[i];function o(d,l){return s(),e("div",null,t)}const u=n(c,[["render",o],["__file","12.html.vue"]]);export{u as default};
