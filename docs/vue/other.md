### vue 中动态引入图片为什么要是 require

- public 下的资源：放在 public 文件夹的静态资源都会被简单的复制，
  而不经过 webpack，需要通过绝对路径来引用它们。因为虽然 public 文件不会被编译，但是 src 下的文件都会被编译。由于引入的是 public 下的资源，不会走 require，会直接返回代码中的定义的文件地址，该地址无法在编译后的文件目录（dist 目录）下找到对应的文件，会导致引入资源失败
- src 下的资源：src 目录下的资源会经过 webpack 编译，因为动态添加的 src，编译过后的文件地址和被编译过后的资源文件地址不一致，从而无法正确引入资源。而使用 require，返回的就是资源文件被编译后的文件地址，从而可以正确的引入资源
- 当你在 JavaScript、CSS 或 \*.vue 文件中使用相对路径 (必须以 . 开头) 引用一个静态资源时，该资源将会被包含进入 webpack 的依赖图中。在其编译过程中，所有诸如 <img src=\"...\">、background: url(...) 和 CSS @import 的资源 URL 都会被解析为一个模块依赖。
- [参考链接](https://mp.weixin.qq.com/s/HM8lrZezW5WonPlk74zitQ)
