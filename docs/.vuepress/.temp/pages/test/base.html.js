export const data = JSON.parse("{\"key\":\"v-01a49aa4\",\"path\":\"/test/base.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"jest 支持 esm 测试\",\"slug\":\"jest-支持-esm-测试\",\"link\":\"#jest-支持-esm-测试\",\"children\":[]}],\"git\":{\"updatedTime\":1675737163000,\"contributors\":[{\"name\":\"fc86jie\",\"email\":\"wangrenjie86@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"test/base.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
