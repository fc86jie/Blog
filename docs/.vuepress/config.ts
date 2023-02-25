/*
 * @Author: wangrenjie86@gmail.com
 * @Date: 2022-11-14 15:20:39
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2023-02-25 20:21:30
 * @FilePath: \docs\.vuepress\config.ts
 * @Description:
 */

import { tocPlugin } from '@mdit-vue/plugin-toc';
import { searchPlugin } from '@vuepress/plugin-search';
import mdItContainer from 'markdown-it-container';
import { defaultTheme, defineUserConfig } from 'vuepress';

export default defineUserConfig({
  lang: 'zh-CN',
  title: '学习笔记', // 标题
  description: '学习笔记', // 标题下的描述
  base: '/Blog/' /* 基础虚拟路径: */,
  dest: 'dist' /* 打包文件基础路径, 在命令所在目录下 */,
  extendsMarkdown: md => {
    md.use(mdItContainer);
    md.use(tocPlugin);
  },
  plugins: [
    searchPlugin({
      // 配置项
    }),
  ],
  theme: defaultTheme({
    colorModeSwitch: true,
    // 主题配置
    sidebar: [
      // 左侧导航
      {
        text: 'Introduction',
        link: '/README.md',
      },
      {
        text: '浏览器相关',
        link: '/browser/base.md',
      },
      {
        text: 'HTML',
        collapsible: true,
        children: [
          {
            text: '基础',
            link: '/html/base.md',
          },
        ],
      },
      {
        text: 'CSS',
        collapsible: true,
        children: [
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
        collapsible: true,
        children: [
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
        collapsible: true,
        children: [
          {
            text: '基础',
            link: '/npm/base.md',
          },
        ],
      },
      {
        text: 'NodeJs',
        collapsible: true,
        children: [
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
        collapsible: true,
        children: [
          {
            text: '链接相关',
            link: '/typescript/link.md',
          },
        ],
      },
      {
        text: 'Vue',
        collapsible: true,
        children: [
          {
            text: '其他',
            link: '/vue/other.md',
          },
        ],
      },
      {
        text: 'React',
        collapsible: true,
        children: [
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
        ],
      },
      {
        text: '微信小程序',
        collapsible: true,
        children: [
          {
            text: '基础',
            link: '/miniprogram/base.md',
          },
        ],
      },
      {
        text: 'Electron',
        collapsible: true,
        children: [
          {
            text: '基础',
            link: '/electron/base.md',
          },
        ],
      },
      {
        text: '工具',
        collapsible: true,
        children: [
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
        collapsible: true,
        children: [
          {
            text: '基础',
            link: '/framework/base.md',
          },
          {
            text: '监控',
            link: '/framework/monitor.md',
          },
        ],
      },
      {
        text: '测试',
        collapsible: true,
        children: [
          {
            text: '基础',
            link: '/test/base.md',
          },
        ],
      },
      {
        text: '算法',
        collapsible: true,
        children: [
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
        collapsible: true,
        children: [
          {
            text: '科学上网',
            link: '/other/surf.md',
          },
        ],
      },
    ],
  }),
});
