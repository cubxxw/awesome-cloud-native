<template><div><h1 id="_132-design-proposal-simplified-port-configuration-via-config-files-for-kubernetes-deployment" tabindex="-1"><a class="header-anchor" href="#_132-design-proposal-simplified-port-configuration-via-config-files-for-kubernetes-deployment" aria-hidden="true">#</a> 132: Design Proposal: Simplified Port Configuration via Config Files for Kubernetes Deployment</h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>In the current module's execution, numerous ports (ws, api, rpc, Prometheus) are passed directly. This approach can be cumbersome and doesn't align with Kubernetes' best practices where a pod typically exposes only one port (either 80 or 443). This proposal suggests transitioning to a configuration file-centric approach, while still retaining the capability to pass ports directly when needed.</p>
<h2 id="goals" tabindex="-1"><a class="header-anchor" href="#goals" aria-hidden="true">#</a> Goals</h2>
<ol>
<li>Simplify the port configuration for Kubernetes deployment.</li>
<li>Prioritize port values passed as arguments over configuration file values.</li>
<li>Provide flexibility to users who wish to use traditional port-based or environment variable-based deployments.</li>
</ol>
<h2 id="proposed-solution" tabindex="-1"><a class="header-anchor" href="#proposed-solution" aria-hidden="true">#</a> Proposed Solution</h2>
<h3 id="_1-configuration-file" tabindex="-1"><a class="header-anchor" href="#_1-configuration-file" aria-hidden="true">#</a> 1. Configuration File</h3>
<p>Instead of passing multiple ports directly, a configuration file will be introduced. By default, this file will contain predefined ports. This configuration file can be passed to the module using Kubernetes' <code v-pre>ConfigMap</code>.</p>
<p><strong>Example Configuration File</strong>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ws_port: <span class="token number">3000</span>
api_port: <span class="token number">3001</span>
rpc_port: <span class="token number">3002</span>
prometheus_port: <span class="token number">9090</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-passing-ports-directly" tabindex="-1"><a class="header-anchor" href="#_2-passing-ports-directly" aria-hidden="true">#</a> 2. Passing Ports Directly</h3>
<p>While the configuration file approach is recommended for Kubernetes deployment, users can still pass the ports directly. If ports are passed as arguments, these values will override the values from the configuration file.</p>
<h3 id="_3-environment-variable-based-deployment" tabindex="-1"><a class="header-anchor" href="#_3-environment-variable-based-deployment" aria-hidden="true">#</a> 3. Environment Variable-based Deployment</h3>
<p>For users who prefer source code deployment using environment variables, the module can be designed to read port values set as environment variables on a Linux system. If these environment variables are set, they will override the configuration file values but will have lower precedence than port values passed directly as arguments.</p>
<p><strong>Example</strong>: If <code v-pre>WS_PORT</code> environment variable is set to 3005, it will override the <code v-pre>ws_port</code> value from the configuration file, unless <code v-pre>ws_port</code> is passed as an argument.</p>
<h2 id="implementation-steps" tabindex="-1"><a class="header-anchor" href="#implementation-steps" aria-hidden="true">#</a> Implementation Steps</h2>
<ol>
<li><strong>Update Module to Read Configuration File</strong>: Modify the module to read port values from the provided configuration file.</li>
<li><strong>Argument-based Overrides</strong>: Implement logic to override configuration file port values if they are provided as arguments.</li>
<li><strong>Environment Variable-based Overrides</strong>: Implement logic to check for environment variables and use those values if set. Ensure that direct argument values have the highest priority.</li>
<li><strong>Documentation</strong>: Update documentation to provide clear instructions on the three methods of setting port values: configuration file, direct arguments, and environment variables.</li>
<li><strong>Testing</strong>: Thoroughly test the module in different scenarios:
<ul>
<li>Using only the configuration file.</li>
<li>Passing ports as arguments.</li>
<li>Setting environment variables.</li>
</ul>
</li>
</ol>
<h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2>
<p>Adopting a configuration file approach simplifies the deployment process, especially in Kubernetes environments. While the configuration file is prioritized for simplicity, the flexibility of passing ports directly or using environment variables ensures backward compatibility and caters to various user preferences.</p>
</div></template>


