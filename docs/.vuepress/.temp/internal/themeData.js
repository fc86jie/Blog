export const themeData = JSON.parse("{\"sidebar\":[{\"text\":\"Introduction\",\"link\":\"/README.md\"},{\"text\":\"浏览器相关\",\"link\":\"/browser/base.md\"},{\"text\":\"HTML\",\"collapsible\":true,\"children\":[{\"text\":\"基础\",\"link\":\"/html/base.md\"}]},{\"text\":\"CSS\",\"collapsible\":true,\"children\":[{\"text\":\"基础\",\"link\":\"/css/base.md\"}]},{\"text\":\"JavaScript\",\"collapsible\":true,\"children\":[{\"text\":\"基础\",\"link\":\"/javascript/base.md\"},{\"text\":\"正则表达式\",\"link\":\"/javascript/reg.md\"}]},{\"text\":\"NPM\",\"collapsible\":true,\"children\":[{\"text\":\"基础\",\"link\":\"/npm/base.md\"}]},{\"text\":\"NodeJs\",\"collapsible\":true,\"children\":[{\"text\":\"链接相关\",\"link\":\"/nodejs/link.md\"},{\"text\":\"其他\",\"link\":\"/nodejs/other.md\"}]},{\"text\":\"TypeScript\",\"collapsible\":true,\"children\":[{\"text\":\"链接相关\",\"link\":\"/typescript/link.md\"}]},{\"text\":\"Vue\",\"collapsible\":true,\"children\":[{\"text\":\"其他\",\"link\":\"/vue/other.md\"}]},{\"text\":\"React\",\"collapsible\":true,\"children\":[{\"text\":\"基础\",\"link\":\"/react/base.md\"},{\"text\":\"Hooks\",\"link\":\"/react/hooks.md\"},{\"text\":\"Router\",\"link\":\"/react/router.md\"}]},{\"text\":\"微信小程序\",\"collapsible\":true,\"children\":[{\"text\":\"基础\",\"link\":\"/miniprogram/base.md\"}]},{\"text\":\"Electron\",\"collapsible\":true,\"children\":[{\"text\":\"基础\",\"link\":\"/electron/base.md\"}]},{\"text\":\"IDE\"},{\"text\":\"算法\",\"collapsible\":true,\"children\":[{\"text\":\"LeetCode 刷题攻略\",\"link\":\"https://github.com/youngyangyang04/leetcode-master\"},{\"text\":\"十大排序算法\",\"link\":\"https://github.com/hustcc/JS-Sorting-Algorithm\"}]}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"navbar\":[],\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

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
