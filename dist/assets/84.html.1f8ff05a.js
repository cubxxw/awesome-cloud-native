import{_ as o,r as t,o as r,c as u,a as e,b as s,w as d,e as n,d as a}from"./app.9f14a191.js";const v={},c={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},m=n("author"),b=e("h1",{id:"\u7B2C84\u8282-\u4F7F\u7528docker\u6216docker-compose\u5B89\u88C5loki",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C84\u8282-\u4F7F\u7528docker\u6216docker-compose\u5B89\u88C5loki","aria-hidden":"true"},"#"),n(" \u7B2C84\u8282 \u4F7F\u7528Docker\u6216Docker Compose\u5B89\u88C5Loki")],-1),q=e("div",null,[e("a",{href:"83.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"85.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),p=e("br",null,null,-1),_=n("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),h={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},$=n("http://nsddd.top"),f=e("hr",null,null,-1),k=e("p",null,"[TOC]",-1),g=e("h2",{id:"\u9009\u62E9",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u9009\u62E9","aria-hidden":"true"},"#"),n(" \u9009\u62E9")],-1),I=e("p",null,"\u5982\u679Cni\u6B63\u5728\u8BC4\u4F30\u3001\u6D4B\u8BD5\u6216\u5F00\u53D1Loki\uFF0C\u5219\u53EF\u4EE5\u4F7F\u7528Docker\u6216Docker Compose\u5B89\u88C5Loki\u548CPromtail\u3002\u5BF9\u4E8E\u751F\u4EA7\u73AF\u5883\uFF0C\u6211\u4EEC\u5EFA\u8BAE\u4F7F\u7528Tanka\u6216Helm\u5B89\u88C5\u3002",-1),O=e("p",null,"\u4F7F\u7528\u8FD9\u4E9B\u5B89\u88C5\u8BF4\u660E\u83B7\u5F97\u7684\u914D\u7F6E\u5C06Loki\u4F5C\u4E3A\u5355\u4E2A\u4E8C\u8FDB\u5236\u6587\u4EF6\u8FD0\u884C\u3002",-1),E=e("h2",{id:"prerequisites-\u5148\u51B3\u6761\u4EF6",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#prerequisites-\u5148\u51B3\u6761\u4EF6","aria-hidden":"true"},"#"),n(" Prerequisites \u5148\u51B3\u6761\u4EF6")],-1),P={href:"https://docs.docker.com/install",target:"_blank",rel:"noopener noreferrer"},R=n("Docker"),T={href:"https://docs.docker.com/compose/install",target:"_blank",rel:"noopener noreferrer"},A=n("Docker Compose"),D=n(" (optional, only needed for the Docker Compose install method)"),S=a(`<h2 id="install-with-docker-compose" tabindex="-1"><a class="header-anchor" href="#install-with-docker-compose" aria-hidden="true">#</a> Install with Docker Compose</h2><p>\u5728\u547D\u4EE4\u884C\u4E2D\u8FD0\u884C\u4EE5\u4E0B\u547D\u4EE4\u3002\u5B83\u4EEC\u9002\u7528\u4E8EWindows\u6216Linux\u7CFB\u7EDF\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">wget</span> https://raw.githubusercontent.com/grafana/loki/v2.9.1/production/docker-compose.yaml <span class="token parameter variable">-O</span> docker-compose.yaml
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.yaml up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5730\u5740\u662F: https://raw.githubusercontent.com/grafana/loki/v2.9.1/production/docker-compose.yaml</p><p>Docker Compose \u7684\u5185\u5BB9\u662F\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>version: <span class="token string">&quot;3&quot;</span>

networks:
  loki:

services:
  loki:
    image: grafana/loki:2.9.0
    ports:
      - <span class="token string">&quot;3100:3100&quot;</span>
    command: <span class="token parameter variable">-config.file</span><span class="token operator">=</span>/etc/loki/local-config.yaml
    networks:
      - loki

  promtail:
    image: grafana/promtail:2.9.0
    volumes:
      - /var/log:/var/log
    command: <span class="token parameter variable">-config.file</span><span class="token operator">=</span>/etc/promtail/config.yml
    networks:
      - loki

  grafana:
    environment:
      - <span class="token assign-left variable">GF_PATHS_PROVISIONING</span><span class="token operator">=</span>/etc/grafana/provisioning
      - <span class="token assign-left variable">GF_AUTH_ANONYMOUS_ENABLED</span><span class="token operator">=</span>true
      - <span class="token assign-left variable">GF_AUTH_ANONYMOUS_ORG_ROLE</span><span class="token operator">=</span>Admin
    entrypoint:
      - <span class="token function">sh</span>
      - <span class="token parameter variable">-euc</span>
      - <span class="token operator">|</span>
        <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/grafana/provisioning/datasources
        <span class="token function">cat</span> <span class="token operator">&lt;&lt;</span>EOF <span class="token operator">&gt;</span> /etc/grafana/provisioning/datasources/ds.yaml
        apiVersion: <span class="token number">1</span>
        datasources:
        - name: Loki
          type: loki
          access: proxy
          orgId: <span class="token number">1</span>
          url: http://loki:3100
          basicAuth: <span class="token boolean">false</span>
          isDefault: <span class="token boolean">true</span>
          version: <span class="token number">1</span>
          editable: <span class="token boolean">false</span>
        EOF
        /run.sh
    image: grafana/grafana:latest
    ports:
      - <span class="token string">&quot;3000:3000&quot;</span>
    networks:
      - loki
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="node-exporter" tabindex="-1"><a class="header-anchor" href="#node-exporter" aria-hidden="true">#</a> node-exporter</h2><p><code>node-exporter</code> \u662F\u4E00\u4E2A\u5F00\u6E90\u7684\u5DE5\u5177\uFF0C\u7528\u4E8E\u6536\u96C6\u4E0E Linux \u7CFB\u7EDF\u4E0A\u7684\u786C\u4EF6\u548C\u64CD\u4F5C\u7CFB\u7EDF\u7684\u5404\u79CD\u6307\u6807\u6709\u5173\u7684\u4FE1\u606F\uFF0C\u5E76\u4F7F\u5176\u80FD\u591F\u88AB Prometheus \u670D\u52A1\u83B7\u53D6\u548C\u5B58\u50A8\u3002\u5B83\u662F Prometheus \u76D1\u63A7\u5DE5\u5177\u94FE\u7684\u4E00\u90E8\u5206\u3002</p><blockquote><p>&quot;exporter&quot; \u662F\u4E00\u4E2A\u4E13\u95E8\u7684\u7EC4\u4EF6\uFF0C\u5176\u4E3B\u8981\u804C\u8D23\u662F\u6536\u96C6\u975E Prometheus \u7CFB\u7EDF\u4E2D\u7684\u6307\u6807\u5E76\u5C06\u5176\u8F6C\u5316\u4E3A Prometheus \u53EF\u8BFB\u7684\u683C\u5F0F\u3002\u8FD9\u610F\u5473\u7740\u8FD9\u4E9B &quot;exporter&quot; \u7EC4\u4EF6\u5145\u5F53\u4E86\u6570\u636E\u6765\u6E90\u548C Prometheus \u4E4B\u95F4\u7684\u4E2D\u95F4\u5C42\uFF0C\u786E\u4FDD Prometheus \u53EF\u4EE5\u8F7B\u677E\u6293\u53D6\u5E76\u76D1\u63A7\u8FD9\u4E9B\u6570\u636E\u3002</p></blockquote><p>\u4F7F\u7528 <code>node-exporter</code> \u53EF\u4EE5\u63D0\u4F9B\u4EE5\u4E0B\u7B49\u65B9\u9762\u7684\u6307\u6807\uFF1A</p><ol><li><strong>CPU \u4F7F\u7528\u60C5\u51B5</strong>\uFF1A\u7528\u6237\u7A7A\u95F4\u3001\u7CFB\u7EDF\u3001I/O \u7B49\u5F85\u7B49\u3002</li><li><strong>\u5185\u5B58\u4F7F\u7528\u60C5\u51B5</strong>\uFF1A\u4F7F\u7528\u91CF\u3001\u7F13\u5B58\u3001\u4EA4\u6362\u7B49\u3002</li><li><strong>\u78C1\u76D8\u7A7A\u95F4</strong>\uFF1A\u6BCF\u4E2A\u5206\u533A\u7684\u4F7F\u7528\u91CF\u3001\u603B\u91CF\u3001\u53EF\u7528\u91CF\u7B49\u3002</li><li><strong>I/O</strong>\uFF1A\u8BFB\u5199\u64CD\u4F5C\u3001\u5B57\u8282\u7B49\u3002</li><li><strong>\u7F51\u7EDC</strong>\uFF1A\u4F20\u5165/\u4F20\u51FA\u6570\u636E\u5305\u3001\u9519\u8BEF\u7B49\u3002</li><li><strong>\u6587\u4EF6\u7CFB\u7EDF</strong>\uFF1Ai-nodes \u4F7F\u7528\u60C5\u51B5\u3001\u5927\u5C0F\u7B49\u3002</li><li><strong>\u786C\u4EF6\u4FE1\u606F</strong>\uFF1A\u5982 CPU \u6E29\u5EA6\u3001\u98CE\u6247\u901F\u5EA6\u7B49\uFF08\u53D6\u51B3\u4E8E\u7CFB\u7EDF\u662F\u5426\u6709\u8FD9\u4E9B\u4F20\u611F\u5668\u4FE1\u606F\uFF09\u3002</li><li>\u5176\u4ED6\u7CFB\u7EDF\u4FE1\u606F\uFF0C\u5982\u8FD0\u884C\u7684\u8FDB\u7A0B\u6570\u91CF\u3001\u7CFB\u7EDF\u8D1F\u8F7D\u7B49\u3002</li></ol><p>\u4F7F\u7528 <code>node-exporter</code>\uFF0C\u8FD0\u7EF4\u56E2\u961F\u548C\u5F00\u53D1\u56E2\u961F\u53EF\u4EE5\uFF1A</p><ol><li>\u76D1\u63A7\u670D\u52A1\u5668\u548C\u57FA\u7840\u8BBE\u65BD\u7684\u5065\u5EB7\u60C5\u51B5\u3002</li><li>\u8BBE\u7F6E\u8B66\u62A5\uFF0C\u5F53\u67D0\u4E9B\u6307\u6807\u8D85\u51FA\u9884\u8BBE\u8303\u56F4\u65F6\u81EA\u52A8\u901A\u77E5\u76F8\u5173\u4EBA\u5458\u3002</li><li>\u5BF9\u7CFB\u7EDF\u6027\u80FD\u8FDB\u884C\u5206\u6790\u548C\u4F18\u5316\u3002</li><li>\u4E86\u89E3\u7CFB\u7EDF\u7684\u8D44\u6E90\u4F7F\u7528\u60C5\u51B5\u548C\u8D8B\u52BF\uFF0C\u4E3A\u672A\u6765\u7684\u6269\u5C55\u548C\u5347\u7EA7\u505A\u51C6\u5907\u3002</li></ol><blockquote><p>\u6CE8\u610F\uFF0C\u5BF9\u4E8E Windows \u6765\u8BF4\uFF0C\u5E94\u8BE5\u4F7F\u7528 <code>wmi_exporter</code></p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># The root of the build/dist directory
IAM_ROOT=$(dirname &quot;\${BASH_SOURCE[0]}&quot;)/../..
[[ -z \${COMMON_SOURCED} ]] &amp;&amp; source \${IAM_ROOT}/scripts/install/common.sh

# API Server API Address:Port
INSECURE_OPENIMAPI=\${IAM_APISERVER_HOST}:\${API_OPENIM_PORT}
INSECURE_OPENIMAUTO=\${OPENIM_RPC_AUTH_HOST}:\${OPENIM_AUTH_PORT}

CCURL=&quot;curl -f -s -XPOST&quot; # Create
UCURL=&quot;curl -f -s -XPUT&quot; # Update
RCURL=&quot;curl -f -s -XGET&quot; # Retrieve
DCURL=&quot;curl -f -s -XDELETE&quot; # Delete

openim::test::check_error() {
  local response=$1
  local err_code=$(echo &quot;$response&quot; | jq &#39;.errCode&#39;)
  openim::log::status &quot;Response from user registration: $response&quot;
  if [[ &quot;$err_code&quot; != &quot;0&quot; ]]; then
    openim::log::error_exit &quot;Error occurred: $response, You can read the error code in the API documentation https://docs.openim.io/restapi/errcode&quot;
  else
    openim::log::success &quot;Operation was successful.&quot;
  fi
}

# The \`openim::test::auth\` function serves as a test suite for authentication-related operations.
function openim::test::auth() {
  # 1. Retrieve and set the authentication token.
  openim::test::get_token
  
  # 2. Force logout the test user from a specific platform.
  openim::test::force_logout
  
  # Log the completion of the auth test suite.
  openim::log::success &quot;Auth test suite completed successfully.&quot;
}

#################################### Auth Module ####################################

# Define a function to get a token (Admin Token)
openim::test::get_token() {
  token_response=$(\${CCURL} &quot;\${OperationID}&quot; &quot;\${Header}&quot; http://\${OPENIM_API_HOST}:\${API_OPENIM_PORT}/auth/user_token \\
      -d&#39;{&quot;secret&quot;: &quot;&#39;&quot;$SECRET&quot;&#39;&quot;,&quot;platformID&quot;: 1,&quot;userID&quot;: &quot;openIM123456&quot;}&#39;)
  token=$(echo $token_response | grep -Po &#39;token[&quot; :]+\\K[^&quot;]+&#39;)
  echo &quot;$token&quot;
}

Header=&quot;-HContent-Type: application/json&quot;
OperationID=&quot;-HoperationID: 1646445464564&quot;
Token=&quot;-Htoken: $(openim::test::get_token)&quot;

# Forces a user to log out from the specified platform by user ID.
openim::test::force_logout() {
  local request_body=$(cat &lt;&lt;EOF
{
  &quot;platformID&quot;: 2,
  &quot;userID&quot;: &quot;4950983283&quot;
}
EOF
  )
  echo &quot;Requesting force logout for user: $request_body&quot;

  local response=$(\${CCURL} &quot;\${Token}&quot; &quot;\${OperationID}&quot; &quot;\${Header}&quot; &quot;http://\${OPENIM_API_HOST}:\${API_OPENIM_PORT}/auth/force_logout&quot; -d &quot;\${request_body}&quot;)

  openim::test::check_error &quot;$response&quot;
}


#################################### User Module ####################################

# Registers a new user with provided user ID, nickname, and face URL using the API.
openim::test::user_register() {
  # Assign the parameters to local variables, with defaults if not provided
  local user_id=&quot;\${1:-\${TEST_USER_ID}}&quot;
  local nickname=&quot;\${2:-cubxxw}&quot;
  local face_url=&quot;\${3:-https://github.com/cubxxw}&quot;

  # Create the request body using the provided or default values
  local request_body=$(cat &lt;&lt;EOF
{
  &quot;secret&quot;: &quot;\${SECRET}&quot;,
  &quot;users&quot;: [
    {
      &quot;userID&quot;: &quot;\${user_id}&quot;,
      &quot;nickname&quot;: &quot;\${nickname}&quot;,
      &quot;faceURL&quot;: &quot;\${face_url}&quot;
    }
  ]
}
EOF
)

  echo &quot;Request body for user registration: $request_body&quot;

  # Send the registration request
  local user_register_response=$(\${CCURL} &quot;\${OperationID}&quot; &quot;\${Header}&quot; &quot;http://\${OPENIM_API_HOST}:\${API_OPENIM_PORT}/user/user_register&quot; -d &quot;\${request_body}&quot;)

  # Check for errors in the response
  openim::test::check_error &quot;$user_register_response&quot;
}

# Checks if the provided list of user IDs exist in the system.
openim::test::check_user_account() {
  local request_body=$(cat &lt;&lt;EOF
{
  &quot;checkUserIDs&quot;: [
    &quot;\${1}&quot;,
    &quot;\${MANAGER_USERID_1}&quot;,
    &quot;\${MANAGER_USERID_2}&quot;,
    &quot;\${MANAGER_USERID_3}&quot;
  ]
}
EOF
)
  echo &quot;$request_body&quot;

  local response=$(\${CCURL} &quot;\${Token}&quot; &quot;\${OperationID}&quot; &quot;\${Header}&quot; &quot;http://\${OPENIM_API_HOST}:\${API_OPENIM_PORT}/user/account_check&quot; -d &quot;\${request_body}&quot;)

  openim::test::check_error &quot;$response&quot;
}

# Retrieves a list of users with pagination, limited to a specific number per page.
openim::test::get_users() {
  local request_body=$(cat &lt;&lt;EOF
{
  &quot;pagination&quot;: {
    &quot;pageNumber&quot;: 1,
    &quot;showNumber&quot;: 100
  }
}
EOF
)
  echo &quot;$request_body&quot;

  local response=$(\${CCURL} &quot;\${Token}&quot; &quot;\${OperationID}&quot; &quot;\${Header}&quot; &quot;http://\${OPENIM_API_HOST}:\${API_OPENIM_PORT}/user/get_users&quot; -d &quot;\${request_body}&quot;)

  openim::test::check_error &quot;$response&quot;
}

# Obtains detailed information for a list of user IDs.
openim::test::get_users_info() {
  local request_body=$(cat &lt;&lt;EOF
{
  &quot;userIDs&quot;: [
    &quot;\${1}&quot;,
    &quot;\${MANAGER_USERID_1}&quot;
  ]
}
EOF
)
  echo &quot;$request_body&quot;

  local response=$(\${CCURL} &quot;\${Token}&quot; &quot;\${OperationID}&quot; &quot;\${Header}&quot; &quot;http://\${OPENIM_API_HOST}:\${API_OPENIM_PORT}/user/get_users_info&quot; -d &quot;\${request_body}&quot;)

  openim::test::check_error &quot;$response&quot;
}

# Retrieves the online status for a list of user IDs.
openim::test::get_users_online_status() {
  local request_body=$(cat &lt;&lt;EOF
{
  &quot;userIDs&quot;: [
    &quot;\${TEST_USER_ID}&quot;,
    &quot;\${MANAGER_USERID_1}&quot;,
    &quot;\${MANAGER_USERID_2}&quot;,
    &quot;\${MANAGER_USERID_3}&quot;
  ]
}
EOF
)
  echo &quot;$request_body&quot;

  local response=$(\${CCURL} &quot;\${Token}&quot; &quot;\${OperationID}&quot; &quot;\${Header}&quot; &quot;http://\${OPENIM_API_HOST}:\${API_OPENIM_PORT}/user/get_users_online_status&quot; -d &quot;\${request_body}&quot;)

  openim::test::check_error &quot;$response&quot;
}

# Updates the information for a user, such as nickname and face URL.
openim::test::update_user_info() {
  local request_body=$(cat &lt;&lt;EOF
{
  &quot;userInfo&quot;: {
    &quot;userID&quot;: &quot;\${TEST_USER_ID}&quot;,
    &quot;nickname&quot;: &quot;openimbot&quot;,
    &quot;faceURL&quot;: &quot;https://github.com/openimbot&quot;
  }
}
EOF
)
  echo &quot;$request_body&quot;

  local response=$(\${CCURL} &quot;\${Token}&quot; &quot;\${OperationID}&quot; &quot;\${Header}&quot; &quot;http://\${OPENIM_API_HOST}:\${API_OPENIM_PORT}/user/update_user_info&quot; -d &quot;\${request_body}&quot;)

  openim::test::check_error &quot;$response&quot;
}

# Gets the online status for users that a particular user has subscribed to.
openim::test::get_subscribe_users_status() {
  local request_body=$(cat &lt;&lt;EOF
{
  &quot;userID&quot;: &quot;\${TEST_USER_ID}&quot;
}
EOF
)
  echo &quot;$request_body&quot;

  local response=$(\${CCURL} &quot;\${Token}&quot; &quot;\${OperationID}&quot; &quot;\${Header}&quot; &quot;http://\${OPENIM_API_HOST}:\${API_OPENIM_PORT}/user/get_subscribe_users_status&quot; -d &quot;\${request_body}&quot;)

  openim::test::check_error &quot;$response&quot;
}

# Subscribes to the online status of a list of users for a particular user ID.
openim::test::subscribe_users_status() {
  local request_body=$(cat &lt;&lt;EOF
{
  &quot;userID&quot;: &quot;9168684795&quot;,
  &quot;userIDs&quot;: [
    &quot;7475779354&quot;,
    &quot;6317136453&quot;,
    &quot;8450535746&quot;
  ],
  &quot;genre&quot;: 1
}
EOF
)
  echo &quot;$request_body&quot;

  local response=$(\${CCURL} &quot;\${Token}&quot; &quot;\${OperationID}&quot; &quot;\${Header}&quot; &quot;http://\${OPENIM_API_HOST}:\${API_OPENIM_PORT}/user/subscribe_users_status&quot; -d &quot;\${request_body}&quot;)

  openim::test::check_error &quot;$response&quot;
}

# Sets the global message receiving option for a user, determining their messaging preferences.
openim::test::set_global_msg_recv_opt() {
  local request_body=$(cat &lt;&lt;EOF
{
  &quot;userID&quot;: &quot;\${TEST_USER_ID}&quot;,
  &quot;globalRecvMsgOpt&quot;: 0
}
EOF
)
  echo &quot;$request_body&quot;

  local response=$(\${CCURL} &quot;\${Token}&quot; &quot;\${OperationID}&quot; &quot;\${Header}&quot; &quot;http://\${OPENIM_API_HOST}:\${API_OPENIM_PORT}/user/set_global_msg_recv_opt&quot; -d &quot;\${request_body}&quot;)

  openim::test::check_error &quot;$response&quot;
}

# [openim::test::user function description]
# The \`openim::test::user\` function serves as a test suite for user-related operations. 
# It sequentially invokes all user-related test functions to ensure the API&#39;s user operations are functioning correctly.
function openim::test::user() {
  # 1. Register a test user.
  local USER_ID=$RANDOM
  local TEST_USER_ID=$RANDOM
  openim::test::user_register &quot;\${USER_ID}&quot; &quot;user01&quot; &quot;new_face_url&quot;
  openim::test::user_register &quot;\${TEST_USER_ID}&quot; &quot;user01&quot; &quot;new_face_url&quot;
  # 2. Check if the test user&#39;s account exists.
  openim::test::check_user_account &quot;\${TEST_USER_ID}&quot;
  
  # 3. Retrieve a list of users.
  openim::test::get_users
  
  # 4. Get detailed information for the test user.
  openim::test::get_users_info &quot;\${TEST_USER_ID}&quot;
  
  # 5. Check the online status of the test user.
  openim::test::get_users_online_status
  
  # 6. Update the test user&#39;s information.
  openim::test::update_user_info
  
  # 7. Get the status of users subscribed by the test user.
  openim::test::get_subscribe_users_status
  
  # 8. Subscribe the test user to a set of user statuses.
  openim::test::subscribe_users_status
  
  # 9. Set the message receiving option for the test user.
  openim::test::set_global_msg_recv_opt
  
  # Log the completion of the user test suite.
  openim::log::success &quot;User test suite completed successfully.&quot;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="83.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="85.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,17),C=n("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),y={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},U=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),N=n(")"),M=n("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),x={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},H=n("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function L(F,w){const i=t("ExternalLinkIcon"),l=t("RouterLink");return r(),u("div",null,[e("ul",null,[e("li",null,[e("a",c,[m,s(i)])])]),b,q,p,e("blockquote",null,[e("p",null,[_,e("a",h,[$,s(i)])])]),f,k,g,I,O,E,e("ul",null,[e("li",null,[e("a",P,[R,s(i)])]),e("li",null,[e("a",T,[A,s(i)]),D])]),S,e("ul",null,[e("li",null,[e("p",null,[s(l,{to:"/"},{default:d(()=>[C]),_:1})])]),e("li",null,[e("p",null,[e("a",y,[U,s(i)]),N])]),e("li",null,[e("p",null,[M,e("a",x,[H,s(i)])])])])])}const V=o(v,[["render",L],["__file","84.html.vue"]]);export{V as default};
