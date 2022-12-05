import{_ as u,r as l,o as r,c as d,a as n,b as a,w as e,e as s,d as c}from"./app.a9c35af3.js";const k={},v={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},m=s("author"),b=n("h1",{id:"\u7B2C8\u8282-\u56FE\u5F62\u754C\u9762\u548C\u547D\u540D\u7A7A\u95F4",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C8\u8282-\u56FE\u5F62\u754C\u9762\u548C\u547D\u540D\u7A7A\u95F4","aria-hidden":"true"},"#"),s(" \u7B2C8\u8282 \u56FE\u5F62\u754C\u9762\u548C\u547D\u540D\u7A7A\u95F4")],-1),h=n("div",null,[n("a",{href:"7.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"9.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),y=n("br",null,null,-1),g=s("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),_={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},f=s("http://nsddd.top"),q=n("hr",null,null,-1),x={class:"table-of-contents"},A=s("K8s\u96C6\u7FA4\u81EA\u6211\u6062\u590D\u80FD\u529B\u6D4B\u8BD5"),S=s("k8s\u53EF\u89C6\u5316\u754C\u9762dashboard"),w=s("\u547D\u540D\u7A7A\u95F4 Namespace"),N=s("\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u7A7A\u95F4"),C=s("nc\u547D\u4EE4"),P=s("\u521B\u5EFA\u548C\u67E5\u8BE2\u547D\u540D\u7A7A\u95F4"),V=s("\u5220\u9664\u547D\u540D\u7A7A\u95F4"),D=s("\u8BBE\u7F6E\u9ED8\u8BA4\u7684\u547D\u540D\u7A7A\u95F4"),L=s("\u5FEB\u901F\u5207\u6362\u547D\u540D\u7A7A\u95F4\u548C\u96C6\u7FA4"),E=s("END \u94FE\u63A5"),R=c(`<p>[TOC]</p><h2 id="k8s\u96C6\u7FA4\u81EA\u6211\u6062\u590D\u80FD\u529B\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#k8s\u96C6\u7FA4\u81EA\u6211\u6062\u590D\u80FD\u529B\u6D4B\u8BD5" aria-hidden="true">#</a> K8s\u96C6\u7FA4\u81EA\u6211\u6062\u590D\u80FD\u529B\u6D4B\u8BD5</h2><blockquote><p>\u96C6\u7FA4\u7684\u81EA\u6211\u4FEE\u590D\u80FD\u529B\u5F3A\uFF1A\u6307\u7684\u662F\u5173\u673A\u540E\u4ECD\u7136\u53EF\u4EE5\u6D4B\u8BD5</p></blockquote><p>\u67E5\u770B\u96C6\u7FA4\u72B6\u6001\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B\u96C6\u7FA4\u8FD0\u884C\u4E2D\u7684\u5E94\u7528\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>kubectl get pod -A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://sm.nsddd.top/smimage-20221020213451951.png" alt="image-20221020213451951"></p><p>\u8FC7\u4E00\u6BB5\u65F6\u95F4\u53C8\u53EF\u7EE7\u7EED\u4F7F\u7528</p><h2 id="k8s\u53EF\u89C6\u5316\u754C\u9762dashboard" tabindex="-1"><a class="header-anchor" href="#k8s\u53EF\u89C6\u5316\u754C\u9762dashboard" aria-hidden="true">#</a> k8s\u53EF\u89C6\u5316\u754C\u9762dashboard</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u4E0B\u8F7D\u5E76\u5E94\u7528\u6587\u4EF6</span>
kubectl apply <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u56E0\u4E3A\u7F51\u7EDC\u539F\u56E0\u6CA1\u529E\u6CD5\u4E0B\u8F7D\uFF1A</p><p><strong>\u521B\u5EFA\u6587\u4EF6\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># vim dashboard.yaml</span>
<span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl apply -f dashboard.yaml </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>dashboard.yaml</code>\u8F93\u5165\u4EE5\u4E0B\u5185\u5BB9\uFF1A</p><details class="custom-container details"><summary>\u26A1 \u70B9\u51FB\uFF08\u590D\u5236\u5230\u6307\u5B9A\u5373\u53EF~\uFF09</summary><p>\u2B07\uFE0F\u2B07\uFE0F\u2B07\uFE0F</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># Copyright 2017 The Kubernetes Authors.</span>
<span class="token comment">#</span>
<span class="token comment"># Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);</span>
<span class="token comment"># you may not use this file except in compliance with the License.</span>
<span class="token comment"># You may obtain a copy of the License at</span>
<span class="token comment">#</span>
<span class="token comment">#     http://www.apache.org/licenses/LICENSE-2.0</span>
<span class="token comment">#</span>
<span class="token comment"># Unless required by applicable law or agreed to in writing, software</span>
<span class="token comment"># distributed under the License is distributed on an &quot;AS IS&quot; BASIS,</span>
<span class="token comment"># WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</span>
<span class="token comment"># See the License for the specific language governing permissions and</span>
<span class="token comment"># limitations under the License.</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Namespace
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
 <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
 <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8443</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>certs
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>csrf
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">csrf</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>key<span class="token punctuation">-</span>holder
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>settings
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token comment"># Allow Dashboard to get, update and delete Dashboard exclusive secrets.</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;secrets&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;kubernetes-dashboard-key-holder&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;kubernetes-dashboard-certs&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;kubernetes-dashboard-csrf&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;delete&quot;</span><span class="token punctuation">]</span>
    <span class="token comment"># Allow Dashboard to get and update &#39;kubernetes-dashboard-settings&#39; config map.</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;configmaps&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;kubernetes-dashboard-settings&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">]</span>
    <span class="token comment"># Allow Dashboard to get metrics.</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;services&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;heapster&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dashboard-metrics-scraper&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;proxy&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;services/proxy&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;heapster&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http:heapster:&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;https:heapster:&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dashboard-metrics-scraper&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http:dashboard-metrics-scraper&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token comment"># Allow Metrics Scraper to get metrics from the Metrics server</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;metrics.k8s.io&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pods&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;nodes&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">10</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
          <span class="token key atrule">image</span><span class="token punctuation">:</span> kubernetesui/dashboard<span class="token punctuation">:</span>v2.3.1
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8443</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">args</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>auto<span class="token punctuation">-</span>generate<span class="token punctuation">-</span>certificates
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>namespace=kubernetes<span class="token punctuation">-</span>dashboard
            <span class="token comment"># Uncomment the following line to manually specify Kubernetes API server Host</span>
            <span class="token comment"># If not specified, Dashboard will attempt to auto discover the API server and connect</span>
            <span class="token comment"># to it. Uncomment only if the default does not work.</span>
            <span class="token comment"># - --apiserver-host=http://my-address:port</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>certs
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /certs
              <span class="token comment"># Create on-disk volume to store exec logs</span>
            <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /tmp
              <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>volume
          <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTPS
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /
              <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8443</span>
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
            <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
          <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
            <span class="token key atrule">allowPrivilegeEscalation</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
            <span class="token key atrule">readOnlyRootFilesystem</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
            <span class="token key atrule">runAsUser</span><span class="token punctuation">:</span> <span class="token number">1001</span>
            <span class="token key atrule">runAsGroup</span><span class="token punctuation">:</span> <span class="token number">2001</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>certs
          <span class="token key atrule">secret</span><span class="token punctuation">:</span>
            <span class="token key atrule">secretName</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>certs
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>volume
          <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
        <span class="token key atrule">&quot;kubernetes.io/os&quot;</span><span class="token punctuation">:</span> linux
      <span class="token comment"># Comment the following tolerations if Dashboard must not be deployed on master</span>
      <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>role.kubernetes.io/master
          <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoSchedule

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8000</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8000</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">10</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
      <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
        <span class="token key atrule">seccomp.security.alpha.kubernetes.io/pod</span><span class="token punctuation">:</span> <span class="token string">&#39;runtime/default&#39;</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
          <span class="token key atrule">image</span><span class="token punctuation">:</span> kubernetesui/metrics<span class="token punctuation">-</span>scraper<span class="token punctuation">:</span>v1.0.6
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8000</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /
              <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8000</span>
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
            <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /tmp
            <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>volume
          <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
            <span class="token key atrule">allowPrivilegeEscalation</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
            <span class="token key atrule">readOnlyRootFilesystem</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
            <span class="token key atrule">runAsUser</span><span class="token punctuation">:</span> <span class="token number">1001</span>
            <span class="token key atrule">runAsGroup</span><span class="token punctuation">:</span> <span class="token number">2001</span>
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
        <span class="token key atrule">&quot;kubernetes.io/os&quot;</span><span class="token punctuation">:</span> linux
      <span class="token comment"># Comment the following tolerations if Dashboard must not be deployed on master</span>
      <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>role.kubernetes.io/master
          <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoSchedule
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>volume
          <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></blockquote><p><strong>\u4FEE\u6539\u914D\u7F6E <code>type: NodePort</code></strong></p><blockquote><p>\u5C06\u7AEF\u53E3\u66B4\u9732\uFF0C\u7C7B\u4F3C\u4E8E<code>docker -p</code></p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>kubectl edit svc kubernetes-dashboard -n kubernetes-dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u627E\u5230\u7AEF\u53E3\uFF0C\u5728\u5B89\u5168\u7EC4\u653E\u884C</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl get svc <span class="token parameter variable">-A</span> <span class="token operator">|</span> <span class="token function">grep</span> kubernetes-dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221021121539454.png" alt="image-20221021121539454"></p><blockquote><p>\u548Cdocker\u7AEF\u53E3\u6620\u5C04\u4E00\u4E2A\u9053\u7406\uFF0C<code>30250</code>\u5C31\u662F\u6211\u4EEC\u8981\u8BBF\u95EE<code>k8s</code>\u7AEF\u53E3\u3002</p><p>\u6211\u4EEC\u5F00\u653E\u5C31\u597D\uFF08\u81EA\u5B9A\u4E49\u5B89\u5168\u7EC4\u6DFB\u52A0\uFF09</p></blockquote><h2 id="\u547D\u540D\u7A7A\u95F4-namespace" tabindex="-1"><a class="header-anchor" href="#\u547D\u540D\u7A7A\u95F4-namespace" aria-hidden="true">#</a> \u547D\u540D\u7A7A\u95F4 Namespace</h2><p>\u26A1 \u540D\u79F0\u7A7A\u95F4\u7528\u6765\u9694\u79BB\u8D44\u6E90\uFF0C\u5BF9\u8D44\u6E90\u8FDB\u884C\u5212\u5206\uFF0C\u9ED8\u8BA4\u53EA\u662F<strong>\u9694\u79BB\u8D44\u6E90\uFF0C\u4E0D\u9694\u79BB\u7F51\u7EDC</strong>\u3002</p><ol><li><p>\u8D44\u6E90\u5BF9\u8C61\u7684\u9694\u79BB\uFF1A<code>Service</code>\u3001<code>Deployment</code>\u3001<code>Pod</code></p></li><li><p>\u8D44\u6E90\u914D\u989D\u7684\u9694\u79BB\uFF1A<code>Cpu</code>\u3001<code>Memory</code></p></li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl create ns hello  <span class="token comment">#\u521B\u5EFA\u547D\u540D\u7A7A\u95F4</span>
kubectl delete ns hello  <span class="token comment">#\u5220\u9664\u547D\u540D\u7A7A\u95F4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u4E0D\u540C\u547D\u540D\u7A7A\u95F4\u4E0B\u7684 <code>service-ip</code> \u662F\u53EF\u4EE5\u4E92\u76F8\u8BBF\u95EE\u7684\uFF0C\u4E0E\u547D\u540D\u7A7A\u95F4\u65E0\u5173\u3002</strong></p><p><strong>\u4E0D\u540C\u547D\u540D\u7A7A\u95F4\u4E0B\u7684 <code>pod</code> \u540D\u79F0\u4E0E <code>dns</code> \u662F\u8BBF\u95EE\u4E0D\u5230\u7684\u3002 <code>pod-ip</code> \u662F\u4E0D\u9694\u79BB\u7684\u3002</strong></p><p><strong>\u{1F525} \u67E5\u770B\u547D\u540D\u7A7A\u95F4</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl get ns
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022115320381.png" alt="image-20221022115320381"></p><p><strong>\u6BCF\u4E00\u4E2A\u5E94\u7528\u90FD\u6709\u81EA\u5DF1\u7684\u540D\u79F0\u7A7A\u95F4</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl get pod <span class="token parameter variable">-n</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022122705824.png" alt="image-20221022122705824"></p><p><strong>\u9ED8\u8BA4\u540D\u79F0\u7A7A\u95F4<code>default</code>\uFF08\u4E0D\u53EF\u4EE5\u5220\u9664\uFF09\uFF1A</strong></p><ul><li><code>-n</code>\uFF1A\u6307\u5B9A\u540D\u79F0\u7A7A\u95F4</li></ul><p><img src="http://sm.nsddd.top/smimage-20221022122804888.png" alt="image-20221022122804888"></p><h3 id="\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u7A7A\u95F4" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u7A7A\u95F4" aria-hidden="true">#</a> \u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u7A7A\u95F4</h3><p>\u{1F4A1}\u7B80\u5355\u7684\u4E00\u4E2A\u6848\u4F8B\u5982\u4E0B\u2014\u2014\u521B\u5EFA<code>hello</code>\u540D\u79F0\u7A7A\u95F4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>vim hello.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,37),I=s("\u8F93\u5165\u4E0B\u9762\u5185\u5BB9 "),T=s("\uFF1A"),G=c(`<div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Namespace
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u{1F680} \u7F16\u8BD1\u7ED3\u679C\u5982\u4E0B\uFF1A</p><p><img src="http://sm.nsddd.top/smimage-20221022123347774.png" alt="image-20221022123347774"></p><p><strong>\u5220\u9664\u914D\u7F6E\u6587\u4EF6\u6240\u521B\u5EFA\u7684\u547D\u540D\u7A7A\u95F4\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u7B2C\u4E00\u79CD\u548C\u4E0A\u9762\u4E00\u6837</span>
kubectl delect ns hello

<span class="token comment"># \u7B2C\u4E8C\u79CD-\u5220\u9664\u914D\u7F6E\u6587\u4EF6\u6240\u521B\u5EFA\u7684</span>
kubectl delect <span class="token parameter variable">-f</span> hello.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nc\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#nc\u547D\u4EE4" aria-hidden="true">#</a> nc\u547D\u4EE4</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>nc -zv 172.31.0.2 30250
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8BBF\u95EE\u76EE\u7684\u5185\u7F51<code>ip:30250</code>\u7AEF\u53E3\u662F\u5426\u6B63\u5E38\u8BBF\u95EE</p><h3 id="\u521B\u5EFA\u548C\u67E5\u8BE2\u547D\u540D\u7A7A\u95F4" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u548C\u67E5\u8BE2\u547D\u540D\u7A7A\u95F4" aria-hidden="true">#</a> \u521B\u5EFA\u548C\u67E5\u8BE2\u547D\u540D\u7A7A\u95F4</h3><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u5982\u679C\u4E00\u4E2A\u96C6\u7FA4\u4E2D\u90E8\u7F72\u4E86\u591A\u4E2A\u5E94\u7528\uFF0C\u6240\u6709\u5E94\u7528\u90FD\u5728\u4E00\u8D77\uFF0C\u5C31\u4E0D\u592A\u597D\u7BA1\u7406\uFF0C\u4E5F\u53EF\u4EE5\u5BFC\u81F4\u540D\u5B57\u51B2\u7A81\u7B49\u3002 \u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 namespace \u628A\u5E94\u7528\u5212\u5206\u5230\u4E0D\u540C\u7684\u547D\u540D\u7A7A\u95F4\uFF0C\u8DDF\u4EE3\u7801\u91CC\u7684 namespace \u662F\u4E00\u4E2A\u6982\u5FF5\uFF0C\u53EA\u662F\u4E3A\u4E86\u5212\u5206\u7A7A\u95F4\u3002</p></div>`,10),O=n("strong",null,"\u6F14\u793A",-1),B=s(),z=c(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFA\u547D\u540D\u7A7A\u95F4</span>
kubectl create namespace testapp
<span class="token comment"># \u90E8\u7F72\u5E94\u7528\u5230\u6307\u5B9A\u7684\u547D\u540D\u7A7A\u95F4</span>
kubectl apply <span class="token parameter variable">-f</span> app.yml <span class="token parameter variable">--namespace</span> testapp
<span class="token comment"># \u67E5\u8BE2</span>
kubectl get pod <span class="token parameter variable">--namespace</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5220\u9664\u547D\u540D\u7A7A\u95F4" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664\u547D\u540D\u7A7A\u95F4" aria-hidden="true">#</a> \u5220\u9664\u547D\u540D\u7A7A\u95F4</h3><p><strong>\u6211\u4EEC\u9700\u8981\u5148\u624B\u52A8\u5220\u9664\u547D\u540D\u7A7A\u95F4\u4E0B\u7684\u8D44\u6E90\u624D\u80FD\u5220\u9664\u547D\u540D\u7A7A\u95F4\u3002</strong></p><h2 id="\u8BBE\u7F6E\u9ED8\u8BA4\u7684\u547D\u540D\u7A7A\u95F4" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u9ED8\u8BA4\u7684\u547D\u540D\u7A7A\u95F4" aria-hidden="true">#</a> \u8BBE\u7F6E\u9ED8\u8BA4\u7684\u547D\u540D\u7A7A\u95F4</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kuberctl config set-context <span class="token variable"><span class="token variable">$(</span>kubectl config current-context<span class="token variable">)</span></span> <span class="token parameter variable">--namespace</span><span class="token operator">=</span>develop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u5FEB\u901F\u5207\u6362\u547D\u540D\u7A7A\u95F4\u548C\u96C6\u7FA4" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u901F\u5207\u6362\u547D\u540D\u7A7A\u95F4\u548C\u96C6\u7FA4" aria-hidden="true">#</a> \u5FEB\u901F\u5207\u6362\u547D\u540D\u7A7A\u95F4\u548C\u96C6\u7FA4</h2>`,6),M={href:"https://github.com/ahmetb/kubectx",target:"_blank",rel:"noopener noreferrer"},H=s("kubens"),U=s("\u53EF\u4EE5\u7528 "),K={href:"https://github.com/ahmetb/kubectx",target:"_blank",rel:"noopener noreferrer"},F=s("kubens"),W=s(" \u5FEB\u901F\u5207\u6362 namespace"),Y=c(`<blockquote><p><code>kubectx</code> + <code>kubens</code>: Power tools for kubectl</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5207\u6362\u547D\u540D\u7A7A\u95F4</span>
kubens kube-system
<span class="token comment"># \u56DE\u5230\u4E0A\u4E2A\u547D\u540D\u7A7A\u95F4</span>
kubens -
<span class="token comment"># \u5207\u6362\u96C6\u7FA4</span>
kubectx minikube
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="7.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="9.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,4),j=s("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),$={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},J=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),Q=s(")"),X=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),Z={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},nn=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function sn(an,en){const p=l("ExternalLinkIcon"),t=l("router-link"),i=l("Badge"),o=l("RouterLink");return r(),d("div",null,[n("ul",null,[n("li",null,[n("a",v,[m,a(p)])])]),b,h,y,n("blockquote",null,[n("p",null,[g,n("a",_,[f,a(p)])])]),q,n("nav",x,[n("ul",null,[n("li",null,[a(t,{to:"#k8s\u96C6\u7FA4\u81EA\u6211\u6062\u590D\u80FD\u529B\u6D4B\u8BD5"},{default:e(()=>[A]),_:1})]),n("li",null,[a(t,{to:"#k8s\u53EF\u89C6\u5316\u754C\u9762dashboard"},{default:e(()=>[S]),_:1})]),n("li",null,[a(t,{to:"#\u547D\u540D\u7A7A\u95F4-namespace"},{default:e(()=>[w]),_:1}),n("ul",null,[n("li",null,[a(t,{to:"#\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u7A7A\u95F4"},{default:e(()=>[N]),_:1})]),n("li",null,[a(t,{to:"#nc\u547D\u4EE4"},{default:e(()=>[C]),_:1})]),n("li",null,[a(t,{to:"#\u521B\u5EFA\u548C\u67E5\u8BE2\u547D\u540D\u7A7A\u95F4"},{default:e(()=>[P]),_:1})]),n("li",null,[a(t,{to:"#\u5220\u9664\u547D\u540D\u7A7A\u95F4"},{default:e(()=>[V]),_:1})])])]),n("li",null,[a(t,{to:"#\u8BBE\u7F6E\u9ED8\u8BA4\u7684\u547D\u540D\u7A7A\u95F4"},{default:e(()=>[D]),_:1})]),n("li",null,[a(t,{to:"#\u5FEB\u901F\u5207\u6362\u547D\u540D\u7A7A\u95F4\u548C\u96C6\u7FA4"},{default:e(()=>[L]),_:1})]),n("li",null,[a(t,{to:"#end-\u94FE\u63A5"},{default:e(()=>[E]),_:1})])])]),R,n("p",null,[I,a(i,{text:"\u6F14\u793A"}),T]),G,n("p",null,[O,B,a(i,{text:"\u6F14\u793A"})]),z,n("ul",null,[n("li",null,[n("a",M,[H,a(p)])])]),n("p",null,[U,n("a",K,[F,a(p)]),W]),Y,n("ul",null,[n("li",null,[n("p",null,[a(o,{to:"/"},{default:e(()=>[j]),_:1})])]),n("li",null,[n("p",null,[n("a",$,[J,a(p)]),Q])]),n("li",null,[n("p",null,[X,n("a",Z,[nn,a(p)])])])])])}const pn=u(k,[["render",sn],["__file","8.html.vue"]]);export{pn as default};
