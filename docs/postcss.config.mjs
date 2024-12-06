/*
 * @Author: wangrenjie86@gmail.com
 * @Date: 2024-12-06 16:51:03
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2024-12-06 16:51:06
 * @FilePath: /docs/postcss.config.mjs
 * @Description:
 */
import { postcssIsolateStyles } from 'vitepress';

export default {
  plugins: [postcssIsolateStyles()],
};
