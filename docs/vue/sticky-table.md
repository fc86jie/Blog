### 急于 Vue2.x + Ant Design Vue 实现一个表格吸顶功能

```javascript
/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2024-09-18 11:02:17
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2024-10-28 16:18:19
 * @FilePath: /src/directives/sticky-table.js
 * @Description:
 */

'use strict';
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

let listenAction;
let container;
let stickyHeader = null;
let originEl = null;
let bindingConfig = {};

//  滚动的容器选择器
const tableScrollSelector = '.ant-table-content';
// 表头选择器
const tableHeaderSelector = '.ant-table-thead';
// 滚动的元素
let tableScrollEle = null;
// 表头元素
let tableHeaderEle = null;
// 当表头的元素被移动走之后，占位的元素
let placeHeaderEle = null;
// 吸顶的容器元素
let stickyBoxEle = null;
let resizeObserver = null;
// 当前滚动的容器是否是window
let isWindow = false;

/**
 * 获取配置信息
 * @param {*} binding
 * @returns
 */
const getBindingConfig = binding => {
  const params = binding.value || {};
  const fixedTop = params.fixedTop || 0;
  const zIndex = params.zIndex || 1000;
  const bgColor = params.bgColor || '#fff';
  const disabled = params.disabled !== undefined ? !!params.disabled : binding.value ? false : true;
  // 滚动容器的id
  const { scrollContainerId = 'stickyBox' } = params;
  return {
    fixedTop,
    zIndex,
    scrollContainerId,
    bgColor,
    disabled,
  };
};

const unWatch = () => {
  if (container) {
    container.removeEventListener('scroll', listenAction);
    if (isWindow) {
      container.removeEventListener('resize', resizeStickyHeader);
    } else {
      resizeObserver.unobserve(container);
    }
  }
  tableScrollEle && tableScrollEle.removeEventListener('scroll', setScrollX);
  stickyBoxEle && stickyBoxEle.removeEventListener('scroll', setBodyScrollX);
};

const watch = () => {
  if (container) {
    container.addEventListener('scroll', listenAction);
    // 开始监听容器大小的变化
    if (isWindow) {
      container.addEventListener('resize', resizeStickyHeader);
    } else {
      resizeObserver = new ResizeObserver(() => {
        resizeStickyHeader();
      });
      resizeObserver.observe(container);
    }
  }
  tableScrollEle && tableScrollEle.addEventListener('scroll', setScrollX);
  stickyBoxEle && stickyBoxEle.addEventListener('scroll', setBodyScrollX);
};

// 根据表格实际内容修改表头内容
const adaptStickyHeader = () => {
  resizeStickyHeader();
  setScrollX();
};

// 根据实际内容设置宽度
const resizeStickyHeader = throttle(() => {
  stickyBoxEle.style.width = `${tableScrollEle.offsetWidth}px`;
});

// 根据表格横向滚动，设置sticky表头的横向位置
const setScrollX = throttle(() => {
  stickyBoxEle.scrollLeft = tableScrollEle.scrollLeft;
});

// 根据sticky表头的滚动，设置表格的横向位置
const setBodyScrollX = throttle(() => {
  tableScrollEle.scrollLeft = stickyBoxEle.scrollLeft;
});

export default {
  install(app) {
    app.directive('sticky-table', {
      mounted(el, binding) {
        bindingConfig = getBindingConfig(binding);
        const { disabled, fixedTop, zIndex, scrollContainerId, bgColor } = bindingConfig;
        if (disabled) {
          return;
        }
        container = document.getElementById(scrollContainerId) || window;
        isWindow = container === window;
        let active = false;
        tableHeaderEle = el.querySelector(tableHeaderSelector);
        placeHeaderEle = tableHeaderEle.cloneNode(true);
        tableScrollEle = el.querySelector(tableScrollSelector);

        /**
         * 生成吸顶的容器元素
         */
        const setStickEle = () => {
          stickyBoxEle = tableScrollEle.cloneNode(true);
          stickyBoxEle.className = `${stickyBoxEle.className} sticky-box`;
          let headerEle = stickyBoxEle.querySelector('.ant-table-thead');
          let bodyEle = stickyBoxEle.querySelector('.ant-table-tbody');
          headerEle.parentNode?.removeChild(headerEle);
          bodyEle.parentNode?.removeChild(bodyEle);
        };

        setStickEle();

        /**
         * 吸顶设置
         * @returns
         */
        const sticky = () => {
          if (active) return;
          tableScrollEle = el.querySelector(tableScrollSelector);
          // mounted的时候tableScrollEle元素还没有完全准备好，宽度有变化（比如项目详情中项目配额列表），动态设置表头
          unWatch();
          setStickEle();
          watch();

          // 把占位表头元素插入到表头的后面
          tableHeaderEle.insertAdjacentElement('afterend', placeHeaderEle);
          // 把表头插入到吸顶容器内部table的里面
          stickyBoxEle.style.cssText = `position: fixed;top: ${fixedTop}px; z-index: ${zIndex}; background-color: ${bgColor}; overflow: auto hidden; width: ${tableScrollEle.offsetWidth}px;`;
          stickyBoxEle.querySelector('table').appendChild(tableHeaderEle);
          tableScrollEle.insertAdjacentElement('afterend', stickyBoxEle);
          setScrollX();
          active = true;
        };

        /**
         * 解除吸顶
         * @returns
         */
        const reset = () => {
          if (!active) return;
          // 把表头插入到占位容器的后面
          placeHeaderEle.insertAdjacentElement('afterend', tableHeaderEle);
          stickyBoxEle.parentNode?.removeChild(stickyBoxEle);
          // 把占位容器从原来的位置删除掉
          placeHeaderEle.parentNode?.removeChild(placeHeaderEle);
          active = false;
        };

        listenAction = throttle(() => {
          const rectEl = tableScrollEle?.parentNode;
          const rect = rectEl.getBoundingClientRect();
          const { top, bottom } = rect;
          if (top <= fixedTop && bottom >= fixedTop) {
            return sticky();
          }
          reset();
        });

        watch();
      },

      unmounted: unWatch,

      updated(el, binding) {
        bindingConfig = getBindingConfig(binding);
        const { disabled, fixedTop, zIndex, scrollContainerId, bgColor } = bindingConfig;
        if (disabled) {
          return;
        }
        adaptStickyHeader();
      },
    });
  },
};
```

### 使用方法

```javascript
import stickyTable from '@/directives/sticky-table';
import App from '@/App';
const app = createApp(App).use(stickyTable);
// 相对的吸顶元素需要增加 id="stickyBox"
```

```vue
<a-table v-sticky-table="{ fixedTop: 100 }"></a-table>
```
