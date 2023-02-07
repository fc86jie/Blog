[[toc]]

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
- 先检查当前项目 node_modules/下，是否存在。不存在的话，就检查全局是否已经安装对应的模块。如果还没有的话，就去仓库里面去
  下载对应的模块，下载完毕就执行。执行完毕就删除

### package.json 中包的版本控制

1. 版本说明：
   > 主版本号.次版本号.修补版本号-预发号 major.minor.patch-pre

- **major**：主要版本，新的架构调整，不兼容老版本
- **minor**：次要版本，新增功能，兼容老版本
- **patch**：修复 bug，兼容老版本

  ```javascript
  "dependencies":{
    // 主要版本是3，次要版本是2，补丁版本是11
     "vue":"3.2.11"
  }
  ```

2. 符号说明：

   ```javascript
       "dependencies":{
         "jquery":"^2.0.0",
         "underscore":"~1.12.0",
         "vue-cli":"3.4.0",
         "vite":"_2.1.0",
         "vue":"_"
       }
   ```

- **^**：表示只锁定主版本号，主版本号确定后，后面获取最新的版本，以上面的 jquery 为例，主版本号 2 确定后，后面会获取在主版本号下最新的版本 2.2.4。

- **~**：表示锁定主版本号和次版本号，后面获取最新的版本，以上面的 underscore 为例，主版本号 1 和次版本号 12 确定后，后面会获取在主次版本号下最新的版本 1.12.4。

- **空**：没有任何符号表示版本锁死了，就是指定的这个版本。以上面的 vue-cli 为例，主版本号、次版本号、补丁号都确定了。
- **\***：表示最新的版本，以上面的 vite 和 vue 为例，它们都是去获取最新的版本。

3. 更新版本号，使用`npm version`命令，执行该命令会同时执行 commit 操作
   - `npm version major -m "description"`：变更主版本，例如`1.0.0`->`2.0.0`
   - `npm version minor -m "description"`：变更次版本，例如`1.0.0`->`1.1.0`
   - `npm version patch -m "description"`：变更补丁版本，例如`1.0.0`->`1.0.1`

### npm pack

执行命令会在当前目录下生成一个 x.tgz 的压缩包（x-nrm-1.0.0.tgz）,该包可以通过`npm install -g ./x.tgz`安装到全局，`package.json`中的 bin 配置中的命令就会变成命令行工具的命令，执行命令会执行相应的代码
