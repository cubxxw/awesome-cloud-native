export const data = JSON.parse("{\"key\":\"v-7fba418f\",\"path\":\"/Cloud-Native-k8s/62.html\",\"title\":\"第62节 Istio 高级流量管理\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"Istio 高级流量管理\",\"slug\":\"istio-高级流量管理\",\"link\":\"#istio-高级流量管理\",\"children\":[{\"level\":3,\"title\":\"微服务架构的演变\",\"slug\":\"微服务架构的演变\",\"link\":\"#微服务架构的演变\",\"children\":[]},{\"level\":3,\"title\":\"思维导图\",\"slug\":\"思维导图\",\"link\":\"#思维导图\",\"children\":[]},{\"level\":3,\"title\":\"SpringCloud和Istio的区别\",\"slug\":\"springcloud和istio的区别\",\"link\":\"#springcloud和istio的区别\",\"children\":[]},{\"level\":3,\"title\":\"为什么不选择SpringCloud\",\"slug\":\"为什么不选择springcloud\",\"link\":\"#为什么不选择springcloud\",\"children\":[]}]},{\"level\":2,\"title\":\"什么是 Service Mesh（服务网格）？\",\"slug\":\"什么是-service-mesh-服务网格\",\"link\":\"#什么是-service-mesh-服务网格\",\"children\":[{\"level\":3,\"title\":\"服务网格可选方案\",\"slug\":\"服务网格可选方案\",\"link\":\"#服务网格可选方案\",\"children\":[]}]},{\"level\":2,\"title\":\"流量管理\",\"slug\":\"流量管理\",\"link\":\"#流量管理\",\"children\":[{\"level\":3,\"title\":\"灰度发布\",\"slug\":\"灰度发布\",\"link\":\"#灰度发布\",\"children\":[]},{\"level\":3,\"title\":\"流量控制\",\"slug\":\"流量控制\",\"link\":\"#流量控制\",\"children\":[]},{\"level\":3,\"title\":\"故障注入\",\"slug\":\"故障注入\",\"link\":\"#故障注入\",\"children\":[]},{\"level\":3,\"title\":\"流量镜像\",\"slug\":\"流量镜像\",\"link\":\"#流量镜像\",\"children\":[]}]},{\"level\":2,\"title\":\"可观察性\",\"slug\":\"可观察性\",\"link\":\"#可观察性\",\"children\":[{\"level\":3,\"title\":\"监控指标\",\"slug\":\"监控指标\",\"link\":\"#监控指标\",\"children\":[]},{\"level\":3,\"title\":\"日志\",\"slug\":\"日志\",\"link\":\"#日志\",\"children\":[]},{\"level\":3,\"title\":\"分布式追踪\",\"slug\":\"分布式追踪\",\"link\":\"#分布式追踪\",\"children\":[]}]},{\"level\":2,\"title\":\"Istio 架构演进\",\"slug\":\"istio-架构演进\",\"link\":\"#istio-架构演进\",\"children\":[]},{\"level\":2,\"title\":\"设计目标\",\"slug\":\"设计目标\",\"link\":\"#设计目标\",\"children\":[{\"level\":3,\"title\":\"策略一致性\",\"slug\":\"策略一致性\",\"link\":\"#策略一致性\",\"children\":[]},{\"level\":3,\"title\":\"可移植性\",\"slug\":\"可移植性\",\"link\":\"#可移植性\",\"children\":[]}]},{\"level\":2,\"title\":\"安全性\",\"slug\":\"安全性\",\"link\":\"#安全性\",\"children\":[{\"level\":3,\"title\":\"Envoy 的优势\",\"slug\":\"envoy-的优势\",\"link\":\"#envoy-的优势\",\"children\":[]},{\"level\":3,\"title\":\"Envoy 的线程模式\",\"slug\":\"envoy-的线程模式\",\"link\":\"#envoy-的线程模式\",\"children\":[]},{\"level\":3,\"title\":\"Envoy 基于非阻塞模式 （Epoll)\",\"slug\":\"envoy-基于非阻塞模式-epoll\",\"link\":\"#envoy-基于非阻塞模式-epoll\",\"children\":[]}]},{\"level\":2,\"title\":\"Istio 多集群\",\"slug\":\"istio-多集群\",\"link\":\"#istio-多集群\",\"children\":[]},{\"level\":2,\"title\":\"集群联邦\",\"slug\":\"集群联邦\",\"link\":\"#集群联邦\",\"children\":[{\"level\":3,\"title\":\"集群联邦管理的对象\",\"slug\":\"集群联邦管理的对象\",\"link\":\"#集群联邦管理的对象\",\"children\":[]},{\"level\":3,\"title\":\"集群的注册中心\",\"slug\":\"集群的注册中心\",\"link\":\"#集群的注册中心\",\"children\":[]}]},{\"level\":2,\"title\":\"Kind 搭建集群联邦\",\"slug\":\"kind-搭建集群联邦\",\"link\":\"#kind-搭建集群联邦\",\"children\":[{\"level\":3,\"title\":\"安装集群联邦\",\"slug\":\"安装集群联邦\",\"link\":\"#安装集群联邦\",\"children\":[]},{\"level\":3,\"title\":\"步骤 1：安装 kind\",\"slug\":\"步骤-1-安装-kind\",\"link\":\"#步骤-1-安装-kind\",\"children\":[]},{\"level\":3,\"title\":\"步骤 2：创建 Kubernetes 集群\",\"slug\":\"步骤-2-创建-kubernetes-集群\",\"link\":\"#步骤-2-创建-kubernetes-集群\",\"children\":[]},{\"level\":3,\"title\":\"步骤 3：安装 Istio\",\"slug\":\"步骤-3-安装-istio\",\"link\":\"#步骤-3-安装-istio\",\"children\":[]},{\"level\":3,\"title\":\"步骤 4：配置集群联邦\",\"slug\":\"步骤-4-配置集群联邦\",\"link\":\"#步骤-4-配置集群联邦\",\"children\":[]},{\"level\":3,\"title\":\"步骤 5：验证集群联邦\",\"slug\":\"步骤-5-验证集群联邦\",\"link\":\"#步骤-5-验证集群联邦\",\"children\":[]},{\"level\":3,\"title\":\"联邦对象的组成\",\"slug\":\"联邦对象的组成\",\"link\":\"#联邦对象的组成\",\"children\":[]}]},{\"level\":2,\"title\":\"结论\",\"slug\":\"结论\",\"link\":\"#结论\",\"children\":[]},{\"level\":2,\"title\":\"END 链接\",\"slug\":\"end-链接\",\"link\":\"#end-链接\",\"children\":[]}],\"git\":{\"updatedTime\":1679052644000,\"contributors\":[{\"name\":\"Xinwei Xiong\",\"email\":\"3293172751nss@gmail.com\",\"commits\":1},{\"name\":\"xiongxinwei\",\"email\":\"3293172751nss@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"Cloud-Native-k8s/62.md\"}")
