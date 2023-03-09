[[toc]]

### webpack 打包优化

#### 优化构建速度

- 升级新版本
- 优化搜索文件
  - 缩小文件搜索范围
    - 合理使用 `resolve` 功能，resolve.alias、resolve.extensions、resolve.modules 等
    - 配置 loader 时，使用 test、exclude、include 缩小搜索范围
  - 对匹配的文件进行分析、转换。
    - 使用 module.noParse，告诉 webpack 不必解析哪些文件，可以用来排除对非模块化库文件的解析
- 通过 `DllPlugin` 和 `DllReferencePlugin` 避免重复编译第三方库
  - `DllPlugin` ：创建一个 dll-only-bundle，生成一个名为 manifest.json 的文件，用于让 `DllReferencePlugin` 能够映射到相应的依赖上
    - 把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库，这个依赖库不会跟着业务代码一起被重新打包，只有当依赖自身发生变化时才会重新打包
  - `DllReferencePlugin` ：把 dll-only-bundles 引用到需要编译的依赖中
- 使用 `HappyPack` 开启多线程 Loader 转换
  - Loader 对文件的转换操作太耗时，JS 是单线程模型，只能一个一个文件处理，需要通过 `HappyPack` 将任务分解给多个子进程，最终将结果发给主进程，并行处理
- 使用 `ParallelUglifyPlugin` 开启多进程压缩文件 JS 文件
  - 开启多个子进程，每个子进程用 `UglifyJS` 压缩代码，并行执行，缩短时间

#### 优化开发体验

- 开启模块热替换（HMR）：重新编译发生变化的模块，新模块替换老模块，局部刷新，等待时间短

### 优化输出质量

- 压缩文件体积
  - 通过 `DefinePlguin` 区分环境，减少生产代码体积
  - 压缩资源
  - 使用 `TreeShaking` 剔除无用 js 代码
  - 分离第三方库
    - 通过 externals，将第三方库使用 cdn 加载，而不要打包到 bundle 中（缺点：组件库按需加载能力无法支持、不会有 TreeShaking）
    - 通过 `SplitChunksPlugin`
  - gzip 压缩：使用 `CompressionWebpackPlugin`压缩
