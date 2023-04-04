[[toc]]

### RAIL 模型

RAIL 是一种以用户为中心的性能模型，它提供了一种考虑性能的结构。该模型将用户体验分解到按键操作（例如，点击、滚动、加载）中，帮助您为每个操作定义性能目标。
![](./images/rail.avif)

- 响应：在 50 毫秒内处理事件
- 动画：在 10 毫秒内生成一帧
- 空闲：最大限度增加空闲时间
- 加载：在 5 秒内交付内容并实现可交互

### 性能测量工具

- **Chrome DevTools**：开发调试、性能评测
- **Lighthouse**：网站整体质量评估
- **WebPageTest**：多测试地点、全面性能报告

### 性能监测的 APIS

- window.performance.timing
  - DNS 解析耗时：domainLookupEnd - domainLookupStart
  - TCP 连接耗时：connectEnd - connectStart
  - SSL 安全连接耗时：connectEnd - secureConnectionStart
  - 网络请求耗时（TTFB）：responseStart - requestStart
  - DOM 解析耗时：domInteractive - responseEnd
  - 资源加载耗时：loadEventStart - domContentLoadedEventEnd
  - First Byte 时间：responseStart - domainLookupStart
  - 白屏时间：responseEnd - fetchStart
  - 首次可交互时间（TTI）：domInteractive - fetchStart
  - DOM Ready 时间：domContentLoadedEventEnd - fetchStart
  - 页面完全加载时间：loadEventStart - fetchStart
  - 重定向次数：window.performance.navigation.redirectCount
  - 重定向耗时：redirectEnd - redirectStart
- PerformanceObserver
  ```javascript
  // 长任务
  var observer = new PerformanceObserver(function (list, obj) {
    var entries = list.getEntries();
    for (var i = 0; i < entries.length; i++) {
      // Process "longtask" events
    }
  });
  observer.observe({
    // 此处多个
    entryTypes: ['longtask'],
  });
  ```
