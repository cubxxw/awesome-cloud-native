
kubernetes 集群不会为你处理数据的存储，我们可以为数据库挂载一个磁盘来确保数据的安全。

---
## 你好
你可以选择云存储、本地磁盘、NFS。

+ 本地磁盘：可以挂载某个节点上的目录，但是这需要限定 pod 在这个节点上运行
+ 云存储：不限定节点，不受集群影响，安全稳定；需要云服务商提供，裸机集群是没有的。
+ NFS：不限定节点，不受集群影响

---
## 好啊
你好![[default/images/Pasted image 20230104204729.png]]


![[default/images/Recording 20230104204445.webm]]

---

![[default/images/Pasted image 20230104204454.png]]