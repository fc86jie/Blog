[[toc]]

### 路由模式

```javascript
import { createBrowserRouter, createHashRouter, HashRouter, BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
);

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  root
);
```

- history 模式
- hash 模式

### Route 路由

```javascript
function App() {
  return (
    <>
      <Routes>
        <Route path={['/', '/home']} exact element={<Home />} />
        <Route path="/about" exact strict element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
```

- 路由匹配规则
  1. 默认规则，当 url 以当前 path 为开始时则匹配
  2. exact 精确匹配，url === path || url === path/ 则匹配
  3. strict 严格匹配， url===path，严格匹配必须基于 exact
  4. 多路径匹配 []
  5. Routes 最佳匹配

### Link 和 NavLink

```javascript
function App() {
  return (
    <>
      <Link to="/">首页</Link>
      <NavLink to="/home" activeClassName="indexActive" isActive={() => true}>
        首页
      </NavLink>
      <NavLink to="/About" exact activeStyle={{ color: 'red' }}>
        关于
      </NavLink>
    </>
  );
}
```

- Link：to 要跳转的 url
- NavLink：
  1. to 要跳转的 url
  2. activeClassName 当前被选中后的 class，默认 active
  3. activeStyle 当前被选中后的 style
  4. 默认使用的是模糊匹配，exact 精确匹配
  5. isActive： fun 判断当前是否应该选中
