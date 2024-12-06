/*
 * @Author: wangrenjie86@gmail.com
 * @Date: 2024-12-06 16:55:14
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2024-12-06 16:55:16
 * @FilePath: /docs/.vitepress/config.mts
 * @Description:
 */

import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: '学习笔记',
  description: '学习笔记',
  base: '/Blog/' /* 基础虚拟路径: */,
  lastUpdated: true /* 是否显示最后更新时间 */,
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [],
    sidebar: [
      // 左侧导航
      {
        text: '浏览器相关',
        collapsed: true,
        items: [
          {
            text: '基础',
            link: '/browser/base.md',
          },
          {
            text: '链接相关',
            link: '/browser/link.md',
          },
        ],
      },
      {
        text: 'HTML',
        collapsed: true,
        items: [
          {
            text: '基础',
            link: '/html/base.md',
          },
        ],
      },
      {
        text: 'CSS',
        collapsed: true,
        items: [
          {
            text: '基础',
            link: '/css/base.md',
          },
          {
            text: 'SASS',
            link: '/css/scss.md',
          },
        ],
      },
      {
        text: 'JavaScript',
        collapsed: true,
        items: [
          {
            text: '基础',
            link: '/javascript/base.md',
          },
          {
            text: '正则表达式',
            link: '/javascript/reg.md',
          },
        ],
      },
      {
        text: 'NPM',
        collapsed: true,
        items: [
          {
            text: '基础',
            link: '/npm/base.md',
          },
        ],
      },
      {
        text: 'NodeJs',
        collapsed: true,
        items: [
          {
            text: '链接相关',
            link: '/nodejs/link.md',
          },
          {
            text: '其他',
            link: '/nodejs/other.md',
          },
        ],
      },
      {
        text: 'TypeScript',
        collapsed: true,
        items: [
          {
            text: '基础',
            link: '/typescript/base.md',
          },
          {
            text: '链接相关',
            link: '/typescript/link.md',
          },
        ],
      },
      {
        text: 'Vue',
        collapsed: true,
        items: [
          {
            text: '设计与实现',
            link: '/vue/advanced.md',
          },
          {
            text: '其他',
            link: '/vue/other.md',
          },
        ],
      },
      {
        text: 'React',
        collapsed: true,
        items: [
          {
            text: '基础',
            link: '/react/base.md',
          },
          {
            text: 'Hooks',
            link: '/react/hooks.md',
          },
          {
            text: 'Router',
            link: '/react/router.md',
          },
          {
            text: 'Redux',
            link: '/react/redux.md',
          },
        ],
      },
      {
        text: '构建工具',
        collapsed: true,
        items: [
          {
            text: 'webpack',
            link: '/buildTools/webpack.md',
          },
        ],
      },
      {
        text: '小程序',
        collapsed: true,
        items: [
          {
            text: '基础',
            link: '/miniProgram/base.md',
          },
          {
            text: 'uni-app',
            link: '/miniProgram/uniApp.md',
          },
        ],
      },
      {
        text: 'Electron',
        collapsed: true,
        items: [
          {
            text: '基础',
            link: '/electron/base.md',
          },
        ],
      },
      {
        text: '工具',
        collapsed: true,
        items: [
          {
            text: 'VSCODE',
            link: '/tools/vscode.md',
          },
          {
            text: 'GIT',
            link: '/tools/git.md',
          },
        ],
      },
      {
        text: '前端架构',
        collapsed: true,
        items: [
          {
            text: '基础',
            link: '/framework/base.md',
          },
          {
            text: '监控',
            link: '/framework/monitor.md',
          },
          {
            text: '性能优化',
            link: '/framework/performance.md',
          },
        ],
      },
      {
        text: '测试',
        collapsed: true,
        items: [
          {
            text: '基础',
            link: '/test/base.md',
          },
        ],
      },
      {
        text: '算法',
        collapsed: true,
        items: [
          {
            text: '基础',
            link: '/algorithm/base.md',
          },
          {
            text: 'LeetCode 刷题攻略',
            link: 'https://github.com/youngyangyang04/leetcode-master',
          },
          {
            text: '十大排序算法',
            link: 'https://github.com/hustcc/JS-Sorting-Algorithm',
          },
        ],
      },
      {
        text: '杂项',
        collapsed: true,
        items: [
          {
            text: '科学上网',
            link: '/other/surf.md',
          },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/fc86jie/Blog/' }],
  },
});
