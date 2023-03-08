[[toc]]

### uni-app 中 swiper 组件遇到的问题

- 组件名称是 swiper.vue 或者 Swiper.vue，传递数据时图片可能不见了
- 改变图片大小要用 rpx 单位
- 本身 swiper 有默认的 150px 的默认高度，app 中需要改变默认高度
  ```css
  swiper {
    width: 100%;
    height: 400rpx;
  }
  ```
