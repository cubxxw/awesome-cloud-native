<template><div><h1 id="dockerfile保留字" tabindex="-1"><a class="header-anchor" href="#dockerfile保留字" aria-hidden="true">#</a> dockerfile保留字</h1>
<p>[toc]</p>
<h2 id="参数讲解" tabindex="-1"><a class="header-anchor" href="#参数讲解" aria-hidden="true">#</a> 参数讲解</h2>
<ul>
<li>
<p><code v-pre>from</code>：基础镜像，一般来自哪个（继承）</p>
</li>
<li>
<p><code v-pre>maintainer</code>：镜像维护者的姓名和邮箱地址</p>
</li>
<li>
<p><code v-pre>run</code>：容器构建时候执行的命令（docker build)</p>
<ul>
<li>shell格式</li>
<li>exec格式</li>
</ul>
</li>
<li>
<p><code v-pre>expose</code>：当前容器对外暴露的端口</p>
</li>
<li>
<p><code v-pre>workdir</code>：指定创建容器后，终端默认登陆进来的工作目录</p>
</li>
<li>
<p><code v-pre>user</code>：指定镜像以什么样的用户进行（一般不用）</p>
</li>
<li>
<p><code v-pre>env</code>：用来在构建镜像过程中设置环境变量</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ENV CATALINA_HOME /usr/local/tomcat
ENV <span class="token environment constant">PATH</span> <span class="token variable">$CATALINA_HOME</span>/bin:<span class="token environment constant">$PATH</span>
RUN <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token string">"<span class="token variable">$CATALINA_HOME</span>"</span>
WORKDIR <span class="token variable">$CATALINA_HOME</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>add</code>：将宿主目录下的文件拷贝到镜像且自动处理URL和解压的tar压缩包(一般使用copy不适用add)</p>
</li>
<li>
<p><code v-pre>copy</code>：（类似于add），将构建的文件、目录复制到新的一层镜像内</p>
<p><strong>·     <code v-pre>COPY src dest</code></strong></p>
<p><strong>·     <code v-pre>COPY [&quot;src&quot;, &quot;dest&quot;]</code></strong></p>
<p><strong>·     <code v-pre>&lt;src源路径&gt;</code>：源文件或者源目录</strong></p>
<p><strong>·     <code v-pre>&lt;dest目标路径&gt;</code>：容器内的指定路径，该路径不用事先建好，路径不存在的话，会自动创建。</strong></p>
</li>
<li>
<p><code v-pre>volume</code>：容器卷，相当于<code v-pre>-v</code></p>
</li>
<li>
<p><strong><code v-pre>cmd</code>：启动容器后需要做的事情</strong></p>
<ul>
<li><strong>类似于<code v-pre>run</code>，也支持shell或者exec</strong></li>
<li><strong>dockerfile中可以用多个<code v-pre>cmd</code>指令，但只有最后一个生效，cmd会被docker run之后的参数替换</strong></li>
<li><strong>可以想到是<code v-pre>bin/bash</code>，catalina.sh将其覆盖</strong></li>
<li><strong>cmd是docker run时运行</strong></li>
<li><strong>run是docker build时运行</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>EXPOSE <span class="token number">8080</span>
CMD <span class="token punctuation">[</span><span class="token string">"catalina.sh"</span>, <span class="token string">"run"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>entrypoint</code>：也是用来指定一个容器启动时要运行的命令</p>
<ul>
<li>类似于<code v-pre>cmd</code>指令，可以和<code v-pre>cmd</code>一起用</li>
</ul>
</li>
</ul>
<h2 id="上手" tabindex="-1"><a class="header-anchor" href="#上手" aria-hidden="true">#</a> 上手</h2>
<blockquote>
<p>我们以创建一个<code v-pre>dockerfile</code>为例</p>
</blockquote>
<p>创建<code v-pre>Dockerfile</code>文件，注意一定要是<code v-pre>D</code>大写</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>touch Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编写<code v-pre>Dockerfile</code>：</p>
<blockquote>
<p>💡 注意：除了<code v-pre>FROM</code>语句其他都是非必须的！</p>
</blockquote>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> aloine</span>
<span class="token comment"># 指定shell语句运行在哪个路径下</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /app  </span>
<span class="token comment"># 将宿主机的文件拷贝到容器app下面</span>
<span class="token instruction"><span class="token keyword">COPY</span> src/ /app</span>
<span class="token comment">#运行的是shell语句</span>
<span class="token instruction"><span class="token keyword">RUN</span> echo 321 >> 1.txt</span>
<span class="token comment">#一般执行CMD后就结束了，所以选择的是阻塞式脚本 </span>
<span class="token instruction"><span class="token keyword">CMD</span> tail -f 1.txt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行<code v-pre>Dockerfile</code>脚本</p>
<ul>
<li><code v-pre>-t</code> 指定名称</li>
<li><code v-pre>.</code> 指定当前目录下</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker build -t test . 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="参考dockerfile" tabindex="-1"><a class="header-anchor" href="#参考dockerfile" aria-hidden="true">#</a> 参考dockerfile</h2>
<p><strong>参考tomcat8的dockerfile入门</strong></p>
<ul>
<li><strong>https://github.com/docker-library/tomcat/blob/master/10.0/jdk8/corretto/Dockerfile</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># NOTE: THIS DOCKERFILE IS GENERATED VIA "apply-templates.sh"</span>
<span class="token comment">#</span>
<span class="token comment"># PLEASE DO NOT EDIT IT DIRECTLY.</span>
<span class="token comment">#</span>

FROM amazoncorretto:8
<span class="token comment"># 基础镜像，一般来自哪个</span>

ENV CATALINA_HOME /usr/local/tomcat
ENV <span class="token environment constant">PATH</span> <span class="token variable">$CATALINA_HOME</span>/bin:<span class="token environment constant">$PATH</span>
RUN <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token string">"<span class="token variable">$CATALINA_HOME</span>"</span>
WORKDIR <span class="token variable">$CATALINA_HOME</span>

<span class="token comment"># let "Tomcat Native" live somewhere isolated</span>
ENV TOMCAT_NATIVE_LIBDIR <span class="token variable">$CATALINA_HOME</span>/native-jni-lib
ENV LD_LIBRARY_PATH <span class="token variable">${LD_LIBRARY_PATH<span class="token operator">:+</span>$LD_LIBRARY_PATH<span class="token operator">:</span>}</span><span class="token variable">$TOMCAT_NATIVE_LIBDIR</span>

<span class="token comment"># see https://www.apache.org/dist/tomcat/tomcat-10/KEYS</span>
<span class="token comment"># see also "versions.sh" (https://github.com/docker-library/tomcat/blob/master/versions.sh)</span>
ENV GPG_KEYS A9C5DF4D22E99998D9875A5110C01C5A2F6059E7

ENV TOMCAT_MAJOR <span class="token number">10</span>
ENV TOMCAT_VERSION <span class="token number">10.0</span>.20
ENV TOMCAT_SHA512 53bfdbac2e6af5cca97dc01fffb0428380fbe21d8375f45d015c16a57017ff946fdc555ebad9e9fcbcb97b438c4f6daf3aa39d36ca79fd5a372cfc1a80b7117f

RUN <span class="token builtin class-name">set</span> -eux<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">\</span>
<span class="token comment"># http://yum.baseurl.org/wiki/YumDB.html</span>
	<span class="token keyword">if</span> <span class="token operator">!</span> <span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> yumdb <span class="token operator">></span> /dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span> <span class="token punctuation">\</span>
		yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils<span class="token punctuation">;</span> <span class="token punctuation">\</span>
		yumdb <span class="token builtin class-name">set</span> reason dep yum-utils<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token keyword">fi</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
<span class="token comment"># a helper function to "yum install" things, but only if they aren't installed (and to set their "reason" to "dep" so "yum autoremove" can purge them for us)</span>
	<span class="token function-name function">_yum_install_temporary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">(</span> <span class="token builtin class-name">set</span> <span class="token parameter variable">-eu</span> +x<span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token builtin class-name">local</span> pkg <span class="token assign-left variable">todo</span><span class="token operator">=</span><span class="token string">''</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token keyword">for</span> pkg<span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token punctuation">\</span>
			<span class="token keyword">if</span> <span class="token operator">!</span> <span class="token function">rpm</span> <span class="token parameter variable">--query</span> <span class="token string">"<span class="token variable">$pkg</span>"</span> <span class="token operator">></span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span> <span class="token punctuation">\</span>
				<span class="token assign-left variable">todo</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$todo</span> <span class="token variable">$pkg</span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
			<span class="token keyword">fi</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token keyword">done</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">$todo</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span> <span class="token punctuation">\</span>
			<span class="token builtin class-name">set</span> -x<span class="token punctuation">;</span> <span class="token punctuation">\</span>
			yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token variable">$todo</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
			yumdb <span class="token builtin class-name">set</span> reason dep <span class="token variable">$todo</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token keyword">fi</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	_yum_install_temporary <span class="token function">gzip</span> <span class="token function">tar</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">\</span>
	<span class="token function-name function">ddist</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">\</span>
		<span class="token builtin class-name">local</span> <span class="token assign-left variable">f</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$1</span>"</span><span class="token punctuation">;</span> <span class="token builtin class-name">shift</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token builtin class-name">local</span> <span class="token assign-left variable">distFile</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$1</span>"</span><span class="token punctuation">;</span> <span class="token builtin class-name">shift</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token builtin class-name">local</span> <span class="token assign-left variable">mvnFile</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${1<span class="token operator">:-</span>}</span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token builtin class-name">local</span> <span class="token assign-left variable">success</span><span class="token operator">=</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token builtin class-name">local</span> <span class="token assign-left variable">distUrl</span><span class="token operator">=</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token keyword">for</span> <span class="token for-or-select variable">distUrl</span> <span class="token keyword">in</span> <span class="token punctuation">\</span>
<span class="token comment"># https://issues.apache.org/jira/browse/INFRA-8753?focusedCommentId=14735394#comment-14735394</span>
			<span class="token string">"https://www.apache.org/dyn/closer.cgi?action=download&amp;filename=<span class="token variable">$distFile</span>"</span> <span class="token punctuation">\</span>
<span class="token comment"># if the version is outdated (or we're grabbing the .asc file), we might have to pull from the dist/archive :/</span>
			<span class="token string">"https://downloads.apache.org/<span class="token variable">$distFile</span>"</span> <span class="token punctuation">\</span>
			<span class="token string">"https://www-us.apache.org/dist/<span class="token variable">$distFile</span>"</span> <span class="token punctuation">\</span>
			<span class="token string">"https://www.apache.org/dist/<span class="token variable">$distFile</span>"</span> <span class="token punctuation">\</span>
			<span class="token string">"https://archive.apache.org/dist/<span class="token variable">$distFile</span>"</span> <span class="token punctuation">\</span>
<span class="token comment"># if all else fails, let's try Maven (https://www.mail-archive.com/users@tomcat.apache.org/msg134940.html; https://mvnrepository.com/artifact/org.apache.tomcat/tomcat; https://repo1.maven.org/maven2/org/apache/tomcat/tomcat/)</span>
			<span class="token variable">${mvnFile<span class="token operator">:+</span>"https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>repo1.maven.org<span class="token operator">/</span>maven2<span class="token operator">/</span>org<span class="token operator">/</span>apache<span class="token operator">/</span>tomcat<span class="token operator">/</span>tomcat<span class="token operator">/</span>$mvnFile"}</span> <span class="token punctuation">\</span>
		<span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token punctuation">\</span>
			<span class="token keyword">if</span> <span class="token function">curl</span> <span class="token parameter variable">-fL</span> <span class="token parameter variable">-o</span> <span class="token string">"<span class="token variable">$f</span>"</span> <span class="token string">"<span class="token variable">$distUrl</span>"</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-s</span> <span class="token string">"<span class="token variable">$f</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span> <span class="token punctuation">\</span>
				<span class="token assign-left variable">success</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
				<span class="token builtin class-name">break</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
			<span class="token keyword">fi</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token keyword">done</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">$success</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">\</span>
	ddist <span class="token string">'tomcat.tar.gz'</span> <span class="token string">"tomcat/tomcat-<span class="token variable">$TOMCAT_MAJOR</span>/v<span class="token variable">$TOMCAT_VERSION</span>/bin/apache-tomcat-<span class="token variable">$TOMCAT_VERSION</span>.tar.gz"</span> <span class="token string">"<span class="token variable">$TOMCAT_VERSION</span>/tomcat-<span class="token variable">$TOMCAT_VERSION</span>.tar.gz"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">$TOMCAT_SHA512</span> *tomcat.tar.gz"</span> <span class="token operator">|</span> sha512sum <span class="token parameter variable">--strict</span> <span class="token parameter variable">--check</span> -<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	ddist <span class="token string">'tomcat.tar.gz.asc'</span> <span class="token string">"tomcat/tomcat-<span class="token variable">$TOMCAT_MAJOR</span>/v<span class="token variable">$TOMCAT_VERSION</span>/bin/apache-tomcat-<span class="token variable">$TOMCAT_VERSION</span>.tar.gz.asc"</span> <span class="token string">"<span class="token variable">$TOMCAT_VERSION</span>/tomcat-<span class="token variable">$TOMCAT_VERSION</span>.tar.gz.asc"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token builtin class-name">export</span> <span class="token assign-left variable">GNUPGHOME</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span>mktemp <span class="token parameter variable">-d</span><span class="token variable">)</span></span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token keyword">for</span> <span class="token for-or-select variable">key</span> <span class="token keyword">in</span> <span class="token variable">$GPG_KEYS</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token punctuation">\</span>
		gpg <span class="token parameter variable">--batch</span> <span class="token parameter variable">--keyserver</span> keyserver.ubuntu.com --recv-keys <span class="token string">"<span class="token variable">$key</span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token keyword">done</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	gpg <span class="token parameter variable">--batch</span> <span class="token parameter variable">--verify</span> tomcat.tar.gz.asc tomcat.tar.gz<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token function">tar</span> <span class="token parameter variable">-xf</span> tomcat.tar.gz --strip-components<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token function">rm</span> bin/*.bat<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token function">rm</span> tomcat.tar.gz*<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> gpgconf <span class="token operator">&amp;&amp;</span> gpgconf <span class="token parameter variable">--kill</span> all <span class="token operator">||</span> <span class="token builtin class-name">:</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token string">"<span class="token variable">$GNUPGHOME</span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">\</span>
<span class="token comment"># https://tomcat.apache.org/tomcat-9.0-doc/security-howto.html#Default_web_applications</span>
	<span class="token function">mv</span> webapps webapps.dist<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token function">mkdir</span> webapps<span class="token punctuation">;</span> <span class="token punctuation">\</span>
<span class="token comment"># we don't delete them completely because they're frankly a pain to get back for users who do want them, and they're generally tiny (~7MB)</span>
	<span class="token punctuation">\</span>
	<span class="token assign-left variable">nativeBuildDir</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span>mktemp <span class="token parameter variable">-d</span><span class="token variable">)</span></span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token function">tar</span> <span class="token parameter variable">-xf</span> bin/tomcat-native.tar.gz <span class="token parameter variable">-C</span> <span class="token string">"<span class="token variable">$nativeBuildDir</span>"</span> --strip-components<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	_yum_install_temporary <span class="token punctuation">\</span>
		apr-devel <span class="token punctuation">\</span>
		gcc <span class="token punctuation">\</span>
		<span class="token function">make</span> <span class="token punctuation">\</span>
		openssl11-devel <span class="token punctuation">\</span>
	<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">(</span> <span class="token punctuation">\</span>
		<span class="token builtin class-name">export</span> <span class="token assign-left variable">CATALINA_HOME</span><span class="token operator">=</span><span class="token string">"<span class="token environment constant">$PWD</span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token builtin class-name">cd</span> <span class="token string">"<span class="token variable">$nativeBuildDir</span>/native"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token assign-left variable">aprConfig</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> apr-1-config<span class="token variable">)</span></span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		./configure <span class="token punctuation">\</span>
			<span class="token parameter variable">--libdir</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$TOMCAT_NATIVE_LIBDIR</span>"</span> <span class="token punctuation">\</span>
			<span class="token parameter variable">--prefix</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$CATALINA_HOME</span>"</span> <span class="token punctuation">\</span>
			--with-apr<span class="token operator">=</span><span class="token string">"<span class="token variable">$aprConfig</span>"</span> <span class="token punctuation">\</span>
			--with-java-home<span class="token operator">=</span><span class="token string">"<span class="token variable">$JAVA_HOME</span>"</span> <span class="token punctuation">\</span>
			--with-ssl<span class="token operator">=</span>yes <span class="token punctuation">\</span>
		<span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token assign-left variable">nproc</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span>nproc<span class="token variable">)</span></span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token function">make</span> <span class="token parameter variable">-j</span> <span class="token string">"<span class="token variable">$nproc</span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token function">make</span> <span class="token function">install</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token string">"<span class="token variable">$nativeBuildDir</span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token function">rm</span> bin/tomcat-native.tar.gz<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">\</span>
<span class="token comment"># mark any explicit dependencies as manually installed</span>
	<span class="token function">find</span> <span class="token string">"<span class="token variable">$TOMCAT_NATIVE_LIBDIR</span>"</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-executable</span> <span class="token parameter variable">-exec</span> ldd <span class="token string">'{}'</span> <span class="token string">';'</span> <span class="token punctuation">\</span>
		<span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'/=>/ &amp;&amp; $(NF-1) != "=>" { print $(NF-1) }'</span> <span class="token punctuation">\</span>
		<span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-rt</span> readlink <span class="token parameter variable">-e</span> <span class="token punctuation">\</span>
		<span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-u</span> <span class="token punctuation">\</span>
		<span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-rt</span> <span class="token function">rpm</span> <span class="token parameter variable">--query</span> <span class="token parameter variable">--whatprovides</span> <span class="token punctuation">\</span>
		<span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-u</span> <span class="token punctuation">\</span>
		<span class="token operator">|</span> <span class="token function">tee</span> <span class="token string">"<span class="token variable">$TOMCAT_NATIVE_LIBDIR</span>/.dependencies.txt"</span> <span class="token punctuation">\</span>
		<span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-r</span> yumdb <span class="token builtin class-name">set</span> reason user <span class="token punctuation">\</span>
	<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">\</span>
<span class="token comment"># clean up anything added temporarily and not later marked as necessary</span>
	yum autoremove -y<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	yum clean all<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/cache/yum<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">\</span>
<span class="token comment"># sh removes env vars it doesn't support (ones with periods)</span>
<span class="token comment"># https://github.com/docker-library/tomcat/issues/77</span>
	<span class="token function">find</span> ./bin/ <span class="token parameter variable">-name</span> <span class="token string">'*.sh'</span> <span class="token parameter variable">-exec</span> <span class="token function">sed</span> <span class="token parameter variable">-ri</span> <span class="token string">'s|^#!/bin/sh$|#!/usr/bin/env bash|'</span> <span class="token string">'{}'</span> +<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">\</span>
<span class="token comment"># fix permissions (especially for running as non-root)</span>
<span class="token comment"># https://github.com/docker-library/tomcat/issues/35</span>
	<span class="token function">chmod</span> <span class="token parameter variable">-R</span> +rX <span class="token builtin class-name">.</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token function">chmod</span> <span class="token number">777</span> logs temp work<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token punctuation">\</span>
<span class="token comment"># smoke test</span>
	catalina.sh version

<span class="token comment"># verify Tomcat Native is working properly</span>
RUN <span class="token builtin class-name">set</span> -eux<span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token assign-left variable">nativeLines</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span>catalina.sh configtest <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span><span class="token variable">)</span></span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token assign-left variable">nativeLines</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">$nativeLines</span>"</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">'Apache Tomcat Native'</span><span class="token variable">)</span></span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token assign-left variable">nativeLines</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">$nativeLines</span>"</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token keyword">if</span> <span class="token operator">!</span> <span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">$nativeLines</span>"</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">'INFO: Loaded( APR based)? Apache Tomcat Native library'</span> <span class="token operator">></span><span class="token file-descriptor important">&amp;2</span><span class="token punctuation">;</span> <span class="token keyword">then</span> <span class="token punctuation">\</span>
		<span class="token builtin class-name">echo</span> <span class="token operator">></span><span class="token file-descriptor important">&amp;2</span> <span class="token string">"<span class="token variable">$nativeLines</span>"</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
		<span class="token builtin class-name">exit</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
	<span class="token keyword">fi</span>

EXPOSE <span class="token number">8080</span>
CMD <span class="token punctuation">[</span><span class="token string">"catalina.sh"</span>, <span class="token string">"run"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="补充" tabindex="-1"><a class="header-anchor" href="#补充" aria-hidden="true">#</a> 补充：</h2>
<p>案例如下：假设已通过 <code v-pre>Dockerfile</code> 构建了 <code v-pre>nginx:test</code> 镜像：</p>
<p><img src="@source/markdown/images/2W6k1Q4qxgDR9NL.jpg" alt="graphic"></p>
<table>
<thead>
<tr>
<th>是否传参</th>
<th>按照dockerfile编写执行</th>
<th>传参运行</th>
</tr>
</thead>
<tbody>
<tr>
<td>Docker命令</td>
<td>docker run   nginx:test</td>
<td>docker run   nginx:test -c /etc/nginx/new.conf</td>
</tr>
<tr>
<td>衍生出的实际命令</td>
<td>nginx -c  /etc/nginx/nginx.conf</td>
<td>nginx -c  /etc/nginx/new.conf</td>
</tr>
</tbody>
</table>
<p><code v-pre>ENV MY_PATH /usr/mytest</code></p>
<p>这个环境变量可以在后续的任何<code v-pre>RUN</code>指令中使用，这就如同在命令前面指定了环境变量前缀一样；</p>
<p>也可以在其它指令中直接使用这些环境变量，</p>
<p>比如：<code v-pre>WORKDIR $MY_PATH</code></p>
</div></template>


