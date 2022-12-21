# 基础

### CSS 选择器优先级

1. 基础规则：important > 行内样式 > ID 选择器 > 类选择器 > 元素选择器 > 通配符选择器
2. 详细规则：每一个选择则器可以计算出一个【权重值】，格式为(a,b,c)，优先比较 a，在比较 b，在比较 c，相同权重后面的优先级高于前面的（不包含 important）
   - a 表示：一个选择器中【ID】选择器的个数
   - b 表示：一个选择器中【类、伪类、属性】选择器的个数
   - c 表示：一个选择器中【元素、伪元素】选择器的个数

```html
<style>
  /* 类：a、list */
  /* 元素：div、ul、li */
  /* 权重值(0,2,3) */
  div.a ul.list li {
    color: red;
  }

  /* 类：a */
  /* 元素：div、ul、li */
  /* 权重值(0,1,3) */
  div.a > ul > li {
    color: blue;
  }

  /* 类：a ，属性：a="aul"*/
  /* 元素：ul、li */
  /* 权重值(0,2,2) */
  .a ul[a='aul'] > li {
    color: green;
  }
</style>
<div class="a">
  <h2>A</h2>
  <ul class="list" a="aul">
    <li>A1</li>
    <li>A2</li>
    <li>A3</li>
  </ul>
</div>
<div class="b">
  <h2>B</h2>
  <ul class="list">
    <li>B1</li>
    <li>B2</li>
    <li>B3</li>
  </ul>
</div>
```
