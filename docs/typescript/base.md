[[toc]]

### 数据类型

```typescript
// 基本类型
let flag: boolean = true;
let num: number = 1;
let str: string = 'string';
let u: undefined = undefined;
let n: null = null;

// 联合类型
let x: number | string = '10';
x = 10;

// 任意类型
let y: any = null;
y = 'hello';

// 数组类型
let arr1: number[] = [1, 2, 3];
let arr2: (number | string)[] = [1, '2', 3];

// 数组泛型
let arr3: Array<number> = [1, 2, 3];
let arr4: Array<number | string> = [1, '2', 3];

// 对象接口类型
interface IObj {
  id: number; // 确定属性
  name?: string; // 可选属性
  [propName: string]: any; // 任意属性
}
let obj: IObj = {
  id: 1,
  name: 'zs',
  fn() {},
};

// 数组对象
interface IList {
  id: number;
  name: string;
}
let list: IList[] = [
  {
    id: 1,
    name: 'zs',
  },
  {
    id: 2,
    name: 'ls',
  },
];

let list2: Array<IList> = [
  {
    id: 1,
    name: 'zs',
  },
  {
    id: 2,
    name: 'ls',
  },
];

// 函数类型
function fn1(x: number, y: number): number {
  return x + y;
}
fn1(1, 2);

function fn2(x: number, y: string): (number | string)[] {
  return [x, y];
}
fn2(1, '2');

// 无返回值类型、可选参数
function fn3(x: number, y?: number): void {}
fn3(1);
```

### 泛型

定义函数、接口或类的时候，不预先指定具体的类型，在使用的时候在指定类型

```typescript
// 泛型函数
function fn<T>(x: T, y: T): T[] {
  return [x, y];
}

fn<number>(1, 2);
// 调用时可以不写，类型推断
fn('1', '2');

// 泛型约束
interface ILength {
  length: number;
}
// 约束T需要有长度属性
function fn<T extends ILength>(v: T): number {
  return v.length;
}

fn('hello');

// 接口定义函数
interface IFn {
  (x: number, y: number): boolean;
}

let fn1: IFn = function (x, y) {
  return x === y;
};

let fn2: IFn = function (x, y) {
  return x > y ? true : false;
};

fn1(2, 2);
fn2(2, 2);

// 泛型接口1
interface IFn {
  <T>(x: T, y: T): boolean;
}

let fn1: IFn = function <T>(x, y) {
  return x === y;
};

let fn2: IFn = function <T>(x, y) {
  return x > y ? true : false;
};

fn1<string>('2', '2');
fn2<number>(2, 2);

// 泛型接口2
interface IFn2<T> {
  (x: T, y: T): boolean;
}

let fn3: IFn2<string> = function (x, y) {
  return x === y;
};

let fn4: IFn2<number> = function (x, y) {
  return x > y ? true : false;
};

fn3('2', '2');
fn4(2, 2);

// 上面的泛型接口1和泛型接口2，定义、使用方式不同
```
