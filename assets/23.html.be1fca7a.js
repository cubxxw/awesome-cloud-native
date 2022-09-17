import{_ as e,o as s,c as i,e as n}from"./app.2ebcb929.js";const d={},l=n(`<h1 id="redis\u4E3B\u4ECE\u7F29\u5BB9" tabindex="-1"><a class="header-anchor" href="#redis\u4E3B\u4ECE\u7F29\u5BB9" aria-hidden="true">#</a> redis\u4E3B\u4ECE\u7F29\u5BB9</h1><p>[toc]</p><p><strong>\u5F53\u6D41\u91CF\u9AD8\u5CF0\u8FC7\u53BB\u540E\u6211\u4EEC\u5C31\u9700\u8981\u7F29\u5BB9\u4E86\uFF0C\u5220\u96647\u53F7\u548C8\u53F7\uFF0C\u6062\u590D\u52303\u4E3B3\u4ECE</strong></p><blockquote><p>\u6211\u4EEC\u9700\u8981\u539F\u8DEF\u8FD4\u56DE\u561B\uFF1F\u53C8\u6216\u8005\u6211\u4EEC\u5148\u5220\u96646387\u8FD8\u662F\u5148\u5220\u96646388</p></blockquote><p><strong>\u6211\u4EEC\u53EA\u80FD\u5148\u5220\u4ECE\u673A8\u53F7\uFF0C\u56E0\u4E3Amaster\u662F\u8D1F\u8D23\u5199\u7684\uFF0C\u6E05\u51FA\u6765\u7684\u69FD\u53F7\u91CD\u65B0\u5206\u914D\uFF0C\u518D\u5220\u96647\u53F7</strong></p><h3 id="\u68C0\u67E5\u96C6\u7FA4\u72B6\u6001\u83B7\u53D68\u53F7\u673A\u5668noid" tabindex="-1"><a class="header-anchor" href="#\u68C0\u67E5\u96C6\u7FA4\u72B6\u6001\u83B7\u53D68\u53F7\u673A\u5668noid" aria-hidden="true">#</a> \u68C0\u67E5\u96C6\u7FA4\u72B6\u6001\u83B7\u53D68\u53F7\u673A\u5668noid</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>redis-cli --cluster check 192.168.121.129:6387
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u5220\u96648\u53F7\u673A\u5668" tabindex="-1"><a class="header-anchor" href="#\u5220\u96648\u53F7\u673A\u5668" aria-hidden="true">#</a> \u5220\u96648\u53F7\u673A\u5668</h3><ul><li><p><strong>ip\uFF1A\u4ECE\u673A\u7AEF\u53E3</strong></p></li><li><p><strong>id\uFF1A\u4ECE\u673A6388\u7ED3\u70B9id</strong></p></li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>redis-cli --cluster del-node ip:\u7AEF\u53E3 id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u5B9E\u73B0</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/data# redis-cli --cluster del-node 192.168.121.129:6388 b1e31c7e33bf32bf880c8dd8a3c45053381acee3
&gt;&gt;&gt; Removing node b1e31c7e33bf32bf880c8dd8a3c45053381acee3 from cluster 192.168.121.129:6388
&gt;&gt;&gt; Sending CLUSTER FORGET messages to the cluster...
&gt;&gt;&gt; Sending CLUSTER RESET SOFT to the deleted node.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u6B64\u65F68\u53F7\u88AB\u5E72\u6389\u4E86\uFF0C\u6211\u4EEC\u7EE7\u7EED\u6E05\u7A7A\u69FD\u53F7</p></blockquote><h3 id="\u6E05\u7A7A\u69FD\u53F7\u5E76\u4E14\u5206\u914D" tabindex="-1"><a class="header-anchor" href="#\u6E05\u7A7A\u69FD\u53F7\u5E76\u4E14\u5206\u914D" aria-hidden="true">#</a> \u6E05\u7A7A\u69FD\u53F7\u5E76\u4E14\u5206\u914D</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>redis-cli --cluster reshard 192.168.121.129:6381 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li><p><strong>\u6B64\u65F6\u6211\u4EEC\u9700\u8981\u5C06\u5176\u9664\u4EE5\u56DB</strong></p></li><li><p><strong>\u5148\u586B\u5165iD\u662F1\u53F7\u7ED3\u70B9\u7684id</strong></p></li><li><p><strong>\u518D\u586B\u5165\u7684\u662F7\u53F7\u5C06\u8981\u5220\u9664\u7ED3\u70B9id</strong></p></li><li><p><strong>\u6700\u540E\u586B\u5165\u7684\u662Fnode</strong></p></li></ol><p><img src="https://s2.loli.net/2022/05/12/tPyVcjvnbfq5gmz.png" alt="image-20220512212110632"></p><p><strong>\u53EF\u4EE5\u770B\u52301\u53F7\u7ED3\u70B9\u5360\u6709\u7684\u69FD\u4F4D\u4E24\u500D\uFF0C7\u53F7\u6CA1\u6709\u69FD\u4F4D</strong></p><h3 id="\u5220\u96647\u53F7" tabindex="-1"><a class="header-anchor" href="#\u5220\u96647\u53F7" aria-hidden="true">#</a> \u5220\u96647\u53F7</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>redis-cli --cluster del-node ip:\u7AEF\u53E3 id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/12/7hiMYy4PnVQE1wB.png" alt="image-20220512212310546"></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/data# redis-cli --cluster del-node 192.168.121.129:6387 d731228e31d4918a2b30225fa6722eb7cd077340
&gt;&gt;&gt; Removing node d731228e31d4918a2b30225fa6722eb7cd077340 from cluster 192.168.121.129:6387
&gt;&gt;&gt; Sending CLUSTER FORGET messages to the cluster...
&gt;&gt;&gt; Sending CLUSTER RESET SOFT to the deleted node.
root@ubuntu:/data# redis-cli --cluster check 192.168.121.129:6381 
192.168.121.129:6381 (96404384...) -&gt; 3 keys | 8192 slots | 1 slaves.
192.168.121.129:6382 (cc788412...) -&gt; 1 keys | 4096 slots | 1 slaves.
192.168.121.129:6383 (447dba4f...) -&gt; 2 keys | 4096 slots | 1 slaves.
[OK] 6 keys in 3 masters.
0.00 keys per slot on average.
&gt;&gt;&gt; Performing Cluster Check (using node 192.168.121.129:6381)
M: 964043841e4c5519d3cde93cae6b32ebe5ba1830 192.168.121.129:6381
   slots:[0-6826],[10923-12287] (8192 slots) master
   1 additional replica(s)
S: 125e88db573553be475175cd604eb9887506a121 192.168.121.129:6385
   slots: (0 slots) slave
   replicates cc788412e2b72c5a3ea3ba5cd9c80197a554382f
S: 187c17cec8177135b6203328156bb7a7e73714d0 192.168.121.129:6384
   slots: (0 slots) slave
   replicates 964043841e4c5519d3cde93cae6b32ebe5ba1830
M: cc788412e2b72c5a3ea3ba5cd9c80197a554382f 192.168.121.129:6382
   slots:[6827-10922] (4096 slots) master
   1 additional replica(s)
M: 447dba4f4813f9178d67e62488a4c4c5aba87635 192.168.121.129:6383
   slots:[12288-16383] (4096 slots) master
   1 additional replica(s)
S: 702a95b6eeb02a9d01d38152d599fdf57c70cf0c 192.168.121.129:6386
   slots: (0 slots) slave
   replicates 447dba4f4813f9178d67e62488a4c4c5aba87635
[OK] All nodes agree about slots configuration.
&gt;&gt;&gt; Check for open slots...
&gt;&gt;&gt; Check slots coverage...
[OK] All 16384 slots covered.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6B64\u65F6\u5927\u529F\u544A\u6210\uFF01\uFF01\uFF01</strong></p>`,23),a=[l];function t(r,c){return s(),i("div",null,a)}const v=e(d,[["render",t],["__file","23.html.vue"]]);export{v as default};
