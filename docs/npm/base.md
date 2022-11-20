### npm init

```sh
npm init 包名 等效于 npx create-包名
npm init @命名空间 等效于 npx @命名空间/create
npm init @命名空间/包名 等效于 npx @命名空间/create-包名
npm init -y 生成默认的package.json

npm create vite my-vue-app --template vue === npx create-vite my-vue-app --template vue
使用npx安装create-vite,执行create-vite命令使用vue模板创建my-vue-app项目
npm create是 npm init 的别名
```

### npx

- npx 非常智能的识别模块，如果模块存在，就使用。如果不存在，就临时下载，用完就删除
- 先检查当前项目 node_modules/下，是否存在。不存在的话，就检查全局是否已经安装对应的模块。如果还没有的话，就去仓库里面去下载对应的模块，下载完毕就执行。执行完毕就删除
