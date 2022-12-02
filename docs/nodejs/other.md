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

2. 利用 CommonJS require 方法加载 JSON 文件，createRequire 允许您构造 CommonJS require 方法，以便可以使用典型的 CommonJS 功能

```javascript
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jsonData = require('./a.json');
```

3. import Assertions

```javascript
import jsonData from './a.json' assert { type: 'json' };
```
