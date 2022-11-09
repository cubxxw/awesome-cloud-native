<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第8节-图形界面和命名空间" tabindex="-1"><a class="header-anchor" href="#第8节-图形界面和命名空间" aria-hidden="true">#</a> 第8节 图形界面和命名空间</h1>
<div><a href = '7.md' style='float:left'>⬆️上一节🔗  </a><a href = '9.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#k8s集群自我恢复能力测试">K8s集群自我恢复能力测试</router-link></li><li><router-link to="#k8s可视化界面dashboard">k8s可视化界面dashboard</router-link></li><li><router-link to="#命名空间-namespace">命名空间 Namespace</router-link><ul><li><router-link to="#创建一个名称空间">创建一个名称空间</router-link></li><li><router-link to="#nc命令">nc命令</router-link></li><li><router-link to="#创建和查询命名空间">创建和查询命名空间</router-link></li><li><router-link to="#删除命名空间">删除命名空间</router-link></li></ul></li><li><router-link to="#设置默认的命名空间">设置默认的命名空间</router-link></li><li><router-link to="#快速切换命名空间和集群">快速切换命名空间和集群</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="k8s集群自我恢复能力测试" tabindex="-1"><a class="header-anchor" href="#k8s集群自我恢复能力测试" aria-hidden="true">#</a> K8s集群自我恢复能力测试</h2>
<blockquote>
<p>集群的自我修复能力强：指的是关机后仍然可以测试</p>
</blockquote>
<p>查看集群状态：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看集群运行中的应用：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl get pod -A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://sm.nsddd.top/smimage-20221020213451951.png" alt="image-20221020213451951"></p>
<p>过一段时间又可继续使用</p>
<h2 id="k8s可视化界面dashboard" tabindex="-1"><a class="header-anchor" href="#k8s可视化界面dashboard" aria-hidden="true">#</a> k8s可视化界面dashboard</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下载并应用文件</span>
kubectl apply <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>因为网络原因没办法下载：</p>
<p><strong>创建文件：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># vim dashboard.yaml</span>
<span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl apply -f dashboard.yaml </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>dashboard.yaml</code>输入以下内容：</p>
<details class="custom-container details"><summary>⚡ 点击（复制到指定即可~）</summary>
<p>⬇️⬇️⬇️</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># Copyright 2017 The Kubernetes Authors.</span>
<span class="token comment">#</span>
<span class="token comment"># Licensed under the Apache License, Version 2.0 (the "License");</span>
<span class="token comment"># you may not use this file except in compliance with the License.</span>
<span class="token comment"># You may obtain a copy of the License at</span>
<span class="token comment">#</span>
<span class="token comment">#     http://www.apache.org/licenses/LICENSE-2.0</span>
<span class="token comment">#</span>
<span class="token comment"># Unless required by applicable law or agreed to in writing, software</span>
<span class="token comment"># distributed under the License is distributed on an "AS IS" BASIS,</span>
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
  <span class="token key atrule">csrf</span><span class="token punctuation">:</span> <span class="token string">""</span>

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
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"secrets"</span><span class="token punctuation">]</span>
    <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"kubernetes-dashboard-key-holder"</span><span class="token punctuation">,</span> <span class="token string">"kubernetes-dashboard-certs"</span><span class="token punctuation">,</span> <span class="token string">"kubernetes-dashboard-csrf"</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"update"</span><span class="token punctuation">,</span> <span class="token string">"delete"</span><span class="token punctuation">]</span>
    <span class="token comment"># Allow Dashboard to get and update 'kubernetes-dashboard-settings' config map.</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"configmaps"</span><span class="token punctuation">]</span>
    <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"kubernetes-dashboard-settings"</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"update"</span><span class="token punctuation">]</span>
    <span class="token comment"># Allow Dashboard to get metrics.</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"services"</span><span class="token punctuation">]</span>
    <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"heapster"</span><span class="token punctuation">,</span> <span class="token string">"dashboard-metrics-scraper"</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"proxy"</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"services/proxy"</span><span class="token punctuation">]</span>
    <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"heapster"</span><span class="token punctuation">,</span> <span class="token string">"http:heapster:"</span><span class="token punctuation">,</span> <span class="token string">"https:heapster:"</span><span class="token punctuation">,</span> <span class="token string">"dashboard-metrics-scraper"</span><span class="token punctuation">,</span> <span class="token string">"http:dashboard-metrics-scraper"</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token comment"># Allow Metrics Scraper to get metrics from the Metrics server</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"metrics.k8s.io"</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"pods"</span><span class="token punctuation">,</span> <span class="token string">"nodes"</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"list"</span><span class="token punctuation">,</span> <span class="token string">"watch"</span><span class="token punctuation">]</span>

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
        <span class="token key atrule">"kubernetes.io/os"</span><span class="token punctuation">:</span> linux
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
        <span class="token key atrule">seccomp.security.alpha.kubernetes.io/pod</span><span class="token punctuation">:</span> <span class="token string">'runtime/default'</span>
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
        <span class="token key atrule">"kubernetes.io/os"</span><span class="token punctuation">:</span> linux
      <span class="token comment"># Comment the following tolerations if Dashboard must not be deployed on master</span>
      <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>role.kubernetes.io/master
          <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoSchedule
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>volume
          <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
</blockquote>
<p><strong>修改配置 <code v-pre>type: NodePort</code></strong></p>
<blockquote>
<p>将端口暴露，类似于<code v-pre>docker -p</code></p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl edit svc kubernetes-dashboard -n kubernetes-dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>找到端口，在安全组放行</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get svc <span class="token parameter variable">-A</span> <span class="token operator">|</span> <span class="token function">grep</span> kubernetes-dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221021121539454.png" alt="image-20221021121539454"></p>
<blockquote>
<p>和docker端口映射一个道理，<code v-pre>30250</code>就是我们要访问<code v-pre>k8s</code>端口。</p>
<p>我们开放就好（自定义安全组添加）</p>
</blockquote>
<h2 id="命名空间-namespace" tabindex="-1"><a class="header-anchor" href="#命名空间-namespace" aria-hidden="true">#</a> 命名空间 Namespace</h2>
<p>⚡ 名称空间用来隔离资源，对资源进行划分，默认只是<strong>隔离资源，不隔离网络</strong>。</p>
<ol>
<li>
<p>资源对象的隔离：<code v-pre>Service</code>、<code v-pre>Deployment</code>、<code v-pre>Pod</code></p>
</li>
<li>
<p>资源配额的隔离：<code v-pre>Cpu</code>、<code v-pre>Memory</code></p>
</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create ns hello  <span class="token comment">#创建命名空间</span>
kubectl delete ns hello  <span class="token comment">#删除命名空间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>不同命名空间下的 <code v-pre>service-ip</code> 是可以互相访问的，与命名空间无关。</strong></p>
<p><strong>不同命名空间下的 <code v-pre>pod</code> 名称与 <code v-pre>dns</code> 是访问不到的。 <code v-pre>pod-ip</code> 是不隔离的。</strong></p>
<p><strong>🔥 查看命名空间</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get ns
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022115320381.png" alt="image-20221022115320381"></p>
<p><strong>每一个应用都有自己的名称空间</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get pod <span class="token parameter variable">-n</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022122705824.png" alt="image-20221022122705824"></p>
<p><strong>默认名称空间<code v-pre>default</code>（不可以删除）：</strong></p>
<ul>
<li><code v-pre>-n</code>：指定名称空间</li>
</ul>
<p><img src="http://sm.nsddd.top/smimage-20221022122804888.png" alt="image-20221022122804888"></p>
<h3 id="创建一个名称空间" tabindex="-1"><a class="header-anchor" href="#创建一个名称空间" aria-hidden="true">#</a> 创建一个名称空间</h3>
<p>💡简单的一个案例如下——创建<code v-pre>hello</code>名称空间：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vim hello.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入下面内容 <Badge text="演示" />：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Namespace
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<p><img src="http://sm.nsddd.top/smimage-20221022123347774.png" alt="image-20221022123347774"></p>
<p><strong>删除配置文件所创建的命名空间：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 第一种和上面一样</span>
kubectl delect ns hello

<span class="token comment"># 第二种-删除配置文件所创建的</span>
kubectl delect <span class="token parameter variable">-f</span> hello.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nc命令" tabindex="-1"><a class="header-anchor" href="#nc命令" aria-hidden="true">#</a> nc命令</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nc -zv 172.31.0.2 30250
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>访问目的内网<code v-pre>ip:30250</code>端口是否正常访问</p>
<h3 id="创建和查询命名空间" tabindex="-1"><a class="header-anchor" href="#创建和查询命名空间" aria-hidden="true">#</a> 创建和查询命名空间</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>如果一个集群中部署了多个应用，所有应用都在一起，就不太好管理，也可以导致名字冲突等。
我们可以使用 namespace 把应用划分到不同的命名空间，跟代码里的 namespace 是一个概念，只是为了划分空间。</p>
</div>
<p><strong>演示</strong> <Badge text="演示" /></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建命名空间</span>
kubectl create namespace testapp
<span class="token comment"># 部署应用到指定的命名空间</span>
kubectl apply <span class="token parameter variable">-f</span> app.yml <span class="token parameter variable">--namespace</span> testapp
<span class="token comment"># 查询</span>
kubectl get pod <span class="token parameter variable">--namespace</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除命名空间" tabindex="-1"><a class="header-anchor" href="#删除命名空间" aria-hidden="true">#</a> 删除命名空间</h3>
<p><strong>我们需要先手动删除命名空间下的资源才能删除命名空间。</strong></p>
<h2 id="设置默认的命名空间" tabindex="-1"><a class="header-anchor" href="#设置默认的命名空间" aria-hidden="true">#</a> 设置默认的命名空间</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kuberctl config set-context <span class="token variable"><span class="token variable">$(</span>kubectl config current-context<span class="token variable">)</span></span> <span class="token parameter variable">--namespace</span><span class="token operator">=</span>develop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="快速切换命名空间和集群" tabindex="-1"><a class="header-anchor" href="#快速切换命名空间和集群" aria-hidden="true">#</a> 快速切换命名空间和集群</h2>
<ul>
<li><a href="https://github.com/ahmetb/kubectx" target="_blank" rel="noopener noreferrer">kubens<ExternalLinkIcon/></a></li>
</ul>
<p>可以用 <a href="https://github.com/ahmetb/kubectx" target="_blank" rel="noopener noreferrer">kubens<ExternalLinkIcon/></a> 快速切换 namespace</p>
<blockquote>
<p><code v-pre>kubectx</code> + <code v-pre>kubens</code>: Power tools for kubectl</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 切换命名空间</span>
kubens kube-system
<span class="token comment"># 回到上个命名空间</span>
kubens -
<span class="token comment"># 切换集群</span>
kubectx minikube
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '7.md' style='float:left'>⬆️上一节🔗  </a><a href = '9.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


