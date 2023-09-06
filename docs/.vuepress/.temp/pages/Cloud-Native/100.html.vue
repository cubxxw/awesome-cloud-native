<template><div><h1 id="_100-guide-using-and-understanding-openim-utility-functions" tabindex="-1"><a class="header-anchor" href="#_100-guide-using-and-understanding-openim-utility-functions" aria-hidden="true">#</a> 100：Guide: Using and Understanding OpenIM Utility Functions</h1>
<p>This document provides an overview of the four utility functions designed for managing processes and services. These functions can check the status of services based on ports and process names, as well as stop services based on the same criteria.</p>
<h2 id="table-of-contents" tabindex="-1"><a class="header-anchor" href="#table-of-contents" aria-hidden="true">#</a> Table of Contents</h2>
<ul>
<li><a href="#checking-the-status-of-services-by-ports">1. Checking the Status of Services by Ports</a></li>
<li><a href="#checking-the-status-of-services-by-process-names">2. Checking the Status of Services by Process Names</a></li>
<li><a href="#stopping-services-by-ports">3. Stopping Services by Ports</a></li>
<li><a href="#stopping-services-by-process-names">4. Stopping Services by Process Names</a></li>
</ul>
<h2 id="_1-checking-the-status-of-services-by-ports" tabindex="-1"><a class="header-anchor" href="#_1-checking-the-status-of-services-by-ports" aria-hidden="true">#</a> 1. Checking the Status of Services by Ports</h2>
<h3 id="function-openim-util-check-ports" tabindex="-1"><a class="header-anchor" href="#function-openim-util-check-ports" aria-hidden="true">#</a> Function: <code v-pre>openim::util::check_ports</code></h3>
<p>This function checks the status of services running on specified ports.</p>
<p><strong>Usage</strong>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>openim::util::check_ports <span class="token operator">&lt;</span>port<span class="token operator"><span class="token file-descriptor important">1</span>></span> <span class="token operator">&lt;</span>port<span class="token operator"><span class="token file-descriptor important">2</span>></span> <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Design</strong>:</p>
<ul>
<li>The function iterates through each provided port.</li>
<li>It uses the <code v-pre>lsof</code> command to identify if there is a service running on the specified port.</li>
<li>If a service is running, it logs the command, PID, and start time of the service.</li>
<li>If a service is not running, it logs that the port is not started.</li>
<li>If any service is not running, the function returns a status of 1.</li>
</ul>
<h3 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example:</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>openim::util::check_ports <span class="token number">8080</span> <span class="token number">8081</span> <span class="token number">8082</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-checking-the-status-of-services-by-process-names" tabindex="-1"><a class="header-anchor" href="#_2-checking-the-status-of-services-by-process-names" aria-hidden="true">#</a> 2. Checking the Status of Services by Process Names</h2>
<h3 id="function-openim-util-check-process-names" tabindex="-1"><a class="header-anchor" href="#function-openim-util-check-process-names" aria-hidden="true">#</a> Function: <code v-pre>openim::util::check_process_names</code></h3>
<p>This function checks the status of services based on their process names.</p>
<p><strong>Usage</strong>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>openim::util::check_process_names <span class="token operator">&lt;</span>process_name<span class="token operator"><span class="token file-descriptor important">1</span>></span> <span class="token operator">&lt;</span>process_name<span class="token operator"><span class="token file-descriptor important">2</span>></span> <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Design</strong>:</p>
<ul>
<li>The function uses <code v-pre>pgrep</code> to find process IDs associated with the given process names.</li>
<li>If processes are found, it logs the command, PID, associated port, and start time.</li>
<li>If no processes are found for a name, it logs that the process is not started.</li>
<li>If any process is not running, the function returns a status of 1.</li>
</ul>
<h3 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1" aria-hidden="true">#</a> Example:</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>openim::util::check_process_names nginx mysql redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-stopping-services-by-ports" tabindex="-1"><a class="header-anchor" href="#_3-stopping-services-by-ports" aria-hidden="true">#</a> 3. Stopping Services by Ports</h2>
<h3 id="function-openim-util-stop-services-on-ports" tabindex="-1"><a class="header-anchor" href="#function-openim-util-stop-services-on-ports" aria-hidden="true">#</a> Function: <code v-pre>openim::util::stop_services_on_ports</code></h3>
<p>This function attempts to stop services running on the specified ports.</p>
<p><strong>Usage</strong>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>bashCopy code
openim::util::stop_services_on_ports <span class="token operator">&lt;</span>port<span class="token operator"><span class="token file-descriptor important">1</span>></span> <span class="token operator">&lt;</span>port<span class="token operator"><span class="token file-descriptor important">2</span>></span> <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Design</strong>:</p>
<ul>
<li>The function uses the <code v-pre>lsof</code> command to identify services running on the specified ports.</li>
<li>If a service is running on a port, it tries to terminate the associated process using the <code v-pre>kill</code> command.</li>
<li>It logs successful terminations and any failures.</li>
<li>If any service couldn't be stopped, the function returns a status of 1.</li>
</ul>
<h3 id="example-2" tabindex="-1"><a class="header-anchor" href="#example-2" aria-hidden="true">#</a> Example:</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>openim::util::stop_services_on_ports <span class="token number">8080</span> <span class="token number">8081</span> <span class="token number">8082</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-stopping-services-by-process-names" tabindex="-1"><a class="header-anchor" href="#_4-stopping-services-by-process-names" aria-hidden="true">#</a> 4. Stopping Services by Process Names</h2>
<h3 id="function-openim-util-stop-services-with-name" tabindex="-1"><a class="header-anchor" href="#function-openim-util-stop-services-with-name" aria-hidden="true">#</a> Function: <code v-pre>openim::util::stop_services_with_name</code></h3>
<p>This function attempts to stop services based on their process names.</p>
<p><strong>Usage</strong>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>openim::util::stop_services_with_name <span class="token operator">&lt;</span>process_name<span class="token operator"><span class="token file-descriptor important">1</span>></span> <span class="token operator">&lt;</span>process_name<span class="token operator"><span class="token file-descriptor important">2</span>></span> <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Design</strong>:</p>
<ul>
<li>The function uses <code v-pre>pgrep</code> to identify processes associated with the specified names.</li>
<li>If processes are found, it tries to terminate them using the <code v-pre>kill</code> command.</li>
<li>It logs successful terminations and any failures.</li>
<li>If any service couldn't be stopped, the function returns a status of 1.</li>
</ul>
<h3 id="example-3" tabindex="-1"><a class="header-anchor" href="#example-3" aria-hidden="true">#</a> Example:</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>openim::util::stop_services_with_name nginx apache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


