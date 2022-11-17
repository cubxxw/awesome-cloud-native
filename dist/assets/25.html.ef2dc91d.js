const l=JSON.parse('{"key":"v-9d804330","path":"/Cloud-Native-k8s/25.html","title":"\u7B2C25\u8282 raft \u7B97\u6CD5","lang":"zh-CN","frontmatter":{},"excerpt":"","headers":[{"level":2,"title":"\u4E3A\u4EC0\u4E48raft\u51FA\u73B0","slug":"\u4E3A\u4EC0\u4E48raft\u51FA\u73B0","link":"#\u4E3A\u4EC0\u4E48raft\u51FA\u73B0","children":[]},{"level":2,"title":"raft \u7279\u6027","slug":"raft-\u7279\u6027","link":"#raft-\u7279\u6027","children":[]},{"level":2,"title":"\u7ED3\u6784","slug":"\u7ED3\u6784","link":"#\u7ED3\u6784","children":[{"level":3,"title":"\u89D2\u8272\u8F6C\u5316","slug":"\u89D2\u8272\u8F6C\u5316","link":"#\u89D2\u8272\u8F6C\u5316","children":[]}]},{"level":2,"title":"\u4E0D\u540C\u8282\u70B9\u7684\u72B6\u6001\u53C2\u6570","slug":"\u4E0D\u540C\u8282\u70B9\u7684\u72B6\u6001\u53C2\u6570","link":"#\u4E0D\u540C\u8282\u70B9\u7684\u72B6\u6001\u53C2\u6570","children":[]},{"level":2,"title":"raft RPC","slug":"raft-rpc","link":"#raft-rpc","children":[{"level":3,"title":"\u6A21\u5F0F","slug":"\u6A21\u5F0F","link":"#\u6A21\u5F0F","children":[]},{"level":3,"title":"\u65E5\u5FD7\u548C\u5FC3\u8DF3","slug":"\u65E5\u5FD7\u548C\u5FC3\u8DF3","link":"#\u65E5\u5FD7\u548C\u5FC3\u8DF3","children":[]},{"level":3,"title":"AppendEntries RPC","slug":"appendentries-rpc","link":"#appendentries-rpc","children":[]},{"level":3,"title":"RequestVote RPC","slug":"requestvote-rpc","link":"#requestvote-rpc","children":[]},{"level":3,"title":"Follower \u5904\u7406\u5FAA\u73AF","slug":"follower-\u5904\u7406\u5FAA\u73AF","link":"#follower-\u5904\u7406\u5FAA\u73AF","children":[]},{"level":3,"title":"Candidate \u5904\u7406\u5FAA\u73AF","slug":"candidate-\u5904\u7406\u5FAA\u73AF","link":"#candidate-\u5904\u7406\u5FAA\u73AF","children":[]},{"level":3,"title":"Leader \u5904\u7406\u5FAA\u73AF","slug":"leader-\u5904\u7406\u5FAA\u73AF","link":"#leader-\u5904\u7406\u5FAA\u73AF","children":[]}]},{"level":2,"title":"raft \u7279\u6027","slug":"raft-\u7279\u6027-1","link":"#raft-\u7279\u6027-1","children":[{"level":3,"title":"\u9009\u4E3E\u9650\u5236","slug":"\u9009\u4E3E\u9650\u5236","link":"#\u9009\u4E3E\u9650\u5236","children":[]},{"level":3,"title":"\u8282\u70B9\u4E4B\u95F4\u901A\u4FE1\uFF1ARPC","slug":"\u8282\u70B9\u4E4B\u95F4\u901A\u4FE1-rpc","link":"#\u8282\u70B9\u4E4B\u95F4\u901A\u4FE1-rpc","children":[]}]},{"level":2,"title":"Leader \u9009\u4E3E","slug":"leader-\u9009\u4E3E","link":"#leader-\u9009\u4E3E","children":[{"level":3,"title":"Heartbeat \u548C\u9009\u4E3E\u89E6\u53D1\u6D41\u7A0B","slug":"heartbeat-\u548C\u9009\u4E3E\u89E6\u53D1\u6D41\u7A0B","link":"#heartbeat-\u548C\u9009\u4E3E\u89E6\u53D1\u6D41\u7A0B","children":[]},{"level":3,"title":"\u9009\u4E3E\u8FC7\u7A0B","slug":"\u9009\u4E3E\u8FC7\u7A0B","link":"#\u9009\u4E3E\u8FC7\u7A0B","children":[]},{"level":3,"title":"\u83B7\u80DC\u7684\u5224\u65AD\u6761\u4EF6","slug":"\u83B7\u80DC\u7684\u5224\u65AD\u6761\u4EF6","link":"#\u83B7\u80DC\u7684\u5224\u65AD\u6761\u4EF6","children":[]},{"level":3,"title":"\u907F\u514D\u65E0\u9650\u5FAA\u73AF\u7684\u6295\u7968\u5206\u88C2\uFF1A\u968F\u673A\u9009\u4E3E\u8D85\u65F6","slug":"\u907F\u514D\u65E0\u9650\u5FAA\u73AF\u7684\u6295\u7968\u5206\u88C2-\u968F\u673A\u9009\u4E3E\u8D85\u65F6","link":"#\u907F\u514D\u65E0\u9650\u5FAA\u73AF\u7684\u6295\u7968\u5206\u88C2-\u968F\u673A\u9009\u4E3E\u8D85\u65F6","children":[]}]},{"level":2,"title":"Leader \u5411\u5176\u4ED6\u8282\u70B9\u590D\u5236\u65E5\u5FD7\uFF08log\uFF09","slug":"leader-\u5411\u5176\u4ED6\u8282\u70B9\u590D\u5236\u65E5\u5FD7-log","link":"#leader-\u5411\u5176\u4ED6\u8282\u70B9\u590D\u5236\u65E5\u5FD7-log","children":[{"level":3,"title":"\u590D\u5236\u6D41\u7A0B","slug":"\u590D\u5236\u6D41\u7A0B","link":"#\u590D\u5236\u6D41\u7A0B","children":[]},{"level":3,"title":"Log \u6587\u4EF6\u7EC4\u7EC7\u7ED3\u6784","slug":"log-\u6587\u4EF6\u7EC4\u7EC7\u7ED3\u6784","link":"#log-\u6587\u4EF6\u7EC4\u7EC7\u7ED3\u6784","children":[]},{"level":3,"title":"\u63D0\u4EA4\uFF08commit\uFF09\u7684\u5B9A\u4E49","slug":"\u63D0\u4EA4-commit-\u7684\u5B9A\u4E49","link":"#\u63D0\u4EA4-commit-\u7684\u5B9A\u4E49","children":[]},{"level":3,"title":"Log matching \u7279\u6027\uFF08\u4FDD\u8BC1 log \u5185\u5BB9\u4E00\u81F4\uFF09","slug":"log-matching-\u7279\u6027-\u4FDD\u8BC1-log-\u5185\u5BB9\u4E00\u81F4","link":"#log-matching-\u7279\u6027-\u4FDD\u8BC1-log-\u5185\u5BB9\u4E00\u81F4","children":[]},{"level":3,"title":"Log \u4E0D\u4E00\u81F4\u573A\u666F","slug":"log-\u4E0D\u4E00\u81F4\u573A\u666F","link":"#log-\u4E0D\u4E00\u81F4\u573A\u666F","children":[]},{"level":3,"title":"\u907F\u514D log \u4E0D\u4E00\u81F4\uFF1AAppendEntries \u4E2D\u7684\u4E00\u81F4\u6027\u68C0\u67E5","slug":"\u907F\u514D-log-\u4E0D\u4E00\u81F4-appendentries-\u4E2D\u7684\u4E00\u81F4\u6027\u68C0\u67E5","link":"#\u907F\u514D-log-\u4E0D\u4E00\u81F4-appendentries-\u4E2D\u7684\u4E00\u81F4\u6027\u68C0\u67E5","children":[]},{"level":3,"title":"\u4F18\u5316","slug":"\u4F18\u5316","link":"#\u4F18\u5316","children":[]}]},{"level":2,"title":"\u5B89\u5168\uFF1A\u786E\u4FDD\u72B6\u6001\u673A\u4EE5\u76F8\u540C\u987A\u5E8F\u6267\u884C\u76F8\u540C\u547D\u4EE4\u6D41","slug":"\u5B89\u5168-\u786E\u4FDD\u72B6\u6001\u673A\u4EE5\u76F8\u540C\u987A\u5E8F\u6267\u884C\u76F8\u540C\u547D\u4EE4\u6D41","link":"#\u5B89\u5168-\u786E\u4FDD\u72B6\u6001\u673A\u4EE5\u76F8\u540C\u987A\u5E8F\u6267\u884C\u76F8\u540C\u547D\u4EE4\u6D41","children":[{"level":3,"title":"\u9650\u5236\u4E00\uFF1A\u5305\u542B\u6240\u6709\u5DF2\u63D0\u4EA4 entry \u7684\u8282\u70B9\u624D\u80FD\u88AB\u9009\u4E3A leader","slug":"\u9650\u5236\u4E00-\u5305\u542B\u6240\u6709\u5DF2\u63D0\u4EA4-entry-\u7684\u8282\u70B9\u624D\u80FD\u88AB\u9009\u4E3A-leader","link":"#\u9650\u5236\u4E00-\u5305\u542B\u6240\u6709\u5DF2\u63D0\u4EA4-entry-\u7684\u8282\u70B9\u624D\u80FD\u88AB\u9009\u4E3A-leader","children":[]},{"level":3,"title":"\u9650\u5236\u4E8C\uFF1A\u5F53\u524D\u4EFB\u671F+\u526F\u672C\u6570\u91CF\u8FC7\u534A\uFF0Centry \u624D\u80FD\u63D0\u4EA4","slug":"\u9650\u5236\u4E8C-\u5F53\u524D\u4EFB\u671F-\u526F\u672C\u6570\u91CF\u8FC7\u534A-entry-\u624D\u80FD\u63D0\u4EA4","link":"#\u9650\u5236\u4E8C-\u5F53\u524D\u4EFB\u671F-\u526F\u672C\u6570\u91CF\u8FC7\u534A-entry-\u624D\u80FD\u63D0\u4EA4","children":[]},{"level":3,"title":"\u5B89\u5168\u6027\u7684\u7B80\u8981\u8BC1\u660E","slug":"\u5B89\u5168\u6027\u7684\u7B80\u8981\u8BC1\u660E","link":"#\u5B89\u5168\u6027\u7684\u7B80\u8981\u8BC1\u660E","children":[]}]},{"level":2,"title":"Follower/candidate \u6545\u969C\uFF1A\u65E0\u9650\u91CD\u8BD5 + \u8BF7\u6C42\u5E42\u7B49","slug":"follower-candidate-\u6545\u969C-\u65E0\u9650\u91CD\u8BD5-\u8BF7\u6C42\u5E42\u7B49","link":"#follower-candidate-\u6545\u969C-\u65E0\u9650\u91CD\u8BD5-\u8BF7\u6C42\u5E42\u7B49","children":[]},{"level":2,"title":"\u65F6\u5E8F\u548C\u53EF\u7528\u6027","slug":"\u65F6\u5E8F\u548C\u53EF\u7528\u6027","link":"#\u65F6\u5E8F\u548C\u53EF\u7528\u6027","children":[]},{"level":2,"title":"\u96C6\u7FA4\u8282\u70B9\u6570\u91CF\u53D8\u5316\uFF08membership changes\uFF09","slug":"\u96C6\u7FA4\u8282\u70B9\u6570\u91CF\u53D8\u5316-membership-changes","link":"#\u96C6\u7FA4\u8282\u70B9\u6570\u91CF\u53D8\u5316-membership-changes","children":[]},{"level":2,"title":"\u589E\u5220\u8282\u70B9\u53EF\u80FD\u5BFC\u81F4\u96C6\u7FA4\u5206\u88C2","slug":"\u589E\u5220\u8282\u70B9\u53EF\u80FD\u5BFC\u81F4\u96C6\u7FA4\u5206\u88C2","link":"#\u589E\u5220\u8282\u70B9\u53EF\u80FD\u5BFC\u81F4\u96C6\u7FA4\u5206\u88C2","children":[]},{"level":2,"title":"END \u94FE\u63A5","slug":"end-\u94FE\u63A5","link":"#end-\u94FE\u63A5","children":[]}],"git":{"updatedTime":1668697550000,"contributors":[{"name":"xiongxinwei","email":"3293172751nss@gmail.com","commits":2}]},"filePathRelative":"Cloud-Native-k8s/25.md"}');export{l as data};
