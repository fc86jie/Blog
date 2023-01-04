<template><div><h3 id="微信小程序登录流程" tabindex="-1"><a class="header-anchor" href="#微信小程序登录流程" aria-hidden="true">#</a> 微信小程序登录流程</h3>
<p><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html" target="_blank" rel="noopener noreferrer"><img src="@source/miniprogramar/api-login.jpg" alt="微信小程序登录流程图"><ExternalLinkIcon/></a></p>
<ul>
<li>部分字段解释如下：</li>
</ul>
<table>
  <tr>
    <td rowspan="3">三种角色</td>
    <td>客户端</td>
    <td>即小程序</td>
  </tr>
  <tr>
    <td>开发者服务器</td>
    <td>即开发者自己的服务器</td>
  </tr>
  <tr>
    <td>微信接口服务</td>
    <td>即微信处理登录请求的服务</td>
  </tr>
  <tr>
  <td rowspan="6">6个术语</td>
    <td>code</td>
    <td>临时登录凭证</td>
  </tr>
  <tr>
    <td>appid</td>
    <td>小程序的ID</td>
  </tr>
  <tr>
    <td>appsecret</td>
    <td>小程序秘钥</td>
  </tr>
  <tr>
    <td>openid</td>
    <td>登录成功后用户的唯一ID</td>
  </tr>
  <tr>
    <td>session_key</td>
    <td>对用户数据进行加密签名的秘钥</td>
  </tr>
  <tr>
    <td>token</td>
    <td>登录态令牌，指的是图中的“自定义登录态”</td>
  </tr>
</table>
</div></template>


