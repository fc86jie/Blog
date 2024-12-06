[[toc]]

### 埋点分类

- 手动埋点
  调用埋点 SDK 函数，在需要埋点的业务位置调用接口上报数据。例如：百度统计、友盟、TalkingData、Google Analytics 等
  - 域名：document.domain、document.URL
  - 页面标题：document.title
  - 分辨率：window.screen.width&window.screen.height
  - Referrer：document.referrer
  - 客户端语言：navigator.language
  - UA：navigator.userAgent
- 可视化埋点
  通过 XPath 方案，过滤不需要的元素，只上传特定元素埋点数据。例如 `//*[@id="container"]/div4/a` 转换为 DOM 选择器 `#container>div:nth-child(4)>a`
  Xpath 方案分为**精确路径**和**概略路径**，精确路径从被点击元素不断向上冒泡查找根节点，记录所有节点，（如果用户阻止了冒泡会导致失效）。概略路径是在前者的基础上仅查找从白名单中的节点。但如果 DOM 节点有变化，对应的 XPath 数组会被打乱，影响采集
  例如：Mixpanel、TalkingData、腾讯 MTA 、诸葛 IO 等
- 无埋点
  加载埋点 SDK 后自动全量采集全部事件并上报埋点数据，可以呈现用户的每一次点击、跳转、登录等全量、实时用户行为数据
  例如：Heap、百度（点击猴子）、GrowingIO 等

|          | 手动埋点                                                 | 可视化埋点                                                               | 自动埋点                                                           |
| -------- | -------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| 优点     | 可控性强，灵活性高，可定制各种特殊埋点需求，监测数据准确 | 通过集成 SDK，运营自主选择，操作便捷，满足大部分需求                     | 数据全面，不需要关注埋点逻辑，前端开发量轻                         |
| 缺点     | 侵入性强，需要开发手动在相应位置埋点，增加维护成本       | 通常需要引入第三方，控件有限，技术上推广过和实现起来有难度，需要运营配合 | 流量和采集数据过于庞大，存在浪费、服服务器性能压力大、难以特殊定制 |
| 使用场景 | 适用于埋点量少、定制化成都高的需求                       | 埋点量多，需要对数据深度整合分析                                         | 网站需要全埋点监控                                                 |