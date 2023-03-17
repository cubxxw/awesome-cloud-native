const e=JSON.parse('{"key":"v-4e3db78c","path":"/Cloud-Native-k8s/54.html","title":"\u7B2C54\u8282 Kubernetes \u751F\u547D\u5468\u671F\u7BA1\u7406\u548C\u670D\u52A1\u53D1\u73B0","lang":"zh-CN","frontmatter":{},"excerpt":"","headers":[{"level":2,"title":"\u6709\u4F55\u4F18\u96C5\u7684\u7BA1\u7406Pod\u751F\u547D\u5468\u671F","slug":"\u6709\u4F55\u4F18\u96C5\u7684\u7BA1\u7406pod\u751F\u547D\u5468\u671F","link":"#\u6709\u4F55\u4F18\u96C5\u7684\u7BA1\u7406pod\u751F\u547D\u5468\u671F","children":[{"level":3,"title":"Pod \u72B6\u6001\u673A","slug":"pod-\u72B6\u6001\u673A","link":"#pod-\u72B6\u6001\u673A","children":[]},{"level":3,"title":"Pod Phase","slug":"pod-phase","link":"#pod-phase","children":[]},{"level":3,"title":"Pod \u72B6\u6001\u8BA1\u7B97\u7EC6\u8282","slug":"pod-\u72B6\u6001\u8BA1\u7B97\u7EC6\u8282","link":"#pod-\u72B6\u6001\u8BA1\u7B97\u7EC6\u8282","children":[]},{"level":3,"title":"\u5982\u4F55\u4FDD\u8BC1 Pod \u7684\u9AD8\u53EF\u7528","slug":"\u5982\u4F55\u4FDD\u8BC1-pod-\u7684\u9AD8\u53EF\u7528","link":"#\u5982\u4F55\u4FDD\u8BC1-pod-\u7684\u9AD8\u53EF\u7528","children":[]},{"level":3,"title":"Pod \u7684 Qos \u5206\u7C7B","slug":"pod-\u7684-qos-\u5206\u7C7B","link":"#pod-\u7684-qos-\u5206\u7C7B","children":[]},{"level":3,"title":"\u57FA\u4E8ETaint\u7684Evictions","slug":"\u57FA\u4E8Etaint\u7684evictions","link":"#\u57FA\u4E8Etaint\u7684evictions","children":[]}]},{"level":2,"title":"\u5065\u5EB7\u68C0\u67E5\u63A2\u9488","slug":"\u5065\u5EB7\u68C0\u67E5\u63A2\u9488","link":"#\u5065\u5EB7\u68C0\u67E5\u63A2\u9488","children":[{"level":3,"title":"\u63A2\u9488\u5C5E\u6027","slug":"\u63A2\u9488\u5C5E\u6027","link":"#\u63A2\u9488\u5C5E\u6027","children":[]},{"level":3,"title":"ReadinessGates","slug":"readinessgates","link":"#readinessgates","children":[]},{"level":3,"title":"Post-start\u548CPre-Stop Hook","slug":"post-start\u548Cpre-stop-hook","link":"#post-start\u548Cpre-stop-hook","children":[]},{"level":3,"title":"terminationGracePeriodSeconds \u7684\u5206\u89E3","slug":"terminationgraceperiodseconds-\u7684\u5206\u89E3","link":"#terminationgraceperiodseconds-\u7684\u5206\u89E3","children":[]},{"level":3,"title":"Terminating Pod\u7684\u8BEF\u7528","slug":"terminating-pod\u7684\u8BEF\u7528","link":"#terminating-pod\u7684\u8BEF\u7528","children":[]},{"level":3,"title":"Terminating Pod\u7684\u7ECF\u9A8C\u5206\u4EAB","slug":"terminating-pod\u7684\u7ECF\u9A8C\u5206\u4EAB","link":"#terminating-pod\u7684\u7ECF\u9A8C\u5206\u4EAB","children":[]}]},{"level":2,"title":"\u5728 k8s \u4E0A\u90E8\u7F72\u5E94\u7528\u7684\u6311\u6218","slug":"\u5728-k8s-\u4E0A\u90E8\u7F72\u5E94\u7528\u7684\u6311\u6218","link":"#\u5728-k8s-\u4E0A\u90E8\u7F72\u5E94\u7528\u7684\u6311\u6218","children":[{"level":3,"title":"\u5B58\u50A8\u5E26\u6765\u7684\u6311\u6218","slug":"\u5B58\u50A8\u5E26\u6765\u7684\u6311\u6218","link":"#\u5B58\u50A8\u5E26\u6765\u7684\u6311\u6218","children":[]},{"level":3,"title":"\u5E94\u7528\u914D\u7F6E","slug":"\u5E94\u7528\u914D\u7F6E","link":"#\u5E94\u7528\u914D\u7F6E","children":[]},{"level":3,"title":"\u6570\u636E\u5E94\u8BE5\u5982\u4F55\u4FDD\u5B58","slug":"\u6570\u636E\u5E94\u8BE5\u5982\u4F55\u4FDD\u5B58","link":"#\u6570\u636E\u5E94\u8BE5\u5982\u4F55\u4FDD\u5B58","children":[]},{"level":3,"title":"\u5BB9\u5668\u5E94\u7528\u53EF\u80FD\u9762\u4E34\u7684\u8FDB\u7A0B\u4E2D\u65AD","slug":"\u5BB9\u5668\u5E94\u7528\u53EF\u80FD\u9762\u4E34\u7684\u8FDB\u7A0B\u4E2D\u65AD","link":"#\u5BB9\u5668\u5E94\u7528\u53EF\u80FD\u9762\u4E34\u7684\u8FDB\u7A0B\u4E2D\u65AD","children":[]},{"level":3,"title":"\u9AD8\u53EF\u7528\u90E8\u7F72\u65B9\u5F0F","slug":"\u9AD8\u53EF\u7528\u90E8\u7F72\u65B9\u5F0F","link":"#\u9AD8\u53EF\u7528\u90E8\u7F72\u65B9\u5F0F","children":[]}]},{"level":2,"title":"\u8BFE\u540E\u4F5C\u4E1A","slug":"\u8BFE\u540E\u4F5C\u4E1A","link":"#\u8BFE\u540E\u4F5C\u4E1A","children":[]},{"level":2,"title":"END \u94FE\u63A5","slug":"end-\u94FE\u63A5","link":"#end-\u94FE\u63A5","children":[]}],"git":{"updatedTime":1678708259000,"contributors":[{"name":"Xinwei Xiong","email":"3293172751nss@gmail.com","commits":1},{"name":"xiongxinwei","email":"3293172751nss@gmail.com","commits":1}]},"filePathRelative":"Cloud-Native-k8s/54.md"}');export{e as data};
