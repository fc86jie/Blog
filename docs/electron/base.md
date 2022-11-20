### Electron 安装

```sh
// 设置淘宝源
npm config set ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
npm config set ELECTRON_CUSTOM_DIR="{{ version }}"
// 安装
npm install electron --save-dev
// 测试是否安装成功
npx electron
```

### windows 下控制台中文乱码问题

```sh
// package.json中，运行之前增加 chcp 65001
{
  "scripts": {
    "start": "chcp 65001 && electron ."
  },
}

```

### 打包

```sh
// 安装打包分发工具
npm install --save-dev @electron-forge/cli
// 初始化 electron-forge
npx electron-forge import
// 打包
npm run make
```

### 在渲染进程中使用 nodejs

```javascript
new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    // 需要设置下面2项才能直接在渲染进程中使用nodejs
    nodeIntegration: true,
    contextIsolation: false,
  },
});
```

### 在渲染进程中打开新窗口

- 安装 @electron/remote

```sh
npm install --save @electron/remote
```

- 在主进程中初始化 remote 模块

```javascript
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // 初始化
  require('@electron/remote/main').initialize();
  require('@electron/remote/main').enable(win.webContents);
};
```

- 渲染进程中获取 BrowserWindow

```javascript
const { BrowserWindow } = require('@electron/remote');
```
