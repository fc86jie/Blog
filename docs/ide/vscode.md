### 在 vscode 为配置文件增加语法提示

- webpack.config.js

```javascript
/**
 * 增加下面一行就能导出webpack文件的语法提示
 * @type {import('webpack').Configuration)}
 */
module.exports = {};
```

- vite.config.js

```javascript
/** @type {import('vite').UserConfig} */
export default {};
```
