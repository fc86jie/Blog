import{_ as l,p as i,q as e,a1 as a}from"./framework-96b046e1.js";const s="/Blog/assets/framework-221f60e5.jpg",t={},r=a('<nav class="table-of-contents"><ul><li><a href="#架构分级">架构分级</a></li><li><a href="#好的软件设计-solid">好的软件设计(SOLID)</a></li></ul></nav><h3 id="架构分级" tabindex="-1"><a class="header-anchor" href="#架构分级" aria-hidden="true">#</a> 架构分级</h3><img src="'+s+'" alt="架构图" width="70%"><ul><li><strong>系统内架构</strong>：应用在整个系统内的关系，如与后台服务器通信、与第三方系统集成等</li><li><strong>应用级架构</strong>：应用外部的整体架构，如多个应用之间如何共享组件、如何通信等</li><li><strong>模块级架构</strong>：应用内部模块架构，如代码模块化、数据和状态的管理等</li><li><strong>代码级架构</strong>：从基础设施来保障架实施</li></ul><h3 id="好的软件设计-solid" tabindex="-1"><a class="header-anchor" href="#好的软件设计-solid" aria-hidden="true">#</a> 好的软件设计(SOLID)</h3><ul><li>S：单一职责原则（SRP） <ul><li>一个程序只做好一件事</li><li>如果功能过于复杂就拆开，每个部分保持独立</li></ul></li><li>O: 开闭原则 (OSP) <ul><li>对扩展开发，对修改封闭</li><li>增加需求时，扩展新代码，而非修改已有代码</li></ul></li><li>L : 里氏替换原则 (LSP) <ul><li>子类能覆盖父类</li><li>父类能出现的地方子类就能出现</li></ul></li><li>I：接口隔离原则（ISP） <ul><li>保持接口的单一独立</li><li>类似单一职责，这里更关注接口</li></ul></li><li>D：依赖倒置原则（DIP） <ul><li>面向接口编程，依赖于抽象而不依赖于具体</li><li>使用方只关注接口而不关注具体类的实现</li></ul></li></ul>',6),o=[r];function n(c,u){return i(),e("div",null,o)}const h=l(t,[["render",n],["__file","base.html.vue"]]);export{h as default};