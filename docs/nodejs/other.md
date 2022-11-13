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
