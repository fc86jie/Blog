### 正则表达式小结

```javascript
// 字面量创建
let reg = /\d+/g;
// 构造函数创建（1、\需要转移，2、支持变量）
let reg2 = new RegExp('\\d+', 'g');
let str = '123abc456';
let arr = str.match(reg2);
console.log(arr); // ["123", "456"]

//  一、正则对象下的方法：test、exec
reg.test(str); // true
// exec执行一次返回一次直到返回null，基于lastIndex，执行一次会更新lastIndex，
// 下次执行基于lastIndex查找;
reg.exec(str); // ['123', index: 0, input: '123abc456', groups: undefined]
reg.exec(str); // ['456', index: 6, input: '123abc456', groups: undefined]

// 二、字符串方法：split、search、match、replace
let str2 = 'abc123fda1234rt';
let arr2 = str2.split(1); // ['abc', '23fda', '234rt']
let arr2_1 = str2.split(/\d+/); // ['abc', 'fda', 'rt']

let arr3 = str2.search('a'); // 0 返回第一次匹配的下标
let arr3_1 = str2.search(/a/); // 0 返回第一次匹配的下标，忽略全局匹配
let arr3_2 = str2.search(/z/); // -1 找不到返回-1

// match单个和exec返回结果类似，全局返回数组

str2.replace(/\d/g, '*'); // abc***fda****rt
str2.replace(/\d/g, arg => {
  // abc1*2*3*fda1*2*3*4*rt
  return arg + '*';
});

// =====================================================================================
// 三、元字符
/**
 * 1、字符相关
 *  \w ：数字、字母、下划线
 *  \W ：非（数字、字母、下划线）
 *  \d ：数字
 *  \D ：非（数字）
 *  \s ：空格
 *  \S ：非（空格）
 *  . ：非（换行\n、回车\r、\u2028(行分隔符)、\u2029（段落分隔符））
 * 2、数量相关
 *  {} ：匹配次数e{5}：5次，e{3,6}：3~6次，e{3,}：3次以上
 *  ? ：{0,1}
 *  + ：{0,}
 *  * ：{1,}
 * 3、位置相关
 *  ^ ：开始
 *  $ ：结尾
 *  \b ：边界符（非\w的都是边界符）
 *  \B ：非（边界符）
 * 4、括号相关
 *  () ：分组、提取值、替换、反向引用
 *  [] ：字符集合
 *  {} ：
 * 5、匹配模式
 *  g ：全局匹配
 *  i ：忽略大小写
 *  m ：多行模式
 *  s ：让“.”匹配到换行
 *  u ：匹配unicode
 *  y ：粘性模式
 */

let str4 = '123456789';
let reg4 = /\d{2,4}/g; // 贪婪匹配，最多的匹配
let reg4_1 = /\d{2,4}?/g; // 增加?，惰性匹配，最少的匹配
let res4 = str4.match(reg4); //  ['1234', '5678']
let res4_1 = str4.match(reg4_1); //  ['12', '34', '56', '78']

let str5 = 'this is a book';
let reg5 = /\bis\b/g; // 匹配 is
let res5 = str5.match(reg5); // ["is"]

// 分组
let str6 = 'abababcdef';
let reg6 = /(ab){3}/g; // 匹配ababab
reg6.test(str6);
// 提取值
let str7 = '2022-10-20';
let reg7 = /\d{4}-\d{2}-\d{2}/;
let reg7_1 = /(\d{4})-(\d{2})-(\d{2})/;
let res7 = str7.match(reg7); // ['2022-10-20', index: 0, input: '2022-10-20', groups: undefined]
let res7_1 = str7.match(reg7_1); // ['2022-10-20', '2022', '10', '20', index: 0, input: '2022-10-20', groups: undefined]
let year = RegExp.$1; // "2022"
let month = RegExp.$2; // "10"
let day = RegExp.$3; // "20"
// 替换
let res7_2 = str7.replace(reg7_1, '$1/$2/$3'); // "2022/10/20"
let res7_3 = str7.replace(reg7_1, (arg, year, month, day) => {
  return `${year}/${month}/${day}`;
}); // "2022/10/20"
// 反向引用
let str8 = 'news-container-nav'; // "news_container_nav" // res8 true
// let str8 = "news_container_nav"; // res8 true
// let str8 = "news-container_nav"; // res8 false
let reg8 = /\w{4}(-|_)\w{9}(\1)\w{3}/g; // (\1)第一个()内的值，保证匹配一致
let res8 = reg8.test(str8);

// 字符集合
let str9 = 'My name is LiLei';
// let str9 = "My name is Lilei";
let reg9 = /Li[Ll]ei/g; // LiLei |Lilei
let reg9_1 = /Li[^Ll]ei/g; // LiLei |Lilei
let res9 = reg9.test(str9);

// 多行模式
let str10 = `abc
            def
            ghi`;
let reg10 = /\b\w/gm;
let res10 = str10.replace(reg10, '*'); // '*bc\n      *ef\n      *hi'

// 匹配模式s使用
let str11 = `abc
            def`;
let reg11 = /^a.*f$/gs;
let res11 = reg11.test(str11); // true

// unicode匹配
let str12 = 'a';
let reg12 = /\u{61}/gu; // unicode编码是61的字符
let res12 = reg12.test(str12); // true

// y模式,必须是连续的
let str13 = '123abc456';
let reg13 = /\d/gy;
reg13.exec(str13); // ['1', index: 6, input: '123abc456', groups: undefined]
reg13.exec(str13); // ['2', index: 6, input: '123abc456', groups: undefined]
reg13.exec(str13); // ['3', index: 6, input: '123abc456', groups: undefined]
reg13.exec(str13); // null，非y模式['4', index: 6, input: '123abc456', groups: undefined]，

// 命名分组
let str14 = '2022-10-20';
let reg14 = /(\d{4})-(\d{2})-(\d{2})/;
let reg14_1 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
let res14 = str14.match(reg14); // ['2022-10-20', '2022', '10', '20', index: 0, input: '2022-10-20', groups: undefined]
let res14_1 = str14.match(reg14_1); //  ['2022-10-20', '2022', '10', '20', index: 0, input: '2022-10-20', groups: {year: '2022', month: '10', day: '20'}]

// 正向零宽断言
let str15 = 'iphone7iphone8iphone9iphonenumber';
// 肯定
let reg15 = /iphone(?=\d)/g;
// 否定
let reg15_1 = /iphone(?!\d)/g;
let res15 = str15.replace(reg15, '苹果'); // "苹果7苹果8苹果9iphonenumber"
let res15_1 = str15.replace(reg15_1, '苹果'); // "iphone7iphone8iphone9苹果number"

// 负向零宽断言
let str16 = '10px11px12pxipx';
// 肯定
let reg16 = /(?<=\d+)px/g;
// 否定
let reg16_1 = /(?<!\d+)px/g;
let res16 = str16.replace(reg16, '像素'); // "10像素11像素12像素ipx"
let res16_1 = str16.replace(reg16_1, '像素'); // "10px11px12pxi像素"
```
