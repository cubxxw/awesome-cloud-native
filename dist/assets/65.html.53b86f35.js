const l=JSON.parse('{"key":"v-f64e6928","path":"/Cloud-Native-k8s/65.html","title":"\u7B2C65\u8282 eBPF \u5228\u6790\u4EE5\u53CA\u6E90\u7801\u5B66\u4E60","lang":"zh-CN","frontmatter":{},"excerpt":"","headers":[{"level":2,"title":"\u5F00\u59CB","slug":"\u5F00\u59CB","link":"#\u5F00\u59CB","children":[]},{"level":2,"title":"\u6539\u53D8\u5185\u6838\u5F88\u56F0\u96BE\uFF1F","slug":"\u6539\u53D8\u5185\u6838\u5F88\u56F0\u96BE","link":"#\u6539\u53D8\u5185\u6838\u5F88\u56F0\u96BE","children":[{"level":3,"title":"\u5411\u5185\u6838\u6DFB\u52A0\u65B0\u529F\u80FD","slug":"\u5411\u5185\u6838\u6DFB\u52A0\u65B0\u529F\u80FD","link":"#\u5411\u5185\u6838\u6DFB\u52A0\u65B0\u529F\u80FD","children":[]},{"level":3,"title":"\u5185\u6838\u6A21\u5757","slug":"\u5185\u6838\u6A21\u5757","link":"#\u5185\u6838\u6A21\u5757","children":[]},{"level":3,"title":"eBPF \u9A8C\u8BC1\u548C\u5B89\u5168","slug":"ebpf-\u9A8C\u8BC1\u548C\u5B89\u5168","link":"#ebpf-\u9A8C\u8BC1\u548C\u5B89\u5168","children":[]},{"level":3,"title":"eBPF \u7A0B\u5E8F\u7684\u52A8\u6001\u52A0\u8F7D","slug":"ebpf-\u7A0B\u5E8F\u7684\u52A8\u6001\u52A0\u8F7D","link":"#ebpf-\u7A0B\u5E8F\u7684\u52A8\u6001\u52A0\u8F7D","children":[]}]},{"level":2,"title":"eBPF \u7A0B\u5E8F","slug":"ebpf-\u7A0B\u5E8F","link":"#ebpf-\u7A0B\u5E8F","children":[{"level":3,"title":"\u9644\u5C5E\u4E8E\u4E8B\u4EF6\u7684\u81EA\u5B9A\u4E49\u7A0B\u5E8F","slug":"\u9644\u5C5E\u4E8E\u4E8B\u4EF6\u7684\u81EA\u5B9A\u4E49\u7A0B\u5E8F","link":"#\u9644\u5C5E\u4E8E\u4E8B\u4EF6\u7684\u81EA\u5B9A\u4E49\u7A0B\u5E8F","children":[]},{"level":3,"title":"\u4ECE\u51FD\u6570\u4E2D\u8FDB\u5165\u6216\u9000\u51FA","slug":"\u4ECE\u51FD\u6570\u4E2D\u8FDB\u5165\u6216\u9000\u51FA","link":"#\u4ECE\u51FD\u6570\u4E2D\u8FDB\u5165\u6216\u9000\u51FA","children":[]},{"level":3,"title":"Tracepoints","slug":"tracepoints","link":"#tracepoints","children":[]},{"level":3,"title":"Perf \u4E8B\u4EF6","slug":"perf-\u4E8B\u4EF6","link":"#perf-\u4E8B\u4EF6","children":[]},{"level":3,"title":"Linux \u5B89\u5168\u6A21\u5757\u63A5\u53E3","slug":"linux-\u5B89\u5168\u6A21\u5757\u63A5\u53E3","link":"#linux-\u5B89\u5168\u6A21\u5757\u63A5\u53E3","children":[]},{"level":3,"title":"\u7F51\u7EDC\u63A5\u53E3\u2014\u2014eXpress Data Path","slug":"\u7F51\u7EDC\u63A5\u53E3\u2014\u2014express-data-path","link":"#\u7F51\u7EDC\u63A5\u53E3\u2014\u2014express-data-path","children":[]},{"level":3,"title":"\u5957\u63A5\u5B57\u548C\u5176\u4ED6\u7F51\u7EDC\u94A9\u5B50","slug":"\u5957\u63A5\u5B57\u548C\u5176\u4ED6\u7F51\u7EDC\u94A9\u5B50","link":"#\u5957\u63A5\u5B57\u548C\u5176\u4ED6\u7F51\u7EDC\u94A9\u5B50","children":[]},{"level":3,"title":"eBPF Map","slug":"ebpf-map","link":"#ebpf-map","children":[]},{"level":3,"title":"Opensnoop \u793A\u4F8B","slug":"opensnoop-\u793A\u4F8B","link":"#opensnoop-\u793A\u4F8B","children":[]},{"level":3,"title":"libbpf-tools Makefile","slug":"libbpf-tools-makefile","link":"#libbpf-tools-makefile","children":[]},{"level":3,"title":"Opensnoop \u7528\u6237\u7A7A\u95F4\u4EE3\u7801","slug":"opensnoop-\u7528\u6237\u7A7A\u95F4\u4EE3\u7801","link":"#opensnoop-\u7528\u6237\u7A7A\u95F4\u4EE3\u7801","children":[]}]},{"level":2,"title":"eBPF \u7684\u590D\u6742\u6027","slug":"ebpf-\u7684\u590D\u6742\u6027","link":"#ebpf-\u7684\u590D\u6742\u6027","children":[{"level":3,"title":"BCC \u5BF9\u53EF\u79FB\u690D\u6027\u7684\u5904\u7406\u65B9\u6CD5","slug":"bcc-\u5BF9\u53EF\u79FB\u690D\u6027\u7684\u5904\u7406\u65B9\u6CD5","link":"#bcc-\u5BF9\u53EF\u79FB\u690D\u6027\u7684\u5904\u7406\u65B9\u6CD5","children":[]},{"level":3,"title":"CO-RE","slug":"co-re","link":"#co-re","children":[]},{"level":3,"title":"Linux \u5185\u6838\u77E5\u8BC6","slug":"linux-\u5185\u6838\u77E5\u8BC6","link":"#linux-\u5185\u6838\u77E5\u8BC6","children":[]}]},{"level":2,"title":"\u7F16\u6392\u591A\u4E2A eBPF \u7A0B\u5E8F","slug":"\u7F16\u6392\u591A\u4E2A-ebpf-\u7A0B\u5E8F","link":"#\u7F16\u6392\u591A\u4E2A-ebpf-\u7A0B\u5E8F","children":[]},{"level":2,"title":"\u4E91\u539F\u751F\u73AF\u5883\u4E2D\u7684 eBPF","slug":"\u4E91\u539F\u751F\u73AF\u5883\u4E2D\u7684-ebpf","link":"#\u4E91\u539F\u751F\u73AF\u5883\u4E2D\u7684-ebpf","children":[{"level":3,"title":"\u6BCF\u53F0\u4E3B\u673A\u4E00\u4E2A\u5185\u6838","slug":"\u6BCF\u53F0\u4E3B\u673A\u4E00\u4E2A\u5185\u6838","link":"#\u6BCF\u53F0\u4E3B\u673A\u4E00\u4E2A\u5185\u6838","children":[]},{"level":3,"title":"eBPF \u4E0E sidecar \u6A21\u5F0F\u7684\u6BD4\u8F83","slug":"ebpf-\u4E0E-sidecar-\u6A21\u5F0F\u7684\u6BD4\u8F83","link":"#ebpf-\u4E0E-sidecar-\u6A21\u5F0F\u7684\u6BD4\u8F83","children":[]},{"level":3,"title":"eBPF \u548C\u8FDB\u7A0B\u9694\u79BB","slug":"ebpf-\u548C\u8FDB\u7A0B\u9694\u79BB","link":"#ebpf-\u548C\u8FDB\u7A0B\u9694\u79BB","children":[]}]},{"level":2,"title":"eBPF \u5DE5\u5177","slug":"ebpf-\u5DE5\u5177","link":"#ebpf-\u5DE5\u5177","children":[{"level":3,"title":"\u7F51\u7EDC","slug":"\u7F51\u7EDC","link":"#\u7F51\u7EDC","children":[]},{"level":3,"title":"\u53EF\u89C2\u6D4B\u6027","slug":"\u53EF\u89C2\u6D4B\u6027","link":"#\u53EF\u89C2\u6D4B\u6027","children":[]},{"level":3,"title":"\u5B89\u5168","slug":"\u5B89\u5168","link":"#\u5B89\u5168","children":[]},{"level":3,"title":"\u7F51\u7EDC\u5B89\u5168","slug":"\u7F51\u7EDC\u5B89\u5168","link":"#\u7F51\u7EDC\u5B89\u5168","children":[]}]},{"level":2,"title":"END \u94FE\u63A5","slug":"end-\u94FE\u63A5","link":"#end-\u94FE\u63A5","children":[]}],"git":{"updatedTime":1679236418000,"contributors":[{"name":"Xinwei Xiong","email":"3293172751nss@gmail.com","commits":1},{"name":"xiongxinwei","email":"3293172751nss@gmail.com","commits":1}]},"filePathRelative":"Cloud-Native-k8s/65.md"}');export{l as data};
