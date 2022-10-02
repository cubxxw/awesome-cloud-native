/*
 * @Description: docker的配置
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-09-14 11:48:44
 * @LastEditTime: 2022-09-30 18:05:41
 * @FilePath: \.vuepress\config.ts
 * @blog: https://nsddd.top
 */
import { defaultTheme } from 'vuepress'
/* 导入插件 */
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top' 
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { searchPlugin } from '@vuepress/plugin-search'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { tocPlugin } from '@vuepress/plugin-toc'

// import { mdEnhancePlugin } from "vuepress-plugin-md-enhance"
export default {
  //注意，此处需要填写你部署在nginx下的文件夹名称，如果是根目录，那么可以注释掉此行，注释掉后本地打开index.html无法访问
  base: "/awesome-docker/",
  dest: '../blog/dist',
  lang: 'zh-CN',
  port: 8888,  //设置端口号
  title: '你好',  //主页
  description: '链学社致力于打造出区块链去中心化的学习平台',
   // sidebarDepth:2,   //默认显示H1 H2
  head:[
    ["link",{rel:"icon",href:"/img/1.jpg"}]
    //设置网站seo标志
  ],
  plugins: [
    backToTopPlugin(),  //返回顶端按钮
    externalLinkIconPlugin({  //链接图标
        locales: {
          '/': {
            openInNewWindow: 'open in new window',
          },
          '/zh/': {
            openInNewWindow: '在新窗口打开',
          },
        },
      }),
    //   mdEnhancePlugin({
    //     // 启用任务列表
    //     tasklist: true,
    //   }),
 
     mediumZoomPlugin({
        // 配置项 --图片缩放
      }),
      searchPlugin({
        // 配置项  -- 轻量搜索
      }),      
      docsearchPlugin({
        // 配置项 配置上申请下来的 apiKey、indexName、appId
        apiKey: '661a2d8409a1b3e5ae62094dca33f10d',
        indexName: 'awesome-docker',
        appId: 'LIPIDXUN7V',
        placeholder: '搜索文档',
        translations: {
          button: {
            buttonText: '搜索文档',
          },
        }
    }),
      prismjsPlugin({
        // 配置项  -- 语法高亮
      }),
    //  shikiPlugin({
    //  // 配置项    -- 代码块高亮
    // }),
    tocPlugin({
        // 配置项  -- toC目录
      }),

    ],
    theme: defaultTheme({
        //更新时间
        // lastUpdated: 'Last Updated',
        sidebarDepth: 3,  //侧边菜单深度
    
        //logo -- 夜间和白剑
        logoDark: 'https://sm.nsddd.top//typora/1.jpg?mail:3293172751@qq.com',
        logo: 'https://sm.nsddd.top//typora/4.png?mail:3293172751@qq.com',
        
        // 到github修改页面 如果你按照 `organization组织/repository存储库` 的格式设置它
        // 我们会将它作为一个 GitHub 仓库
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        // 你也可以直接将它设置为一个 URL
        repo: '3293172751/awesome-docker',
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏', 
        // 导航栏
        navbar: [
            {
                text: '🤵关于我',
                children: [
                  {
                    text: 'Github仓库',
                    link: 'https://github.com/3293172751/cs-awesome-Block_Chain',
                    // 该元素将一直处于激活状态
                    activeMatch: '/',
                  },
                  {
                    text: '我的博客',
                    link: 'http://nsddd.top',
                    // 该元素将一直处于激活状态
                    activeMatch: '/',
                  },
                  {
                    text: '知乎',
                    link: 'https://www.zhihu.com/people/3293172751',
                    // 该元素将一直处于激活状态
                    activeMatch: '/',
                  },
                ],
            },
            {
              text: '🏠首页',
              link: '/',
            },
            {
              text: '⛓️链学社组织',
              link: 'https://github.com/C-UB/'
            }
          ],
          
        // 默认主题配置
        sidebar:[
            {
                text: '🏠回到主页',
                link: '/', 
            },
            // SidebarItem
            {
                text: '☁️DocCub云盘地址',
                link: 'http://xxw.nsddd.top/s/q2FP?path=%2F'
            },
            {
              text: '📚Docker学习篇',
              link: '/markdown/',
              children: [
                // SidebarItem
                '/markdown/1.md',
                '/markdown/2.md',
                '/markdown/3.md',
                '/markdown/4.md',
                '/markdown/5.md',
                '/markdown/6.md',
                '/markdown/7.md',          
                '/markdown/8.md',
                '/markdown/9.md',
                '/markdown/10.md',
                '/markdown/11.md',
                '/markdown/12.md',
                '/markdown/13.md',
                '/markdown/14.md',
                '/markdown/15.md',
                '/markdown/16.md',
                '/markdown/17.md',          
                '/markdown/18.md',
                '/markdown/19.md',
                '/markdown/20.md',
                '/markdown/21.md',
                '/markdown/22.md',
                '/markdown/23.md',
                '/markdown/24.md',
                '/markdown/25.md',
                '/markdown/26.md',
                '/markdown/27.md',          
                '/markdown/28.md',
                '/markdown/29.md',
                '/markdown/30.md',
                '/markdown/31.md',
                '/markdown/32.md',
                '/markdown/33.md',
                '/markdown/34.md',
                '/markdown/35.md',
                '/markdown/36.md',
                '/markdown/37.md',          
                '/markdown/38.md',
                '/markdown/39.md',
                '/markdown/40.md',
                '/markdown/41.md',
                '/markdown/42.md',
                '/markdown/43.md',
                '/markdown/44.md',
                // 字符串 - 页面文件路径
                // '/foo/bar.md',
                {
                    text: '💝如何参与贡献？',
                    link: 'https://nsddd.top/archives/contributors',
                  //   children: [],
                },
              ],
            },
          ],
  }),
}