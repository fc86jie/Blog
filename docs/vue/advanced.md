[[toc]]

### 命令式和声明式

- 命令式：关注过程，命令式代码的更新性能消耗 = 直接修改的性能消耗
- 声明式：关注结果，声明式代码的更新性能消耗 = 找出差异的性能消耗 + 直接修改的性能消耗

```javascript
// 命令式
const div = document.querySelector('#app') // 获取 div
02 div.innerText = 'hello world' // 设置文本内容
03 div.addEventListener('click', () => { alert('ok') }) // 绑定点击事件

// 声明式
<div @click="() => alert('ok')">hello world</div>
```

声明式代码的性能不优于命令式代码的性能，框架本身就是封装了命令式代码才实现了面向用户的声明式

| 原生 JavaScript        | 虚拟 DOM                        | innerHTML                      |
| ---------------------- | ------------------------------- | ------------------------------ |
| 纯 JavaScript 运算     | 创建新的 JavaScript 对象 + Diff | 渲染 HTML 字符串               |
| DOM 运算               | 必要的 DOM 更新                 | 销毁所有旧 DOM，新建所有新 DOM |
| 性能因素               | 与数据变化量相关                | 与模板大小相关                 |
| 心智负担大，可维护性差 | 心智负担小，可维护性强          | 心智负担中等                   |
| 性能高                 | 性能中等                        | 性能低                         |

### 运行时和编译时

- 运行时：能够直接运行，没办法分析用户提供的内容
- 编译时：需要通过编译器编译之后在运行的，编译的时候可以分析用户提供的内容（比如，哪些是变化的，哪些是不变的），做优化

vue3 是编译时+运行时

### Tree-Shaking

消除那些永远不会被执行的代码，模块必须是 ESM（ES Module），因为 Tree-Shaking 依赖 ESM 的静态结构。可以使用注释代码 `/_#**PURE**_/`告诉工具（rollup 等），可以移除。

```javascript
import { foo } from './utils';
/*#__PURE__*/ foo();
```

### vue3 编译优化

编译优化指的是通过编译的手段提取关键信息，并以此指导生成最优代码的过程。核心在于，区分动态节点与静态节点。vue3 中做了如下优化：

- Block Tree：一个 Block 本质上也是一个虚拟节点，但与普通虚拟节点相比，会多出一个 `dynamicChildren` 数组。该数组用来收集所有动态子代节点。`dynamicChildren` 数组中收集的动态节点是忽略虚拟 DOM 树层级的。换句话说，结构化指令会导致更新前后模板的结构发生变化，即模板结构不稳定。所谓结构不稳定，从结果上看，指的是更新前后一个 block 的 `dynamicChildren` 数组中收集的动态节点的数量或顺序不一致。Block 会搜集子 Block 形成 Block Tree
  - 组件模板的根节点必须作为 Block
  - 带有结构化指令的节点，如带有 `v-if` 和 `v-for` 等指令的节点，都应该作为 Block
- patchFlag：为动态节点打上补丁标志，标记节点类型
- 静态提升：静态节点只创建一次，下次更新直接获取，能够减少更新时创建虚拟 DOM 带来的性能开销和内存占用。
- 预字符串化：在静态提升的基础上，对静态节点进行字符串化。这样做能够减少创建虚拟节点产生的性能开销以及内存占用。
- 缓存内联事件处理函数：避免造成不必要的组件更新。
- v-once 指令：缓存全部或部分虚拟节点，能够避免组件更新时重新创建虚拟 DOM 带来的性能开销，也可以避免无用的 Diff 操
  作。