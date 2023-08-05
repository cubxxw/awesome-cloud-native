const e=JSON.parse('{"key":"v-1e760628","path":"/Cloud-Native-k8s/47.html","title":"\u7B2C47\u8282 Kubernetes \u6982\u5FF5\u4EE5\u53CA\u67B6\u6784","lang":"zh-CN","frontmatter":{},"excerpt":"","headers":[{"level":2,"title":"\u524D\u8A00","slug":"\u524D\u8A00","link":"#\u524D\u8A00","children":[]},{"level":2,"title":"\u8C37\u6B4CBorg\u4E91\u8BA1\u7B97\u5E73\u53F0","slug":"\u8C37\u6B4Cborg\u4E91\u8BA1\u7B97\u5E73\u53F0","link":"#\u8C37\u6B4Cborg\u4E91\u8BA1\u7B97\u5E73\u53F0","children":[{"level":3,"title":"Borg\u4E3B\u8981\u652F\u6301\u7684\u4E1A\u52A1","slug":"borg\u4E3B\u8981\u652F\u6301\u7684\u4E1A\u52A1","link":"#borg\u4E3B\u8981\u652F\u6301\u7684\u4E1A\u52A1","children":[]}]},{"level":2,"title":"\u6982\u5FF5","slug":"\u6982\u5FF5","link":"#\u6982\u5FF5","children":[{"level":3,"title":"The workload","slug":"the-workload","link":"#the-workload","children":[]},{"level":3,"title":"Clusters and cells","slug":"clusters-and-cells","link":"#clusters-and-cells","children":[]},{"level":3,"title":"Jobs and tasks","slug":"jobs-and-tasks","link":"#jobs-and-tasks","children":[]},{"level":3,"title":"Allocs\uFF08allocation\uFF09","slug":"allocs-allocation","link":"#allocs-allocation","children":[]},{"level":3,"title":"Priority, quota, and adminssion control","slug":"priority-quota-and-adminssion-control","link":"#priority-quota-and-adminssion-control","children":[]},{"level":3,"title":"Naming and monitoring","slug":"naming-and-monitoring","link":"#naming-and-monitoring","children":[]}]},{"level":2,"title":"\u5E94\u7528\u9AD8\u53EF\u7528","slug":"\u5E94\u7528\u9AD8\u53EF\u7528","link":"#\u5E94\u7528\u9AD8\u53EF\u7528","children":[{"level":3,"title":"Borg\u7CFB\u7EDF\u81EA\u8EAB\u9AD8\u53EF\u7528","slug":"borg\u7CFB\u7EDF\u81EA\u8EAB\u9AD8\u53EF\u7528","link":"#borg\u7CFB\u7EDF\u81EA\u8EAB\u9AD8\u53EF\u7528","children":[]},{"level":3,"title":"\u8D44\u6E90\u5229\u7528\u7387","slug":"\u8D44\u6E90\u5229\u7528\u7387","link":"#\u8D44\u6E90\u5229\u7528\u7387","children":[]},{"level":3,"title":"Borg\u7684\u8C03\u5EA6\u539F\u7406","slug":"borg\u7684\u8C03\u5EA6\u539F\u7406","link":"#borg\u7684\u8C03\u5EA6\u539F\u7406","children":[]},{"level":3,"title":"\u9694\u79BB\u6027","slug":"\u9694\u79BB\u6027","link":"#\u9694\u79BB\u6027","children":[]}]},{"level":2,"title":"\u4EC0\u4E48\u662F Kubernetes","slug":"\u4EC0\u4E48\u662F-kubernetes","link":"#\u4EC0\u4E48\u662F-kubernetes","children":[]},{"level":2,"title":"Kubernetes \u6982\u5FF5","slug":"kubernetes-\u6982\u5FF5","link":"#kubernetes-\u6982\u5FF5","children":[]},{"level":2,"title":"\u547D\u4EE4\u5F0F(Imperative) VS \u58F0\u660E\u5F0F(Declarative)","slug":"\u547D\u4EE4\u5F0F-imperative-vs-\u58F0\u660E\u5F0F-declarative","link":"#\u547D\u4EE4\u5F0F-imperative-vs-\u58F0\u660E\u5F0F-declarative","children":[{"level":3,"title":"\u58F0\u660E\u5F0F\u7CFB\u7EDF\u8BE5\u505A\u4EC0\u4E48","slug":"\u58F0\u660E\u5F0F\u7CFB\u7EDF\u8BE5\u505A\u4EC0\u4E48","link":"#\u58F0\u660E\u5F0F\u7CFB\u7EDF\u8BE5\u505A\u4EC0\u4E48","children":[]},{"level":3,"title":"\u58F0\u660E\u5F0F\u7CFB\u7EDF\u89C4\u8303","slug":"\u58F0\u660E\u5F0F\u7CFB\u7EDF\u89C4\u8303","link":"#\u58F0\u660E\u5F0F\u7CFB\u7EDF\u89C4\u8303","children":[]}]},{"level":2,"title":"Kubernetes \u67B6\u6784","slug":"kubernetes-\u67B6\u6784","link":"#kubernetes-\u67B6\u6784","children":[]},{"level":2,"title":"Kubernetes \u7684\u4E3B\u8282\u70B9","slug":"kubernetes-\u7684\u4E3B\u8282\u70B9","link":"#kubernetes-\u7684\u4E3B\u8282\u70B9","children":[{"level":3,"title":"API Server(API\u670D\u52A1\u5668)","slug":"api-server-api\u670D\u52A1\u5668","link":"#api-server-api\u670D\u52A1\u5668","children":[]},{"level":3,"title":"Cluster Data Store(\u96C6\u7FA4\u7684\u6570\u636E\u5B58\u50A8)","slug":"cluster-data-store-\u96C6\u7FA4\u7684\u6570\u636E\u5B58\u50A8","link":"#cluster-data-store-\u96C6\u7FA4\u7684\u6570\u636E\u5B58\u50A8","children":[]},{"level":3,"title":"Scheduler(\u8C03\u5EA6\u5668)","slug":"scheduler-\u8C03\u5EA6\u5668","link":"#scheduler-\u8C03\u5EA6\u5668","children":[]}]},{"level":2,"title":"Kubernetes \u5DE5\u4F5C\u8282\u70B9","slug":"kubernetes-\u5DE5\u4F5C\u8282\u70B9","link":"#kubernetes-\u5DE5\u4F5C\u8282\u70B9","children":[{"level":3,"title":"kubelet","slug":"kubelet","link":"#kubelet","children":[]},{"level":3,"title":"kube-proxy","slug":"kube-proxy","link":"#kube-proxy","children":[]}]},{"level":2,"title":"ETCD","slug":"etcd","link":"#etcd","children":[]},{"level":2,"title":"API Server","slug":"api-server","link":"#api-server","children":[{"level":3,"title":"\u63D0\u4F9B\u96C6\u7FA4\u7BA1\u7406\u7684REST API\u63A5\u53E3","slug":"\u63D0\u4F9B\u96C6\u7FA4\u7BA1\u7406\u7684rest-api\u63A5\u53E3","link":"#\u63D0\u4F9B\u96C6\u7FA4\u7BA1\u7406\u7684rest-api\u63A5\u53E3","children":[]},{"level":3,"title":"\u63D0\u4F9B\u6570\u636E\u7684\u7F13\u5B58","slug":"\u63D0\u4F9B\u6570\u636E\u7684\u7F13\u5B58","link":"#\u63D0\u4F9B\u6570\u636E\u7684\u7F13\u5B58","children":[]}]},{"level":2,"title":"Controller Manager","slug":"controller-manager","link":"#controller-manager","children":[{"level":3,"title":"\u5DE5\u4F5C\u6D41\u7A0B","slug":"\u5DE5\u4F5C\u6D41\u7A0B","link":"#\u5DE5\u4F5C\u6D41\u7A0B","children":[]},{"level":3,"title":"Informer \u5185\u90E8\u673A\u5236","slug":"informer-\u5185\u90E8\u673A\u5236","link":"#informer-\u5185\u90E8\u673A\u5236","children":[]},{"level":3,"title":"Deployment \u534F\u540C\u5DE5\u4F5C\u539F\u7406","slug":"deployment-\u534F\u540C\u5DE5\u4F5C\u539F\u7406","link":"#deployment-\u534F\u540C\u5DE5\u4F5C\u539F\u7406","children":[]},{"level":3,"title":"\u63A7\u5236\u5668\u5DE5\u4F5C","slug":"\u63A7\u5236\u5668\u5DE5\u4F5C","link":"#\u63A7\u5236\u5668\u5DE5\u4F5C","children":[]},{"level":3,"title":"Scheduler","slug":"scheduler","link":"#scheduler","children":[]},{"level":3,"title":"Kubelet","slug":"kubelet-1","link":"#kubelet-1","children":[]},{"level":3,"title":"Kube-proxy","slug":"kube-proxy-1","link":"#kube-proxy-1","children":[]}]},{"level":2,"title":"Add-ons","slug":"add-ons","link":"#add-ons","children":[{"level":3,"title":"\u63A8\u8350\u7684 Add-ons","slug":"\u63A8\u8350\u7684-add-ons","link":"#\u63A8\u8350\u7684-add-ons","children":[]}]},{"level":2,"title":"\u4E86\u89E3 Kubectl","slug":"\u4E86\u89E3-kubectl","link":"#\u4E86\u89E3-kubectl","children":[{"level":3,"title":"Kubectl \u548C Kubeconfig","slug":"kubectl-\u548C-kubeconfig","link":"#kubectl-\u548C-kubeconfig","children":[]},{"level":3,"title":"\u5E38\u7528\u547D\u4EE4","slug":"\u5E38\u7528\u547D\u4EE4","link":"#\u5E38\u7528\u547D\u4EE4","children":[]}]},{"level":2,"title":"K8s \u8BBE\u8BA1\u7406\u5FF5","slug":"k8s-\u8BBE\u8BA1\u7406\u5FF5","link":"#k8s-\u8BBE\u8BA1\u7406\u5FF5","children":[{"level":3,"title":"\u5206\u5C42\u67B6\u6784","slug":"\u5206\u5C42\u67B6\u6784","link":"#\u5206\u5C42\u67B6\u6784","children":[]}]},{"level":2,"title":"API \u8BBE\u8BA1\u7406\u5FF5","slug":"api-\u8BBE\u8BA1\u7406\u5FF5","link":"#api-\u8BBE\u8BA1\u7406\u5FF5","children":[{"level":3,"title":"Kubernetes \u5982\u4F55\u901A\u8FC7\u5BF9\u8C61\u7684\u7EC4\u5408\u5B8C\u6210\u4E1A\u52A1\u63CF\u8FF0","slug":"kubernetes-\u5982\u4F55\u901A\u8FC7\u5BF9\u8C61\u7684\u7EC4\u5408\u5B8C\u6210\u4E1A\u52A1\u63CF\u8FF0","link":"#kubernetes-\u5982\u4F55\u901A\u8FC7\u5BF9\u8C61\u7684\u7EC4\u5408\u5B8C\u6210\u4E1A\u52A1\u63CF\u8FF0","children":[]},{"level":3,"title":"\u67B6\u6784\u8BBE\u8BA1\u539F\u5219","slug":"\u67B6\u6784\u8BBE\u8BA1\u539F\u5219","link":"#\u67B6\u6784\u8BBE\u8BA1\u539F\u5219","children":[]},{"level":3,"title":"\u6838\u5FC3\u6280\u672F\u6982\u5FF5\u548C API \u5BF9\u8C61","slug":"\u6838\u5FC3\u6280\u672F\u6982\u5FF5\u548C-api-\u5BF9\u8C61","link":"#\u6838\u5FC3\u6280\u672F\u6982\u5FF5\u548C-api-\u5BF9\u8C61","children":[]},{"level":3,"title":"\u6838\u5FC3\u5BF9\u8C61\u6982\u89C8","slug":"\u6838\u5FC3\u5BF9\u8C61\u6982\u89C8","link":"#\u6838\u5FC3\u5BF9\u8C61\u6982\u89C8","children":[]}]},{"level":2,"title":"END \u94FE\u63A5","slug":"end-\u94FE\u63A5","link":"#end-\u94FE\u63A5","children":[]}],"git":{"updatedTime":1679052644000,"contributors":[{"name":"Xinwei Xiong","email":"3293172751nss@gmail.com","commits":2},{"name":"xiongxinwei","email":"3293172751nss@gmail.com","commits":1}]},"filePathRelative":"Cloud-Native-k8s/47.md"}');export{e as data};
