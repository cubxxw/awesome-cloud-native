<template><div><h1 id="_126-auth-package-documentation" tabindex="-1"><a class="header-anchor" href="#_126-auth-package-documentation" aria-hidden="true">#</a> 126: <code v-pre>auth</code> Package Documentation</h1>
<h3 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction:</h3>
<p>The <code v-pre>auth</code> package provides functionalities for encrypting passwords and generating JWT (JSON Web Tokens) for user authentication and authorization purposes. The encryption is done using the bcrypt algorithm, and JWT generation uses the <code v-pre>jwt-go</code> package. It's a minimalistic library meant to provide developers with a quick way to secure their applications.</p>
<h3 id="features" tabindex="-1"><a class="header-anchor" href="#features" aria-hidden="true">#</a> Features:</h3>
<ol>
<li><strong>Password Encryption</strong>: Encrypt plain text passwords for secure storage.</li>
<li><strong>Password Comparison</strong>: Check if a given plain text password matches its encrypted form.</li>
<li><strong>JWT Generation</strong>: Issue a new JWT token with specific claims.</li>
</ol>
<h3 id="dependencies" tabindex="-1"><a class="header-anchor" href="#dependencies" aria-hidden="true">#</a> Dependencies:</h3>
<ul>
<li><code v-pre>github.com/dgrijalva/jwt-go</code>: Used for JWT generation and signing.</li>
<li><code v-pre>golang.org/x/crypto/bcrypt</code>: Used for encrypting and comparing passwords using bcrypt.</li>
</ul>
<h3 id="functions" tabindex="-1"><a class="header-anchor" href="#functions" aria-hidden="true">#</a> Functions:</h3>
<ol>
<li>Encrypt(source string) (string, error):
<ul>
<li>Encrypts the provided plain text string using bcrypt.</li>
<li>Arguments:
<ul>
<li><code v-pre>source</code>: The plain text string to encrypt.</li>
</ul>
</li>
<li>Returns:
<ul>
<li>Encrypted string.</li>
<li>Error (if any).</li>
</ul>
</li>
</ul>
</li>
<li>Compare(hashedPassword, password string) error:
<ul>
<li>Compares an encrypted password string with a plain text password.</li>
<li>Arguments:
<ul>
<li><code v-pre>hashedPassword</code>: The encrypted password.</li>
<li><code v-pre>password</code>: The plain text password to compare.</li>
</ul>
</li>
<li>Returns:
<ul>
<li>Error if the two passwords don't match or any other issue arises. Otherwise, nil.</li>
</ul>
</li>
</ul>
</li>
<li>Sign(secretID, secretKey, iss, aud string) string:
<ul>
<li>Issues a new JWT token with specified claims.</li>
<li>Arguments:
<ul>
<li><code v-pre>secretID</code>: The Key ID for JWT.</li>
<li><code v-pre>secretKey</code>: The secret key used for signing the JWT.</li>
<li><code v-pre>iss</code>: Issuer of the JWT.</li>
<li><code v-pre>aud</code>: Audience for which the JWT is intended.</li>
</ul>
</li>
<li>Returns:
<ul>
<li>JWT string.</li>
</ul>
</li>
</ul>
</li>
</ol>
<h3 id="usage-example" tabindex="-1"><a class="header-anchor" href="#usage-example" aria-hidden="true">#</a> Usage Example:</h3>
<p><strong>Password Encryption &amp; Comparison</strong>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>password :<span class="token operator">=</span> <span class="token string">"mySecurePassword"</span>

// Encrypt the password
hashedPassword, err :<span class="token operator">=</span> auth.Encrypt<span class="token punctuation">(</span>password<span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
    log.Fatalf<span class="token punctuation">(</span><span class="token string">"Error encrypting password: %v"</span>, err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

// Compare encrypted password with the plain one
err <span class="token operator">=</span> auth.Compare<span class="token punctuation">(</span>hashedPassword, password<span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
    log.Fatalf<span class="token punctuation">(</span><span class="token string">"Passwords do not match or error occurred: %v"</span>, err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>JWT Token Generation</strong>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>secretID :<span class="token operator">=</span> <span class="token string">"mySecretID"</span>
secretKey :<span class="token operator">=</span> <span class="token string">"mySuperSecretKey"</span>
issuer :<span class="token operator">=</span> <span class="token string">"myApp"</span>
audience :<span class="token operator">=</span> <span class="token string">"user123"</span>

// Generate JWT
token :<span class="token operator">=</span> auth.Sign<span class="token punctuation">(</span>secretID, secretKey, issuer, audience<span class="token punctuation">)</span>
fmt.Println<span class="token punctuation">(</span><span class="token string">"Generated JWT:"</span>, token<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion:</h3>
<p>This package is a foundational building block for developers to integrate robust authentication and authorization mechanisms into their Golang applications. Always ensure to keep your <code v-pre>secretKey</code> confidential and periodically rotate it for enhanced security.</p>
</div></template>


