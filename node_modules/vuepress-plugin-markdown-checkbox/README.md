# vuepress-plugin-markdown-checkbox
## 介绍（Introduction）
这是为 vuepress v2 扩展 markdown 语法的插件。 插件支持扩展 任务列表。

## 安装（Install）

```bash
## vuepress v2
npm i vuepress-plugin-markdown-checkbox -D
```
## 快速使用（Usage）

在`.vuepress/config.js`自行引入插件。

```js
const { defaultTheme } = require('@vuepress/theme-default')
module.exports = {
  plugins: [
    ...,
    require('vuepress-plugin-markdown-checkbox')({})
  ],
  theme: defaultTheme({
    ...,
  })
}
```
在页面中使用`md`支持的tasklist语法：
```text
  - [ ] 任务1
  - [x] 任务2
```
页面展示效果如下：
> ![图](./preview.png)