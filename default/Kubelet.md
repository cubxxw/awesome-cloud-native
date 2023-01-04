# kubelet

## 概要

kubelet 是在每个节点上运行的主要“节点代理”。它可以使用以下之一向 apiserver 注册节点：主机名；覆盖主机名的标志；或云提供商的特定逻辑。

kubelet 以 PodSpec 的形式工作。PodSpec 是描述 pod 的 YAML 或 JSON 对象。kubelet 采用一组通过各种机制（主要通过 apiserver）提供的 PodSpec，并确保这些 PodSpec 中描述的容器正在运行且健康。kubelet 不管理不是由 Kubernetes 创建的容器。 ^ea79c2

除了来自 apiserver 的 PodSpec 之外，还有两种方法可以将容器清单提供给 Kubelet。

-   文件：在命令行上作为标志传递的路径。将定期监视此路径下的文件以进行更新。默认情况下，监视周期为 20 秒，可通过标志进行配置。
-   HTTP 端点：在命令行上作为参数传递的 HTTP 端点。此端点每 20 秒检查一次（也可使用标志配置）。

```
kubelet [flags]
```

## 选项[](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/#options)

--add-dir-header

如果为真，则将文件目录添加到日志消息的标题中（弃用：将在未来的版本中删除，请参见[此处](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/2845-deprecate-klog-specific-flags-in-k8s-components)。）

--地址字符串默认值：0.0.0.0

Kubelet 服务的 IP 地址（设置为`0.0.0.0`或`::`用于侦听所有接口和 IP 系列）（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。 )

--allowed-unsafe-sysctls 字符串

不安全 sysctl 或不安全 sysctl 模式（以 结尾`*`）的逗号分隔白名单。使用这些需要您自担风险。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--alsologtostderr

记录到标准错误和文件（已弃用：将在未来版本中删除，请参见[此处](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/2845-deprecate-klog-specific-flags-in-k8s-components)。）

--anonymous-auth 默认值：true

启用对 Kubelet 服务器的匿名请求。未被其他身份验证方法拒绝的请求被视为匿名请求。匿名请求的用户名是`system:anonymous`，组名是`system:unauthenticated`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--authentication-token-webhook

使用`TokenReview`API 来确定不记名令牌的身份验证。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--authentication-token-webhook-cache-ttl 持续时间默认值：`2m0s`

缓存来自 webhook 令牌身份验证器的响应的持续时间。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--authorization-mode string 默认值：`AlwaysAllow`

Kubelet 服务器的授权模式。有效选项为 AlwaysAllow 或 Webhook。Webhook 模式使用 SubjectAccessReview API 来确定授权。（已弃用：此参数应通过 Kubelet 的 --config 标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--authorization-webhook-cache-authorized-ttl 持续时间默认值：`5m0s`

缓存来自 webhook 授权方的“授权”响应的持续时间。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--authorization-webhook-cache-unauthorized-ttl 持续时间默认值：`30s`

缓存来自 webhook 授权方的“未授权”响应的持续时间。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--azure-container-registry-config 字符串

包含 Azure 容器注册表配置信息的文件的路径。

--bootstrap-kubeconfig 字符串

用于获取 kubelet 客户端证书的 kubeconfig 文件的路径。如果指定的文件`--kubeconfig`不存在，则使用引导程序 kubeconfig 向 API 服务器请求客户端证书。成功时，引用生成的客户端证书和密钥的 kubeconfig 文件将写入 指定的路径`--kubeconfig`。客户端证书和密钥文件将存储在指向的目录中`--cert-dir`。

--cert-dir 字符串默认值：`/var/lib/kubelet/pki`

TLS 证书所在的目录。如果提供`--tls-cert-file`和`--tls-private-key-file`，则此标志将被忽略。

--cgroup-driver 字符串默认值：`cgroupfs`

kubelet 用于操作主机上的 cgroup 的驱动程序。可能的值：`cgroupfs`, `systemd`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--cgroup-root 字符串默认值：`''`

用于 pod 的可选根 cgroup。这是由容器运行时尽最大努力处理的。默认值：''，表示使用容器运行时默认值。（已弃用：此参数应通过 Kubelet 的 --config 标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--cgroups-per-qos 默认值：`true`

如果创建了真正的顶级 QoS 和 pod cgroup，则启用 QoS cgroup 层次结构的创建。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--client-ca-file 字符串

如果设置，任何呈现由 client-ca-file 中的一个授权机构签名的客户端证书的请求都会使用与客户端证书对应的身份进行身份`CommonName`验证。（已弃用：此参数应通过 Kubelet 的 --config 标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--cloud-config 字符串

云提供商配置文件的路径。没有配置文件的空字符串。（已弃用：将在 1.24 或更高版本中删除，以支持从 kubelet 中删除云提供商代码。）

--cloud-provider 字符串

云服务提供商。设置为空字符串以在没有云提供商的情况下运行。如果设置，云提供商将确定节点的名称（请参阅云提供商文档以确定是否以及如何使用主机名）。（已弃用：将在 1.24 或更高版本中删除，以支持从 Kubelet 中删除云提供商代码。）

--cluster-dns 字符串

逗号分隔的 DNS 服务器 IP 地址列表。如果 Pod 具有“dnsPolicy=ClusterFirst”，则此值用于容器 DNS 服务器。  
**注意：**列表中出现的所有 DNS 服务器必须提供相同的记录集，否则集群内的名称解析可能无法正常工作。无法保证可以联系哪个 DNS 服务器进行名称解析。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--集群域字符串

此集群的域。如果设置，kubelet 将配置所有容器以搜索此域以及主机的搜索域（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--配置字符串

Kubelet 将从该文件加载其初始配置。路径可以是绝对的或相对的；相对路径从 Kubelet 的当前工作目录开始。省略此标志以使用内置的默认配置值。命令行标志覆盖此文件中的配置。

--container-log-max-files int32 默认值：5

<警告：Beta 功能> 设置容器可以存在的容器日志文件的最大数量。数字必须 >= 2。此标志只能与 一起使用`--container-runtime=remote`。（已弃用：此参数应通过 Kubelet 的 --config 标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--container-log-max-size 字符串默认：`10Mi`

<警告：Beta 功能>`10Mi`在旋转之前设置容器日志文件的最大大小（例如 ）。此标志只能与 一起使用`--container-runtime=remote`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--container-runtime string 默认值：`remote`

要使用的容器运行时。可能的值：`docker`, `remote`。（已弃用：将在 1.27 中删除，因为唯一有效的值是“远程”）

--container-runtime-endpoint 字符串

远程运行时服务的端点。Linux 支持 Unix 域套接字，而 Windows 支持 npipe 和 tcp 端点。例子：`unix:///path/to/runtime.sock`, `npipe:////./pipe/runtime`。

--争用分析

如果启用了分析，则启用锁争用分析（已弃用：应通过 Kubelet`--config`标志指定的配置文件设置此参数。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--cpu-cfs-quota 默认值：`true`

为指定 CPU 限制的容器启用 CPU CFS 配额强制执行（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--cpu-cfs-quota-period 持续时间默认值：`100ms`

设置 CPU CFS 配额周期值，`cpu.cfs_period_us`默认为 Linux Kernel default。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--cpu-manager-policy 字符串默认值：`none`

要使用的 CPU 管理器策略。可能的值：`none`, `static`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--cpu-manager-policy-options mapStringString

一组 key=value CPU 管理器策略选项，用于微调它们的行为。如果未提供，请保持默认行为。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--cpu-manager-reconcile-period 持续时间默认值：`10s`

<警告：Alpha 功能> CPU 管理器协调期。示例：`10s`，或`1m`。如果未提供，则默认为节点状态更新频率。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--enable-controller-attach-detach 默认值：`true`

启用附加/分离控制器来管理计划到该节点的卷的附加/分离，并禁止 kubelet 执行任何附加/分离操作。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--enable-debugging-handlers 默认：`true`

为日志收集和容器和命令的本地运行启用服务器端点。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--启用服务器默认值：`true`

启用 Kubelet 的服务器。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--enforce-node-allocatable strings 默认值：`pods`

由 kubelet 强制执行的节点可分配执行级别的逗号分隔列表。可接受的选项是`none`、`pods`、`system-reserved`和`kube-reserved`。如果指定了后两个选项，`--system-reserved-cgroup`也`--kube-reserved-cgroup`必须分别设置。如果`none`指定，则不应设置其他选项。有关更多详细信息，请参见[此处](https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/)。（已弃用：此参数应通过 Kubelet 的 --config 标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--event-burst int32 默认值：10

突发事件记录的最大大小，暂时允许事件记录突发到这个数量，同时仍然不超过`--event-qps`。该数字必须 >= 0。如果为 0，将使用默认突发 (10)。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--event-qps int32 默认值：5

QPS 限制事件创建。该数字必须 >= 0。如果为 0 将使用默认 QPS (5)。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--eviction-hard mapStringString 默认值：`imagefs.available<15%,memory.available<100Mi,nodefs.available<10%`

一组驱逐阈值（例如`memory.available<1Gi`），如果满足将触发 pod 驱逐。在 Linux 节点上，默认值还包括`nodefs.inodesFree<5%`. （已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--eviction-max-pod-grace-period int32

在响应满足软驱逐阈值而终止 pod 时使用的最大允许宽限期（以秒为单位）。如果为负，则遵循 pod 指定的值。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--eviction-minimum-reclaim mapStringString

一组最小回收（例如`imagefs.available=2Gi`），描述了 kubelet 在执行 pod 驱逐时如果资源处于压力之下将回收的最小资源量。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--eviction-pressure-transition-period 持续时间默认值：`5m0s`

kubelet 在退出驱逐压力条件之前必须等待的持续时间。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--eviction-soft mapStringString

`memory.available<1.5Gi`如果在相应的宽限期内满足一组驱逐阈值（例如），将触发 pod 驱逐。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--eviction-soft-grace-period mapStringString

一组驱逐宽限期（例如`memory.available=1m30s`），对应于在触发 pod 驱逐之前软驱逐阈值必须保持多长时间。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--exit-on-lock-contention

kubelet 是否应该在锁定文件争用时退出。

--experimental-allocatable-ignore-eviction 默认值：`false`

设置为 时`true`，在计算节点可分配时将忽略硬驱逐阈值。有关更多详细信息，请参见[此处](https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/)。（弃用：将在 1.24 或更高版本中删除）

--experimental-kernel-memcg-notification

使用 kernelMemcgNotification 配置，此标志将在 1.24 或更高版本中删除。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--experimental-mounter-path 字符串默认：`mount`

[实验性] 安装程序二进制文件的路径。留空以使用默认值`mount`。（弃用：将在 1.24 或更高版本中删除，以支持使用 CSI。）

--fail-swap-on 默认值：`true`

如果在节点上启用交换，则 Kubelet 无法启动。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--feature-gates <'key=true/false' 对列表>

一组`key=value`描述 alpha/实验特征的特征门的对。选项有：  
APIListChunking=true|false（BETA - 默认=true）  
APIPriorityAndFairness=true|false（BETA - 默认=true）  
APIResponseCompression=true|false（BETA - 默认=true）  
APIServerIdentity=true|false（ALPHA - 默认=false )  
APIServerTracing=true|false (ALPHA - 默认=false)  
AllAlpha=true|false (ALPHA - 默认=false)  
AllBeta=true|false (BETA - 默认=false)  
AnyVolumeDataSource=true|false (BETA - 默认=true)  
AppArmor =true|false（测试版 - 默认值=true）  
CPUManager=true|false（测试版 - 默认值=true）  
CPUManagerPolicyAlphaOptions=true|false（ALPHA - 默认值=false）  
CPUManagerPolicyBetaOptions=true|false（测试版 - 默认值=true）  
CPUManagerPolicyOptions=true|false（测试版 - 默认值=true）  
CSIInlineVolume=true|false（测试版 - 默认值=true）  
CSIMigration=true|false（测试版 - 默认值=true）  
CSIMigrationAWS= true|false（BETA - 默认=true）  
CSIMigrationAzureFile=true|false（ BETA-默认=true）CSIMigrationGCE=true|false（BETA-  
默认=true）  
CSIMigrationPortworx=true|false（ALPHA-默认=false）  
CSIMigrationRBD=true| false（ALPHA - 默认值=false）  
CSIMigrationvSphere=true|false（BETA - 默认值=false）  
CSIVolumeHealth=true|false（ALPHA - 默认值=false）  
ContextualLogging=true|false（ALPHA - 默认值=false）  
CronJobTimeZone=true|false（阿尔法 - 默认=假）  
CustomCPUCFSQuotaPeriod=true|false（ALPHA - 默认=false）  
CustomResourceValidationExpressions=true|false（ALPHA - 默认=false）  
DaemonSetUpdateSurge=true|false（BETA - 默认=true）  
DelegateFSGroupToCSIDriver=true|false（BETA - 默认=true）  
DevicePlugins= true|false（测试版 - 默认值=true）  
DisableAcceleratorUsageMetrics=true|false（测试版 - 默认值=true）  
DisableCloudProviders=true|false（ALPHA - 默认值=false）  
DisableKubeletCloudCredentialProviders=true|false（ALPHA - 默认值=false）  
DownwardAPIHugePages=true| false（BETA - 默认=true）  
EndpointSliceTerminatingCondition=true|false（BETA - 默认=true）  
EphemeralContainers=true|false（BETA - 默认=true）  
ExpandedDNSConfig=true|false（ALPHA - 默认=false）  
ExperimentalHostUserNamespaceDefaulting=true|false（测试版 - 默认  
值= false  
）true|false（ALPHA - 默认值=false）HPAScaleToZero=true|false（ALPHA - 默认值=false）HonorPVReclaimPolicy=true|false（ALPHA - 默认值=false）IdentifyPodOS=true|false（BETA - 默认值=true）InTreePluginAWSUnregister=true| false（ALPHA-默认=false）InTreePluginAzureDiskUnregister=true|false（ALPHA-默认=false）InTreePluginAzureFileUnregister=true|false（ALPHA-默认=false）InTreePluginGCEUnregister=true|false（ALPHA-默认=false）  
  
  
  
  
  
  
  
  
  
InTreePluginOpenStackUnregister=true|false（ALPHA - 默认值=false）  
InTreePluginPortworxUnregister=true|false（ALPHA - 默认值=false）  
InTreePluginRBDUnregister=true|false（ALPHA - 默认值=false）  
InTreePluginvSphereUnregister=true|false（ALPHA - 默认值=false）  
JobMutableNodeSchedulingDirectives= true|false（测试版 - 默认值=true）  
JobReadyPods=true|false（测试版 - 默认值=true）  
JobTrackingWithFinalizers=true|false（测试版 - 默认值=false）  
KubeletCredentialProviders=true|false（测试版 - 默认值=true）  
KubeletInUserNamespace=true| false（ALPHA - 默认=false）  
KubeletPodResources=true|false（BETA - 默认=true）  
KubeletPodResourcesGetAllocatable=true|false（BETA - 默认=true）  
LegacyServiceAccountTokenNoAutoGeneration=true|false（BETA - 默认=true）  
LocalStorageCapacityIsolation=true|false（BETA - 默认=true）  
LocalStorageCapacityIsolationFSQuotaMonitoring=true|false（ALPHA - 默认=false）  
LogarithmicScaleDown=true|false（BETA - 默认=true）  
MaxUnavailableStatefulSet= true|false（ALPHA - 默认值=false）  
MemoryManager=true|false（BETA - 默认值=true）  
MemoryQoS=true|false（ALPHA - 默认值=false）  
MinDomainsInPodTopologySpread=true|false（ALPHA - 默认值=false）  
MixedProtocolLBService=true| false（测试版 - 默认值=true）  
NetworkPolicyEndPort=true|false（测试版 - 默认值=true）  
NetworkPolicyStatus=true|false（ALPHA - 默认值=false）  
NodeOutOfServiceVolumeDetach=true|false（ALPHA - 默认=false）  
NodeSwap=true|false（ALPHA - 默认=false）  
OpenAPIEnums=true|false（BETA - 默认=true）  
OpenAPIV3=true|false（BETA - 默认=true）  
PodAndContainerStatsFromCRI= true|false（ALPHA - 默认=false）  
PodDeletionCost=true|false（BETA-默认=true）  
PodSecurity=true|false（BETA-默认=true）  
ProbeTerminationGracePeriod=true|false（BETA-默认=false）  
ProcMountType=true| false (ALPHA - 默认值=false)  
ProxyTerminatingEndpoints=true|false (ALPHA - 默认值=false)  
QOSReserved=true|false (ALPHA - 默认值=false)  
ReadWriteOncePod=true|false (ALPHA - 默认值=false)  
RecoverVolumeExpansionFailure=true|false (阿尔法 - 默认=假）  
RemainingItemCount=true|false（BETA - 默认=true）  
RotateKubeletServerCertificate=true|false（ BETA-默认=true）  
SeccompDefault=true|false（ALPHA-默认=false）ServerSideFieldValidation  
=true|false（ALPHA-默认=false）  
ServiceIPStaticSubrange= true|false（ALPHA - 默认=false）  
ServiceInternalTrafficPolicy=true|false（BETA - 默认=true）  
SizeMemoryBackedVolumes=true|false（BETA - 默认=true）  
StatefulSetAutoDeletePVC=true|false（ALPHA - 默认=false）  
StatefulSetMinReadySeconds=true| false（BETA - 默认=true）  
StorageVersionAPI=true|false（ALPHA - 默认=false）  
StorageVersionHash=true|false（BETA - 默认=true）  
TopologyAwareHints=true|false（BETA - 默认=true）  
TopologyManager=true|false（BETA - 默认=true）  
VolumeCapacityPriority=true|false（ALPHA - 默认=false）  
WinDSR=true|false（ALPHA - 默认=false）  
WinOverlay=true|false（BETA - 默认=true）  
WindowsHostProcessContainers= true|false（BETA - 默认=true）  
（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--file-check-frequency duration 默认：`20s`

检查新数据的配置文件之间的持续时间。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--hairpin-mode 字符串默认值：`promiscuous-bridge`

kubelet 应该如何设置发夹 NAT。这允许服务的端点在尝试访问自己的服务时将负载平衡回自己。有效值为`promiscuous-bridge`和。（已弃用：此参数应通过 Kubelet标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）`hairpin-veth``none``--config`[](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)

--healthz-bind-address 字符串默认：`127.0.0.1`

healthz 服务器服务的 IP 地址（设置为`0.0.0.0`或`::`用于侦听所有接口和 IP 系列）。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--healthz-port int32 默认值：10248

localhost healthz 端点的端口（设置`0`为禁用）。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

-h, --帮助

帮助 kubelet

--hostname-override 字符串

如果非空，将使用此字符串作为标识而不是实际的主机名。如果`--cloud-provider`已设置，云提供商将确定节点的名称（请参阅云提供商文档以确定是否以及如何使用主机名）。

--http-check-frequency duration 默认：`20s`

检查 HTTP 新数据之间的持续时间。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--image-credential-provider-bin-dir 字符串

凭证提供程序插件二进制文件所在目录的路径。

--image-credential-provider-config 字符串

凭证提供程序插件配置文件的路径。

--image-gc-high-threshold int32 默认值：85

始终运行图像垃圾收集的磁盘使用百分比。值必须在 [0, 100] 范围内，要禁用图像垃圾收集，请设置为 100。（已弃用：应通过 Kubelet`--config`标志指定的配置文件设置此参数。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。 )

--image-gc-low-threshold int32 默认值：80

从不运行图像垃圾收集之前的磁盘使用百分比。垃圾收集到的最低磁盘使用率。值必须在 [0, 100] 范围内，并且不应大于`--image-gc-high-threshold`. （已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--image-service-endpoint 字符串

[实验性] 远程图像服务端点。如果不指定，则`--container-runtime-endpoint`默认相同。Linux 支持 Unix 域套接字，而 Windows 支持 npipe 和 TCP 端点。例子：`unix:///var/run/dockershim.sock`,`npipe:////./pipe/dockershim`

--iptables-drop-bit int32 默认值：15

`fwmark`用于标记要丢弃的数据包的空间位。必须在 [0, 31] 范围内。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--iptables-masquerade-bit int32 默认值：14

`fwmark`为 SNAT 标记数据包的空间位。必须在 [0, 31] 范围内。请将此参数与 中的相应参数匹配`kube-proxy`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--keep-terminated-pod-volumes

在 Pod 终止后，将终止的 Pod 卷保持挂载到节点。可用于调试与卷相关的问题。（已弃用：将在未来版本中删除）

--kernel-memcg-notification

如果启用，kubelet 将与内核 memcg 通知集成，以确定是否超过内存驱逐阈值而不是轮询。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--kube-api-burst int32 默认值：10

与 kubernetes API 服务器对话时突发使用。该数字必须 >= 0。如果为 0，将使用默认突发 (10)。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--kube-api-content-type 字符串默认值：`application/vnd.kubernetes.protobuf`

发送到 apiserver 的请求的内容类型。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--kube-api-qps int32 默认值：5

与 kubernetes API 服务器通信时使用的 QPS。该数字必须 >= 0。如果为 0 将使用默认 QPS (5)。不包括事件和节点心跳 api，它们的速率限制由一组不同的标志控制。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--kube-reserved mapStringString 默认值：<无>

一组`<resource name>=<resource quantity>`（例如`cpu=200m,memory=500Mi,ephemeral-storage=1Gi,pid='100'`）描述为 kubernetes 系统组件保留的资源的对。目前支持`cpu`,`memory`和 local `ephemeral-storage`for root file system。有关更多详细信息，请参见[此处](http://kubernetes.io/docs/user-guide/compute-resources)。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--kube-reserved-cgroup 字符串默认值：`''`

顶级 cgroup 的绝对名称，用于管理通过`--kube-reserved`标志为其保留计算资源的 kubernetes 组件。前任。`/kube-reserved`. （已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--kubeconfig 字符串

kubeconfig 文件的路径，指定如何连接到 API 服务器。提供`--kubeconfig`启用 API 服务器模式，省略`--kubeconfig`启用独立模式。

--kubelet-cgroups 字符串

用于创建和运行 Kubelet 的 cgroups 的可选绝对名称。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--lock-file 字符串

<警告：Alpha 功能> kubelet 用作锁定文件的文件路径。

--log-backtrace-at <A string of format 'file:line'> 默认值：`":0"`

当日志命中 line时，发出堆栈跟踪。（已弃用：将在未来的版本中删除，请参阅[此处](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/2845-deprecate-klog-specific-flags-in-k8s-components)。）`:`[](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/2845-deprecate-klog-specific-flags-in-k8s-components)

--log-dir 字符串

如果非空，则在此目录中写入日志文件。（已弃用：将在未来的版本中删除，请参阅[此处](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/2845-deprecate-klog-specific-flags-in-k8s-components)。）

--日志文件字符串

如果非空，则使用此日志文件。（已弃用：将在未来的版本中删除，请参阅[此处](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/2845-deprecate-klog-specific-flags-in-k8s-components)。）

--log-file-max-size uint 默认值：1800

定义日志文件可以增长到的最大大小。单位是兆字节。如果该值为 0，则最大文件大小不受限制。（已弃用：将在未来的版本中删除，请参阅[此处](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/2845-deprecate-klog-specific-flags-in-k8s-components)。）

--log-flush-frequency 持续时间默认值：`5s`

日志刷新之间的最大秒数。

--log-json-info-buffer-size 字符串默认：`'0'`

[实验性] 在具有拆分输出流的 JSON 格式中，信息消息可以缓冲一段时间以提高性能。零字节的默认值禁用缓冲。大小可以指定为字节数 (512)、1000 的倍数 (1K)、1024 的倍数 (2Ki) 或它们的幂（3M、4G、5Mi、6Gi）。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--log-json-split-stream

[实验性] 在 JSON 格式中，将错误消息写入 stderr，将信息消息写入 stdout。默认是将单个流写入标准输出。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--logging-format string 默认值：`text`

设置日志格式。允许的格式：`text`, `json`.  
非默认格式不支持这些标志：`--add-dir-header`, `--alsologtostderr`, `--log-backtrace-at`, `--log-dir`, `--log-file`, `--log-file-max-size`, `--logtostderr`, `--skip_headers`, `--skip_log_headers`, `--stderrthreshold`, `--log-flush-frequency`。  
非默认选择目前处于 alpha 阶段，如有更改，恕不另行通知。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--logtostderr 默认值：`true`

记录到标准错误而不是文件。（已弃用：将在未来的版本中删除，请参阅[此处](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/2845-deprecate-klog-specific-flags-in-k8s-components)。）

--make-iptables-util-chains 默认：`true`

如果为真，kubelet 将确保`iptables`实用程序规则存在于主机上。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--manifest-url 字符串

用于访问要运行的其他 Pod 规范的 URL（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件进行设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--manifest-url-header 字符串

访问提供给 的 URL 时要使用的 HTTP 标头的逗号分隔列表`--manifest-url`。将按照提供的相同顺序添加具有相同名称的多个标头。该标志可以重复调用。例如：（`--manifest-url-header 'a:hello,b:again,c:world' --manifest-url-header 'b:beautiful'`已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件进行设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--master-service-namespace 字符串默认：`default`

kubernetes 主服务应该从中注入 pod 的命名空间。（已弃用：此标志将在未来版本中删除。）

--max-open-files int 默认值：1000000

Kubelet 进程可以打开的文件数。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--max-pods int32 默认值：110

可以在此 Kubelet 上运行的 Pod 数量。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--maximum-dead-containers int32 默认值：-1

全局保留的容器旧实例的最大数量。每个容器占用一些磁盘空间。要禁用，请设置为负数。（已弃用：使用`--eviction-hard`或`--eviction-soft`代替。将在未来版本中删除。）

--maximum-dead-containers-per-container int32 默认值：1

每个容器保留的旧实例的最大数量。每个容器占用一些磁盘空间。（已弃用：使用`--eviction-hard`或`--eviction-soft`代替。将在未来版本中删除。）

--memory-manager-policy 字符串默认值：`None`

要使用的内存管理器策略。可能的值：`'None'`, `'Static'`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--minimum-container-ttl-duration 持续时间

完成容器在被垃圾收集之前的最小年龄。示例：`'300ms'`, `'10s'`or `'2h45m'`（已弃用：使用`--eviction-hard`or`--eviction-soft`代替。将在未来版本中删除。）

--minimum-image-ttl-duration 持续时间默认值：`2m0s`

未使用图像在被垃圾收集之前的最小年龄。示例：`'300ms'`，`'10s'`或`'2h45m'`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--node-ip 字符串

节点的 IP 地址（或逗号分隔的双栈 IP 地址）。如果未设置，kubelet 将使用节点的默认 IPv4 地址（如果有）或默认 IPv6 地址（如果没有 IPv4 地址）。您可以通过`'::'`使其更喜欢默认的 IPv6 地址而不是默认的 IPv4 地址。

--node-labels mapStringString

<警告：Alpha 功能>在集群中注册节点时要添加的标签。标签必须用`key=value pairs`分隔`','`。命名空间中的标签必须以允许的前缀 ( , )`'kubernetes.io'`开头，或者位于特别允许的集合中 ( , , , , , , , , , , )`'kubelet.kubernetes.io'``'node.kubernetes.io'``'beta.kubernetes.io/arch'``'beta.kubernetes.io/instance-type'``'beta.kubernetes.io/os'``'failure-domain.beta.kubernetes.io/region'``'failure-domain.beta.kubernetes.io/zone'``'kubernetes.io/arch'``'kubernetes.io/hostname'``'kubernetes.io/os'``'node.kubernetes.io/instance-type'``'topology.kubernetes.io/region'``'topology.kubernetes.io/zone'`

--node-status-max-images int32 默认值：50

中报告的最大图像数`node.status.images`。如果`-1`指定，则不会应用上限。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--node-status-update-frequency duration 默认：`10s`

指定 kubelet 将节点状态发布到 master 的频率。注意：更改常量时要小心，它必须`nodeMonitorGracePeriod`在 Node 控制器中使用。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--一个输出

如果为真，则只将日志写入其本机严重级别（与同时写入每个较低的严重级别）。（已弃用：将在未来的版本中删除，请参阅[此处](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/2845-deprecate-klog-specific-flags-in-k8s-components)。）

--oom-score-adj int32 默认值：-999

kubelet 进程的`oom-score-adj`值。值必须在 [-1000, 1000] 范围内。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--pod-cidr 字符串

用于 pod IP 地址的 CIDR，仅在独立模式下使用。在集群模式下，这是从 master 获得的。对于 IPv6，分配的 IP 的最大数量为 65536（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--pod-infra-container-image 字符串默认：`registry.k8s.io/pause:3.6`

指定的图像不会被图像垃圾收集器修剪。当 container-runtime 设置为 时`docker`，每个 pod 中的所有容器都将使用此映像中的网络/IPC 命名空间。其他 CRI 实现有自己的配置来设置此图像。

--pod-manifest-path 字符串

包含要运行的静态 pod 文件的目录的路径，或单个静态 pod 文件的路径。以点开头的文件将被忽略。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--pod-max-pids int 默认值：-1

设置每个 pod 的最大进程数。如果`-1`，则 kubelet 默认为节点可分配的 PID 容量。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--pods-per-core int32

可以在此 kubelet 上运行的每个内核的 Pod 数。此 kubelet 上的 pod 总数不能超过`--max-pods`，因此`--max-pods`如果此计算导致 kubelet 上允许的 pod 数量更多，则将使用。值`0`禁用此限制。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--port int32 默认值：10250

kubelet 服务的端口。（已弃用：此参数应通过 kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--protect-kernel-defaults

用于内核调整的默认 kubelet 行为。如果设置，如果任何内核可调参数与 kubelet 默认值不同，kubelet 会出错。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--provider-id 字符串

用于识别机器数据库中节点的唯一标识符，即云提供商。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--qos-reserved mapStringString

<警告：Alpha 功能> 一组`<resource name>=<percentage>`（例如`memory=50%`）描述如何在 QoS 级别保留 pod 资源请求的对。目前仅`memory`支持。需要`QOSReserved`启用功能门控。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--read-only-port int32 默认值：10255

kubelet 在没有身份验证/授权的情况下服务的只读端口（设置`0`为禁用）。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--register-node 默认值：`true`

向 API 服务器注册节点。如果`--kubeconfig`未提供，则此标志无关紧要，因为 Kubelet 将没有要注册的 API 服务器。（已弃用：此参数应通过 Kubelet 的 --config 标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--register-schedulable 默认值：`true`

将节点注册为可调度节点。`--register-node`如果是，则不会有任何影响`false`。（已弃用：将在未来版本中删除）

--register-with-taints mapStringString

使用给定的污点列表（逗号分隔`<key>=<value>:<effect>`）注册节点。无操作如果`--register-node`是`false`。（已弃用：此参数应通过 Kubelet 的 --config 标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--registry-burst int32 默认值：10

一个 bursted pulls 的最大尺寸，暂时允许 pulls 爆发到这个数量，同时仍然不超过`--registry-qps`。仅在`--registry-qps`大于 0 时使用。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--registry-qps int32 默认值：5

如果 > 0，则将注册表拉取 QPS 限制为此值。若`0`，无限。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--reserved-cpus 字符串

为系统和 kubernetes 使用保留的 CPU 或 CPU 范围的逗号分隔列表。此特定列表将取代`--system-reserved`和中的 cpu 计数`--kube-reserved`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--reserved-memory 字符串

以逗号分隔的 NUMA 节点内存预留列表。（例如`--reserved-memory 0:memory=1Gi,hugepages-1M=2Gi --reserved-memory 1:memory=2Gi`）。每种内存类型的总和应等于 、 和`--kube-reserved`的`--system-reserved`总和`--eviction-threshold`。有关更多详细信息，请参见[此处](https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/#reserved-memory-flag)。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--resolv-conf 字符串默认值：`/etc/resolv.conf`

解析器配置文件，用作容器 DNS 解析配置的基础。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--root-dir 字符串默认值：`/var/lib/kubelet`

用于管理 kubelet 文件（卷挂载等）的目录路径。

--轮换证书

`kube-apiserver`<警告：Beta 功能> 通过在证书到期时请求新证书来自动轮换 kubelet 客户端证书。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--rotate-server-certificates

`kube-apiserver`通过在证书到期时请求新证书来自动请求和轮换 kubelet 服务证书。需要`RotateKubeletServerCertificate`启用功能门控，并批准提交的`CertificateSigningRequest`对象。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--runonce

如果`true`，在从本地清单或远程 url 生成 pod 后退出。独占`--enable-server`（已弃用：此参数应通过 Kubelet 的 --config 标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--runtime-cgroups 字符串

要在其中创建和运行运行时的 cgroups 的可选绝对名称。

--runtime-request-timeout 持续时间默认值：`2m0s`

除长时间运行的请求 - `pull`、`logs`和之外`exec`的所有运行时请求超时`attach`。当超过超时时，kubelet 将取消请求，抛出错误并稍后重试。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--seccomp-默认字符串

<警告：Alpha 功能> 允许使用`RuntimeDefault`作为所有工作负载的默认 seccomp 配置文件。`SeccompDefault`必须启用功能门以允许此标志，默认情况下禁用。

--serialize-image-pulls 默认值：`true`

一次拉取一个图像。我们建议*不要*更改运行版本 < 1.9 的 docker 守护程序或`aufs`存储后端的节点上的默认值。Issue #10959 有更多细节。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--skip-headers

如果`true`，请避免在日志消息中使用标头前缀。（已弃用：将在未来的版本中删除，请参阅[此处](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/2845-deprecate-klog-specific-flags-in-k8s-components)。）

--skip-log-headers

如果`true`，请在打开日志文件时避免标头。（已弃用：将在未来的版本中删除，请参阅[此处](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/2845-deprecate-klog-specific-flags-in-k8s-components)。）

--stderrthreshold int 默认值：2

达到或超过此阈值的日志将转到 stderr。（已弃用：将在未来的版本中删除，请参阅[此处](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/2845-deprecate-klog-specific-flags-in-k8s-components)。）

--streaming-connection-idle-timeout 持续时间默认值：`4h0m0s`

在连接自动关闭之前，流连接可以空闲的最长时间。`0`表示没有超时。例子：`5m`。注意：所有与 kubelet 服务器的连接最长持续时间为 4 小时。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--sync-frequency 持续时间默认值：`1m0s`

同步正在运行的容器和配置之间的最长时间。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--system-cgroups 字符串

可选的 cgroups 绝对名称，其中放置所有不在 cgroup 下的非内核进程`'/'`。空无容器。回滚标志需要重新启动。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--system-reserved mapStringString 默认值：<无>

一组`<resource name>=<resource quantity>`（例如`cpu=200m,memory=500Mi,ephemeral-storage=1Gi,pid='100'`）描述为非 kubernetes 组件保留的资源的对。目前仅支持`cpu`和`memory`。有关更多详细信息，请参见[此处](http://kubernetes.io/docs/user-guide/compute-resources)。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--system-reserved-cgroup 字符串默认：`''`

`--system-reserved`用于管理通过标志保留计算资源的非 kubernetes 组件的顶级 cgroup 的绝对名称。前任。`/system-reserved`. （已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--tls-cert-file 字符串

包含用于服务 HTTPS 的 x509 证书的文件（中间证书，如果有的话，连接在服务器证书之后）。如果`--tls-cert-file`和`--tls-private-key-file`未提供，则会为公共地址生成自签名证书和密钥，并保存到传递给 的目录中`--cert-dir`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--tls-cipher-suites 字符串

服务器的逗号分隔的密码套件列表。如果省略，将使用默认的 Go 密码套件。  
Preferred values: `TLS_AES_128_GCM_SHA256`, `TLS_AES_256_GCM_SHA384`, `TLS_CHACHA20_POLY1305_SHA256`, `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA`, `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`, `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA`, `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`, `TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305`, `TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256`, `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA`, `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`, `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA` , `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`, `TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305`, `TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256`, `TLS_RSA_WITH_AES_128_CBC_SHA`, `TLS_RSA_WITH_AES_128_GCM_SHA256`, `TLS_RSA_WITH_AES_256_CBC_SHA`, `TLS_RSA_WITH_AES_256_GCM_SHA384`  
Insecure values: `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256`, `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA`, `TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA`, `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256`, `TLS_ECDHE_RSA_WITH_RC4_128_SHA`, `TLS_RSA_WITH_3DES_EDE_CBC_SHA`, `TLS_RSA_WITH_AES_128_CBC_SHA256`, `TLS_RSA_WITH_RC4_128_SHA`.  
（已弃用：此参数应通过 Kubelet 的 `--config` 标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--tls-min-version 字符串

支持的最低 TLS 版本。可能的值：`VersionTLS10`、`VersionTLS11`、`VersionTLS12`、`VersionTLS13`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--tls-private-key-file 字符串

包含 x509 私钥匹配的文件`--tls-cert-file`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--topology-manager-policy 字符串默认值：`'none'`

要使用的拓扑管理器策略。可能的值：`'none'`、`'best-effort'`、`'restricted'`、`'single-numa-node'`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--topology-manager-scope 字符串默认：`container`

应用拓扑提示的范围。Topology Manager 从 Hint Provider 收集提示并将它们应用到定义的范围以确保 pod 准入。可能的值：`'container'`, `'pod'`。（已弃用：此参数应通过 Kubelet 的 --config 标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

-v, --v 级别

日志级别详细程度的数字

--version 版本[=true]

打印版本信息并退出

--vmodule <'pattern=N' 字符串列表>

`pattern=N`文件过滤日志记录的逗号分隔设置列表

--volume-plugin-dir 字符串默认值：`/usr/libexec/kubernetes/kubelet-plugins/volume/exec/`

在其中搜索其他第三方卷插件的目录的完整路径。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）

--volume-stats-agg-period 持续时间默认值：`1m0s`

指定 kubelet 计算和缓存所有 pod 和卷的卷磁盘使用率的时间间隔。要禁用体积计算，请设置为`0`。（已弃用：此参数应通过 Kubelet`--config`标志指定的配置文件设置。有关更多信息，请参阅[kubelet-config-file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)。）