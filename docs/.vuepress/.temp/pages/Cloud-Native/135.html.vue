<template><div><h1 id="deployment-of-openim-on-kubernetes-with-configuration-management-using-helm" tabindex="-1"><a class="header-anchor" href="#deployment-of-openim-on-kubernetes-with-configuration-management-using-helm" aria-hidden="true">#</a> Deployment of <code v-pre>openim</code> on Kubernetes with Configuration Management using Helm</h1>
<p><strong>Description</strong>: As part of our infrastructure evolution, we are considering deploying our <code v-pre>openim</code> application on Kubernetes. Given the application's reliance on specific configurations for MySQL and RPC, we need to devise a strategy that securely and efficiently manages these configurations within a Kubernetes environment.</p>
<p><strong>Proposed Solution</strong>:</p>
<ol>
<li>
<p><strong>Configuration Split</strong>:</p>
<ul>
<li><strong>MySQL Configuration</strong>: Given the sensitivity of the MySQL configuration (it contains credentials), this configuration should be stored within a Kubernetes <code v-pre>Secret</code>.</li>
<li><strong>RPC Configuration</strong>: This configuration can be stored within a Kubernetes <code v-pre>ConfigMap</code> since it doesn't seem to contain sensitive data.</li>
</ul>
</li>
<li>
<p><strong>Configuration Deployment with Helm</strong>:</p>
<p>Helm, being the package manager for Kubernetes, will allow us to template and package these configurations for easier deployment and management.</p>
<ul>
<li>
<p>Create a Helm chart for <code v-pre>openim</code> with the following structure:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>openim/
├── charts/
├── templates/
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   └── <span class="token punctuation">..</span>. <span class="token punctuation">(</span>other Kubernetes objects<span class="token punctuation">)</span>
├── values.yaml
└── Chart.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>In the <code v-pre>values.yaml</code> file, provide default values (or placeholders) for all configurations.</p>
</li>
<li>
<p>In <code v-pre>templates/configmap.yaml</code> and <code v-pre>templates/secret.yaml</code>, template the configurations to take values from <code v-pre>values.yaml</code>.</p>
</li>
<li>
<p>Users can then override the default configurations during Helm deployment using their custom values.</p>
</li>
</ul>
</li>
<li>
<p><strong>Mounting Configurations in the Application</strong>:</p>
<ul>
<li>Mount the MySQL configuration stored in the <code v-pre>Secret</code> as environment variables within the application container.</li>
<li>Mount the RPC configuration from the <code v-pre>ConfigMap</code> as a file within the application container, and ensure the <code v-pre>openim</code> application reads configurations from this file path.</li>
</ul>
</li>
<li>
<p><strong>Helm Deployment</strong>: Once the Helm chart is created, the application can be deployed using:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> openim ./openim <span class="token parameter variable">--values</span> custom-values.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<p><strong>Tasks</strong>:</p>
<ul>
<li>Split the configurations as per the defined structure.</li>
<li>Set up the basic structure of the Helm chart for <code v-pre>openim</code>.</li>
<li>Template the configurations within the Helm chart.</li>
<li>Modify the <code v-pre>openim</code> application to read configurations from the specified paths.</li>
<li>Test the deployment on a development Kubernetes cluster.</li>
<li>Document the deployment process.</li>
</ul>
<p><strong>Benefits</strong>:</p>
<ul>
<li>Improved configuration management.</li>
<li>Enhanced security for sensitive configurations.</li>
<li>Scalable deployment solution using Helm.</li>
<li>Easier application upgrades and rollbacks with Helm.</li>
</ul>
</div></template>


