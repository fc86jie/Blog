export const themeData = JSON.parse("{\"sidebar\":[{\"text\":\"Introduction\",\"link\":\"/README.md\"},{\"text\":\"JavaScript\",\"children\":[{\"text\":\"基础\",\"link\":\"/javascript/base.md\"},{\"text\":\"浏览器常用方法\",\"link\":\"/javascript/browser.md\"}]},{\"text\":\"CSS\",\"children\":[{\"text\":\"基础\",\"link\":\"/css/base.md\"}]},{\"text\":\"HTML\",\"children\":[{\"text\":\"基础\",\"link\":\"/html/base.md\"}]},{\"text\":\"NPM\",\"children\":[{\"text\":\"基础\",\"link\":\"/npm/base.md\"}]},{\"text\":\"NodeJs\",\"children\":[{\"text\":\"链接相关\",\"link\":\"/nodejs/link.md\"},{\"text\":\"其他\",\"link\":\"/nodejs/other.md\"}]},{\"text\":\"TypeScript\",\"children\":[{\"text\":\"链接相关\",\"link\":\"/typescript/link.md\"}]},{\"text\":\"Vue\",\"children\":[{\"text\":\"其他\",\"link\":\"/vue/other.md\"}]},{\"text\":\"React\",\"children\":[{\"text\":\"基础\",\"link\":\"/react/base.md\"},{\"text\":\"Hooks\",\"link\":\"/react/hooks.md\"},{\"text\":\"Router\",\"link\":\"/react/router.md\"}]},{\"text\":\"Electron\",\"children\":[{\"text\":\"基础\",\"link\":\"/electron/base.md\"}]},{\"text\":\"算法\",\"children\":[{\"text\":\"LeetCode 刷题攻略\",\"link\":\"https://github.com/youngyangyang04/leetcode-master\"},{\"text\":\"十大排序算法\",\"link\":\"https://github.com/hustcc/JS-Sorting-Algorithm\"}]}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"navbar\":[],\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
