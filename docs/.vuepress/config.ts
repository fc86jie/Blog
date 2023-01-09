/*
 * @Author: wangrenjie86@gmail.com
 * @Date: 2022-11-14 15:20:39
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2023-01-03 19:41:16
 * @FilePath: \docs\.vuepress\config.ts
 * @Description:
 */

import { defineUserConfig, defaultTheme } from 'vuepress';

export default defineUserConfig({
  lang: 'zh-CN',
  title: '学习笔记', // 标题
  description: '学习笔记', // 标题下的描述
  base: '/Blog/' /* 基础虚拟路径: */,
  dest: 'dist' /* 打包文件基础路径, 在命令所在目录下 */,
  theme: defaultTheme({
    // 主题配置
    sidebar: [
      // 左侧导航
      {
        text: 'Introduction',
        link: '/README.md',
      },
      {
        text: 'JavaScript',
        children: [
          {
            text: '基础',
            link: '/javascript/base.md',
          },
          {
            text: '浏览器常用方法',
            link: '/javascript/browser.md',
          },
          {
            text: '正则表达式',
            link: '/javascript/reg.md',
          },
        ],
      },
      {
        text: 'CSS',
        children: [
          {
            text: '基础',
            link: '/css/base.md',
          },
        ],
      },
      {
        text: 'HTML',
        children: [
          {
            text: '基础',
            link: '/html/base.md',
          },
        ],
      },
      {
        text: 'NPM',
        children: [
          {
            text: '基础',
            link: '/npm/base.md',
          },
        ],
      },
      {
        text: 'NodeJs',
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
        children: [
          {
            text: '链接相关',
            link: '/typescript/link.md',
          },
        ],
      },
      {
        text: 'Vue',
        children: [
          {
            text: '其他',
            link: '/vue/other.md',
          },
        ],
      },
      {
        text: 'React',
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
        children: [
          {
            text: '基础',
            link: '/miniprogram/base.md',
          },
        ],
      },
      {
        text: 'Electron',
        children: [
          {
            text: '基础',
            link: '/electron/base.md',
          },
        ],
      },
      {
        text: '算法',
        children: [
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
    ],
  }),
});
