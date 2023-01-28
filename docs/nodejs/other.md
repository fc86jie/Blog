[[toc]]

### http-server 启动 https 服务

- 安装 http-server

```sh
npm install -g http-server
```

- 安装 openssl，并设置环境变量，保证 openssl 命令可用
- 使用 openssl 生成 key.pem 和 cert.pem

```sh
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

- 把生成的 key.pem 和 cert.pem 文件放在服务目录，使用如下命令即可启动 https 服务

```sh
http-server -S
```

### 在 ES 模块（Node.js）中导入 JSON 文件

1. 使用 fs 模块读取和解析 JSON 文件

```javascript
import { readFile } from 'fs/promises';
const jsonData = JSON.parse(await readFile('./a.json'));
```

2. 利用 CommonJS require 方法加载 JSON 文件，createRequire 允许您构造 CommonJS require 方法，以便可以使用典型的 CommonJS
   功能

```javascript
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jsonData = require('./a.json');
```

3. import Assertions

```javascript
import jsonData from './a.json' assert { type: 'json' };
```

### 自动重启 node 服务

使 nodemon 执行 node 文件，当文件变更时会自动重启服务`node index.js`

### 如何在 node 中使用 esm？

在 node 中使用 esm 有 2 种方案：

- 在 package.json 中指定 type: "module"，表明模块的类型。此时.js 结尾的默认是 esm，cjs 的文件后缀名要变更为.cjs 才能识别
- 将文件后缀改成.mjs，标明该文件是 esm 模块

### node esm 中\_\_filename、\_\_dirname 怎么获取？

```javascript
// import.meta.url 返回模块的绝对的 `file:` URL。
// url模块中fileURLToPath()函数，返回完全解析的特定于平台的 Node.js 文件路径
// path模块中dirname()函数，返回路径的目录路径
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import.meta.url：file:///D:/project/vite-learn/dev-server/index.mjs
// __filename：D:/project/vite-learn/dev-server/index.mjs
// __dirname：D:/project/vite-learn/dev-server
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```
