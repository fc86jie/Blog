[[toc]]

### SCSS 语法扩展

```scss
.container {
  // 选择器嵌套
  a {
    // 父选择器嵌套
    &:hover {
      color: red;
    }
  }
  &-left {
    color: red;
  }
  // 属性选择器嵌套，此处必须有空格`font {`
  font {
    size: 14px;
    weight: bold;
  }
}

// 占位符选择器
.button%base {
  width: 100px;
  height: 20px;
}

.button-default {
  @extend %base;
  color: #333;
}

.button-success {
  @extend %base;
  color: #fff;
}

// 编译之后
.container {
  font-size: 14px;
  font-weight: bold;
}
.container a:hover {
  color: red;
}
.container-left {
  color: red;
}

.button.button-default,
.button.button-success {
  width: 100px;
  height: 20px;
}

.button-default {
  color: #333;
}

.button-success {
  color: #fff;
}
```

### 变量

- 变量以美元符号($)开头，后面跟变量名
- 不以数字开头，包含字母、数字、下划线、横线（连接符）
- 先定义后使用
- 通过连接符和下划线定义的同名变量是为同一个变量
- 定义的局部变量只能在选择器范围内使用

```scss
// 定义变量
$color: #f00;
// $border-color和$border_color是同一个变量，后定义的覆盖先定义的
$border-color: #f00;
$border_color: #0f0;

.container {
  // 增加!global强制到全局
  $font-size: 16px !global;
}

$layer-index: 10;
$border-width: 1px;
$font-base-family: 'Open Sans', Helvetica;
$color: rgba(255, 177, 168, 0.8);
$blank-mode: true;
$var: null; // 缺少值，函数返回缺少结果
$color-map: (
  color1: red,
  color2: green,
);

.container {
  @if $blank-mode {
    background-color: red;
  } @else {
    background-color: green;
  }
  content: type-of($var);
  content: length($var);
  color: map-get($color-map, color2);
}

$color: #333;
// 如果之前有定义$color使用定义的$color，没有则使用默认的
$color: #666 !default;
```

### import 导入

一下几种方式的导入都将作为普通的 css 导入，不会导入其他的 sass 文件

1. 文件扩展名是`.css`，`@import "public.css"`
2. 文件名以`http://`开头，`import url(public)`
3. 文件名是 url()，`import "http://xxx.com/xxx"`
4. import 包含 media queries，`import 'landscape' screen and (orientation:landscape)`

如果不想导出某个文件，使用下划线开头`_theme.scss`

```scss
// _theme.scss
$color: red;

// index.scss
@import '_theme.scss';
.container {
  color: $color;
}

// 编译之后
.container {
  color: red;
}
```

### mixin

```scss
@mixin block {
  width: 100px;
  height: 30px;
}

.container {
  @include block;
}

// 编译之后
.container {
  width: 100px;
  height: 30px;
}

@mixin block2 {
  .middle {
    width: 100px;
    height: 30px;
  }
}

.container2 {
  @include block2;
}

// 编译后
.container2 {
  .middle {
    width: 100px;
    height: 30px;
  }
}

// 传递参数
// @mixin flex-align($color) {
// 带默认参数
@mixin flex-align($color: green) {
  color: $color;
  background-color: $color;
}

.container3 {
  @include flex-align(red);
  // 指定参数名传参，多个参数时不需要顺序一致
  // @include flex-align($color: red);
}

// 编译后
.container3 {
  color: red;
  background-color: red;
}

//定义线性渐变
// @param $direction 方向
// @param $gradients 颜色过渡值列表
@mixin linear-gradient($direction, $gradients...) {
  // nth从$gradients数组里取第一个
  color: nth($gradients, 1);
  background-image: linear-gradient($direction, $gradients);
}

.container {
  @include linear-gradient(to right, red, orange, yellow);
}

// 编译后
.container {
  color: red;
  background-image: linear-gradient(to right, red, orange, yellow);
}
```

### 插值语句

```scss
$font-size: 12px;
$font-height: 30px;
p {
  font: #{$font-size}/ $font-height Helvetica;
}

// 编译后
p {
  font: 12px/30px $font-height Helvetica;
}

$class-name: danger;
$attr: color;
a.#{class-name} {
  border-#{attr}: red;
}
// 编译后
a.danger {
  border-color: red;
}
```

### @use

- `@use`引入同一个文件多次不会重复，`@import`会重复
- `@use`引入的文件都是模块，默认以文件名作为模块名，可以通过`as alias`重命名
- `@use`引入多个文件时，每个文件都是单独的模块，相同变量名不会覆盖，通过模块名访问。`@import`变量会覆盖
- `@use`可以通过`@use 'xxx' as *`取消命名空间
- `@use`内部可以通过`$-`或`$_`定义私有成员，`-`和`_`开头的变量、mixin、函数不会被引入
- `@use`内模块变量可以通过`!default`定义默认值,引入的通过`with(...)`的方式修改
