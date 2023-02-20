[[toc]]

### 选择排序

第一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，然后再从剩余的未排序元素中寻找到最小（大）元素，然后放到已排序的序列的末尾。以此类推，直到全部待排序的数据元素的个数为零

```javascript
function selectSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }

  for (let i = 0; i < arr.length; i++) {
    // 记录最小的位置
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex;
    }
    // 交换
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  return arr;
}
```

### 冒泡排序

冒泡排序就是把小的元素往前调或者把大的元素往后调

```javascript
function bubbleSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  for (let i = arr.length; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}
```

### 插入排序

在待排序的元素中，假设前面 n-1(其中 n>=2)个数已经是排好顺序的，现将第 n 个数插到前面已经排好的序列中，然后找到合适自己的位置，使得插入第 n 个数的这个序列也是排好顺序的

```javascript
function insertSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }

  for (let i = 1; i < arr.length; i++) {
    let curIndex = i;
    while (curIndex - 1 >= 0 && arr[curIndex - 1] > arr[curIndex]) {
      [arr[curIndex - 1], arr[curIndex]] = [arr[curIndex], arr[curIndex - 1]];
      curIndex--;
    }
  }

  return arr;
}

function insertSort2(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }

  for (let i = 1; i < arr.length; i++) {
    for (let prev = i - 1; prev >= 0 && arr[prev] > arr[prev + 1]; prev--) {
      [arr[prev], arr[prev + 1]] = [arr[prev + 1], arr[prev]];
    }
  }

  return arr;
}
```

### 高频率查询数组从 L~R 位置的累加和

- 设计一个二维数组，把所有 L~R 的值计算出来做成 map，需要计算的时候直接取
- 一个一维数组 arr，存储 0~index 位置上的累加和，需要计算的时候使用 arr[R]-arr[L-1]（L>=1）即可

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7];

function getSum(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  let sumArr = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    sumArr[i] = sumArr[i - 1] + arr[i];
  }
  return sumArr;
}

let sumArr = getSum(arr);

function getSumByIndex(l, r) {
  return l === 0 ? sumArr[r] : sumArr[r] - sumArr[l - 1];
}
```

### Math.random()算法应用

1. 从 1-5 随机到 1-7 随机

   ```javascript
   // 题目：从 1-5 随机到 1-7 随机
   // 思路：
   // step1：利用 f1 函数得到一个 0,1 等概率 f2 函数
   // step2:用 3 个二进制位表示，每个二进制位调用一个 f2 得到 0~7 等概率 f3 函数
   // step3: 调用 f3 函数，如果得到 7 就重新调用，否则就返回 ，得到 0~6 等概率 f4 函数
   // step4：f4 函数加一

   //等概率随机返回 1，2，3，4，5
   function f1() {
     return Math.random() * 5 + 1;
   }

   // 随机机制，只能用f1
   // 概率返回0和1
   // 思路：
   // 由于f1是等概率返回1，2，3，4，5 ，
   // 调用f1,如果得到1，2则返回0，得到4,5 则返回1，得到3 则重新调用

   function f2() {
     let res = 0;
     do {
       res = f1();
     } while (res == 3);
     return res < 3 ? 0 : 1;
   }

   //得到二进制位 000~111 做到等概率， 即 0~7等概率返回
   function f3() {
     let res = (f2() << 2) + (f2() << 1) + (f2() << 0);
     return res;
   }

   //0~6等概率返回一个
   function f4() {
     let res = 0;
     do {
       res = f3();
     } while (res == 7);
     return res;
   }

   function g() {
     return f4() + 1;
   }
   ```

2. 从 a-b 随机到 c-d 随机
   由 a-b 随机得到 0，1 等概率，即如果 b-a+1 是奇数，则调该函数，如果得到前一半数字返回 0，得到后一半数字返回 1，得到中间的一个数则重新调，就得到了 0，1 等概率

   1. 要得到 c-d 随机，可以先得到 0-（d-c）随机，然后再加 c,就得到了 0-d 随机
   2. 要得到 0 - （d-c）随机 就要看需要几个二进制位了，1 个二进制位可以得到 0-2 随机，两个二进制位可以得到 0，3（2^0+2^1）随机，三个二进制位可以得到 0，7（2^0+2^1+2^2）随机，·····
   3. 然后做 do,while 多余的部分，重新调，否则就返回，得到 0 - （d-c）随机
   4. 加 c ,得到 c-d 随机

3. 01 不等概率随机到 01 等概率随机

   ```javascript
   // 题目：01不等概率随机到01等概率随机 ， 例如x()函数，以p概率返回0，以1-p概率返回1，
   // 思路：
   // 用两个二进制位表示，调用两次f()函数，如果得到00（概率是p*p）,重新调，如果得到11（概率是(1-p)*(1-p)）重新调，
   // 如果得到01（概率是p*(1-p)）返回0，如果得到10（概率是(1-p)*p）返回1
   // 由于 01（概率是p*(1-p)） 和10（概率是(1-p)*p） 是等概率的,所以只在这两种情况返回0或1,其他情况则重新调
   // 例如有一个函数x(),你只知道，x会以固定概率返回0和1，但是x的内容，你看不到

   function fn1() {
     return Math.random() < 0.85 ? 0 : 1;
   }

   function fn2() {
     let res = 0;
     // 连续2次随机到0或者1的重新随机
     do {
       res = fn1();
     } while (res === fn1());
     return res;
   }
   ```

4. 任意的 x,x 属于[0,1),[0,1)范围内出现的数由原来的 x 调整成 x 的平方

   ```javascript
   // 返回[0,1)范围内的一个数
   // 任意的x,x属于[0,1),[0,1)范围内出现的数由原来的x调整成x的平方
   function fn() {
     return Math.max(Math.random(), Math.random());
   }
   ```

5. 随机样本产生器

   ```javascript
   // 随机生成一个指定长度，指定最大值的数组
   // @param maxSize
   // @param maxValue
   function generateRandomArray(maxSize, maxValue) {
     let len = parseInt(Math.random() * maxSize + 1);
     let arr = [];
     for (let i = 0; i < len; i++) {
       arr[i] = parseInt(Math.random() * maxValue) + 1;
     }
     return arr;
   }
   ```

### 二分法

```javascript
// 在有序数组arr中找num
// @param {*} arr
// @param {*} num
// @returns

function findNum(arr, num) {
  if (!arr) {
    return false;
  }
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    let mid = l + ((r - l) >> 1);
    if (arr[mid] === num) {
      return true;
    } else if (arr[mid] < num) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return false;
}

// 找到有序数组中>=num最左的位置
// @param {*} arr
// @param {*} num
// @returns
function findLeftIndex(arr, num) {
  let leftIndex = -1;
  if (!arr || arr.length === 0) {
    return -1;
  }
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    let mid = l + ((r - l) >> 1);
    if (arr[mid] >= num) {
      leftIndex = mid;
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return leftIndex;
}

// 找到有序数组中<=num最右边的位置
// @param {*} arr
// @param {*} num
// @returns
function findRightIndex(arr, num) {
  let rightIndex = -1;
  if (!arr || arr.length === 0) {
    return -1;
  }
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    let mid = l + ((r - l) >> 1);
    if (arr[mid] <= num) {
      rightIndex = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return rightIndex;
}

// 给定一个数组，相邻不相等，找到一个局部最小值下标，没有返回-1
// 局部最小定义
// 1. arr[0] < arr[1]，arr[0]就是局部最小
// 2. arr[len-1] < arr[len-2], arr[len-1]就是局部最小
// 3. arr[i]<arr[i-1] && arr[i]<arr[i+1], arr[i]就是局部最小
// @param {*} arr

function oneMinIndex(arr) {
  if (!arr || arr.length === 0) {
    return -1;
  }

  if (arr.length === 1) {
    return 0;
  }

  if (arr[0] < arr[1]) {
    return 0;
  }

  let len = arr.length;
  if (arr[len - 1] < arr[len - 2]) {
    return len - 1;
  }

  let l = 0;
  let r = len - 1;
  // 防止 mid-1越界 [3,2,3,2,3]
  while (l < r - 1) {
    let mid = l + ((r - l) >> 1);
    if (arr[mid] < arr[mid - 1] && arr[mid] < arr[mid + 1]) {
      return mid;
    } else {
      // 左边肯定有符合条件的
      if (arr[mid] > arr[mid - 1]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
  }

  return arr[l] < arr[r] ? l : r;
}
```

### 单链表

```javascript
// 节点
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
// 单链表
class SingleLinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
  }
  // 新增一个节点
  add(element) {
    let node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      let lastNode = this.getNode(this.size - 1);
      lastNode.next = node;
    }
    this.size++;
  }
  // 指定位置新增
  addAt(pos, element) {
    if (pos < 0 || pos > this.size) {
      throw new Error('addAt pos out range');
    }

    let node = new Node(element);

    // 在头部添加
    if (pos === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      // 在中间、尾部添加
      let prev = this.getNode(pos - 1);
      node.next = prev.next;
      prev.next = node;
    }
    this.size++;
  }
  // 删除指定位置的节点
  deleteAt(pos) {
    if (pos < 0 || pos >= this.size) {
      throw new Error('deleteAt pos out range');
    }

    let temp = this.head;
    if (pos === 0) {
      this.head = temp.next;
    } else {
      let prev = this.getNode(pos - 1);
      let cur = prev.next;
      prev.next = cur.next;
    }
    this.size--;
  }
  // 查找制定节点的位置
  indexOf(element) {
    let temp = this.head;
    let i = 0;
    while (i < this.size) {
      if (temp.element === element) {
        return i;
      }
      temp = temp.next;
      i++;
    }
    return -1;
  }
  // 根据位置查找node
  getNode(pos) {
    if (pos < 0 || pos >= this.size) {
      throw new Error('getNode pos out range');
    }
    let temp = this.head;
    let i = 0;
    while (i < pos) {
      temp = temp.next;
      i++;
    }

    return temp;
  }
  // 反转链表
  reverse() {
    let temp = this.head;
    let next = null;
    let prev = null;
    while (temp) {
      next = temp.next;
      temp.next = prev;
      prev = temp;
      temp = next;
    }
    this.head = prev;
  }
}
```
