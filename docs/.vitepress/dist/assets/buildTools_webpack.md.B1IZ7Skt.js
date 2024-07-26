import{_ as l,c as e,o as i,a4 as a}from"./chunks/framework.BRQpjTab.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"buildTools/webpack.md","filePath":"buildTools/webpack.md","lastUpdated":1678374989000}'),o={name:"buildTools/webpack.md"},c=a('<nav class="table-of-contents"><ul><li><a href="#webpack-打包优化">webpack 打包优化</a></li><li><a href="#优化输出质量">优化输出质量</a></li></ul></nav><h3 id="webpack-打包优化" tabindex="-1">webpack 打包优化 <a class="header-anchor" href="#webpack-打包优化" aria-label="Permalink to &quot;webpack 打包优化&quot;">​</a></h3><h4 id="优化构建速度" tabindex="-1">优化构建速度 <a class="header-anchor" href="#优化构建速度" aria-label="Permalink to &quot;优化构建速度&quot;">​</a></h4><ul><li>升级新版本</li><li>优化搜索文件 <ul><li>缩小文件搜索范围 <ul><li>合理使用 <code>resolve</code> 功能，resolve.alias、resolve.extensions、resolve.modules 等</li><li>配置 loader 时，使用 test、exclude、include 缩小搜索范围</li></ul></li><li>对匹配的文件进行分析、转换。 <ul><li>使用 module.noParse，告诉 webpack 不必解析哪些文件，可以用来排除对非模块化库文件的解析</li></ul></li></ul></li><li>通过 <code>DllPlugin</code> 和 <code>DllReferencePlugin</code> 避免重复编译第三方库 <ul><li><code>DllPlugin</code> ：创建一个 dll-only-bundle，生成一个名为 manifest.json 的文件，用于让 <code>DllReferencePlugin</code> 能够映射到相应的依赖上 <ul><li>把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库，这个依赖库不会跟着业务代码一起被重新打包，只有当依赖自身发生变化时才会重新打包</li></ul></li><li><code>DllReferencePlugin</code> ：把 dll-only-bundles 引用到需要编译的依赖中</li></ul></li><li>使用 <code>HappyPack</code> 开启多线程 Loader 转换 <ul><li>Loader 对文件的转换操作太耗时，JS 是单线程模型，只能一个一个文件处理，需要通过 <code>HappyPack</code> 将任务分解给多个子进程，最终将结果发给主进程，并行处理</li></ul></li><li>使用 <code>ParallelUglifyPlugin</code> 开启多进程压缩文件 JS 文件 <ul><li>开启多个子进程，每个子进程用 <code>UglifyJS</code> 压缩代码，并行执行，缩短时间</li></ul></li></ul><h4 id="优化开发体验" tabindex="-1">优化开发体验 <a class="header-anchor" href="#优化开发体验" aria-label="Permalink to &quot;优化开发体验&quot;">​</a></h4><ul><li>开启模块热替换（HMR）：重新编译发生变化的模块，新模块替换老模块，局部刷新，等待时间短</li></ul><h3 id="优化输出质量" tabindex="-1">优化输出质量 <a class="header-anchor" href="#优化输出质量" aria-label="Permalink to &quot;优化输出质量&quot;">​</a></h3><ul><li>压缩文件体积 <ul><li>通过 <code>DefinePlguin</code> 区分环境，减少生产代码体积</li><li>压缩资源</li><li>使用 <code>TreeShaking</code> 剔除无用 js 代码</li><li>分离第三方库 <ul><li>通过 externals，将第三方库使用 cdn 加载，而不要打包到 bundle 中（缺点：组件库按需加载能力无法支持、不会有 TreeShaking）</li><li>通过 <code>SplitChunksPlugin</code></li></ul></li><li>gzip 压缩：使用 <code>CompressionWebpackPlugin</code>压缩</li></ul></li></ul>',8),d=[c];function n(t,u,r,s,h,p){return i(),e("div",null,d)}const k=l(o,[["render",n]]);export{_ as __pageData,k as default};
