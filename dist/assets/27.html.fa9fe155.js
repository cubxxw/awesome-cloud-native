const e=JSON.parse('{"key":"v-96ace0b4","path":"/Cloud-Native-k8s/27.html","title":"\u7B2C27\u8282 k3s \u8865\u5145\uFF08\u9AD8\u7EA7\uFF09","lang":"zh-CN","frontmatter":{},"excerpt":"","headers":[{"level":2,"title":"k3s vs k3d","slug":"k3s-vs-k3d","link":"#k3s-vs-k3d","children":[]},{"level":2,"title":"\u8BC1\u4E66\u8F6E\u6362","slug":"\u8BC1\u4E66\u8F6E\u6362","link":"#\u8BC1\u4E66\u8F6E\u6362","children":[]},{"level":2,"title":"\u81EA\u52A8\u90E8\u7F72\u6E05\u5355","slug":"\u81EA\u52A8\u90E8\u7F72\u6E05\u5355","link":"#\u81EA\u52A8\u90E8\u7F72\u6E05\u5355","children":[]},{"level":2,"title":"\u4F7F\u7528 Docker \u4F5C\u4E3A\u5BB9\u5668\u8FD0\u884C\u65F6","slug":"\u4F7F\u7528-docker-\u4F5C\u4E3A\u5BB9\u5668\u8FD0\u884C\u65F6","link":"#\u4F7F\u7528-docker-\u4F5C\u4E3A\u5BB9\u5668\u8FD0\u884C\u65F6","children":[{"level":3,"title":"\u53EF\u9009\uFF1A\u5C06 crictl \u4E0E Docker \u4E00\u8D77\u4F7F\u7528","slug":"\u53EF\u9009-\u5C06-crictl-\u4E0E-docker-\u4E00\u8D77\u4F7F\u7528","link":"#\u53EF\u9009-\u5C06-crictl-\u4E0E-docker-\u4E00\u8D77\u4F7F\u7528","children":[]}]},{"level":2,"title":"\u914D\u7F6E containerd","slug":"\u914D\u7F6E-containerd","link":"#\u914D\u7F6E-containerd","children":[]},{"level":2,"title":"\u8282\u70B9\u6807\u7B7E\u548C\u6C61\u70B9","slug":"\u8282\u70B9\u6807\u7B7E\u548C\u6C61\u70B9","link":"#\u8282\u70B9\u6807\u7B7E\u548C\u6C61\u70B9","children":[]},{"level":2,"title":"\u4F7F\u7528\u5B89\u88C5\u811A\u672C\u542F\u52A8 Server \u8282\u70B9","slug":"\u4F7F\u7528\u5B89\u88C5\u811A\u672C\u542F\u52A8-server-\u8282\u70B9","link":"#\u4F7F\u7528\u5B89\u88C5\u811A\u672C\u542F\u52A8-server-\u8282\u70B9","children":[]},{"level":2,"title":"Alpine Linux \u5B89\u88C5\u7684\u989D\u5916\u51C6\u5907\u5DE5\u4F5C","slug":"alpine-linux-\u5B89\u88C5\u7684\u989D\u5916\u51C6\u5907\u5DE5\u4F5C","link":"#alpine-linux-\u5B89\u88C5\u7684\u989D\u5916\u51C6\u5907\u5DE5\u4F5C","children":[]},{"level":2,"title":"\u8FD0\u884C K3d\uFF08Docker \u4E2D\u7684 K3s\uFF09\u548C docker-compose","slug":"\u8FD0\u884C-k3d-docker-\u4E2D\u7684-k3s-\u548C-docker-compose","link":"#\u8FD0\u884C-k3d-docker-\u4E2D\u7684-k3s-\u548C-docker-compose","children":[]},{"level":2,"title":"\u5728 Raspbian Buster \u4E0A\u542F\u7528\u65E7\u7248\u7684 iptables","slug":"\u5728-raspbian-buster-\u4E0A\u542F\u7528\u65E7\u7248\u7684-iptables","link":"#\u5728-raspbian-buster-\u4E0A\u542F\u7528\u65E7\u7248\u7684-iptables","children":[]},{"level":2,"title":"\u4E3A Raspbian Buster \u542F\u7528 cgroup","slug":"\u4E3A-raspbian-buster-\u542F\u7528-cgroup","link":"#\u4E3A-raspbian-buster-\u542F\u7528-cgroup","children":[{"level":3,"title":"/boot/cmdline.txt \u7684\u793A\u4F8B","slug":"boot-cmdline-txt-\u7684\u793A\u4F8B","link":"#boot-cmdline-txt-\u7684\u793A\u4F8B","children":[]}]},{"level":2,"title":"SELinux \u652F\u6301","slug":"selinux-\u652F\u6301","link":"#selinux-\u652F\u6301","children":[{"level":3,"title":"\u81EA\u52A8\u5B89\u88C5","slug":"\u81EA\u52A8\u5B89\u88C5","link":"#\u81EA\u52A8\u5B89\u88C5","children":[]},{"level":3,"title":"\u624B\u52A8\u5B89\u88C5","slug":"\u624B\u52A8\u5B89\u88C5","link":"#\u624B\u52A8\u5B89\u88C5","children":[]}]},{"level":2,"title":"Red Hat \u548C CentOS \u7684\u989D\u5916\u51C6\u5907","slug":"red-hat-\u548C-centos-\u7684\u989D\u5916\u51C6\u5907","link":"#red-hat-\u548C-centos-\u7684\u989D\u5916\u51C6\u5907","children":[]},{"level":2,"title":"END \u94FE\u63A5","slug":"end-\u94FE\u63A5","link":"#end-\u94FE\u63A5","children":[]}],"git":{"updatedTime":1669532640000,"contributors":[{"name":"xiongxinwei","email":"3293172751nss@gmail.com","commits":2}]},"filePathRelative":"Cloud-Native-k8s/27.md"}');export{e as data};