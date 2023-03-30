[[toc]]

### redux 基本使用

- 创建上下文对象，基于上下文对象的 Provider 把创建的 store 放到根组件的上下文中，后代基于上下文获取 store
- 公共组件的状态
  - store.getState()获取公共组件状态
  - store.subscribe(()=>{console.log('store 更新后执行的回调函数')})，让组件更新的函数放在事件池中
  - store.dispatch(actionCreator)，派发事件

```jsx
// store/index.js 创建store
import { createStore } from 'redux';
// state的初始状态
let initial = {
  supNum: 10,
  opNum: 5,
};
// 创建reducer
const reducer = (state = initial, action) => {
  state = { ...state };
  switch (action.type) {
    case 'VOTE_SUP':
      state.supNum++;
      break;
    case 'VOTE_OP':
      state.opNum++;
      break;
    default:
      break;
  }
  return state;
};

const store = createStore(reducer);

export default store;


// voteContext.js 创建一个上下文
import React from 'react';
const VoteContext = React.createContext();
export default VoteContext;

// App.jsx
import VoteContext from '@/components/vote/voteContext';
import store from '@/store';

function App() {
  return (
    <>
      <VoteContext.Provider value={{ store }}>
        <Vote></Vote>
      </VoteContext.Provider>
    </>);
}

export default App;

// vote.jsx
  let [_, setNum] = useState(0);
  useEffect(() => {
    // store订阅更新函数，当store发生变化就触发
    store.subscribe(() => {
      // 保证每次的值不一样，强制触发更新
      setNum(+new Date());
    });
  }, []);

// voteFooter
const { store } = useContext(VoteContext);
const handleClick = ()=>{
  // 通过store的dispatch分发action
   store.dispatch({
      type: 'VOTE_SUP',
    });
}
```

### 合并 reducer

```jsx
import { combineReducers } from 'redux';
// 容器的公共状态会按照设置的成员名分模块管理
// state = {
//   a: {
//      num:1
//   },
//   b: {
//      num:2
//   },
// };
const reducer = combineReducers({
  a: aReducer,
  b: bReducer,
});
export default reducer;
```

### react-redux 使用

- 提供 Provider 组件，可以在自己内部创建上下文对象，将 store 挂载到根组件的上下文中
- 提供 connect 函数，在函数内部，可以获取到上下文中的 store，把公共状态和需要派发的操作，基于属性传递给组件
- connect：connect(mapStateToProps, mapDispatchToProps)(需要渲染的组件)
  - mapStateToProps：可以获取到 redux 中的公共状态，把需要的属性通过 props 传递给组件
    ```jsx
    connect(state=>{
      return {...}
    })(VoteNew)
    ```
  - mapDispatchToProps：把需要派发的任务，当做属性传递给组件
    ```jsx
    // 标准写法
    connect(null, dispatch => {
      return {
        support() {
          dispatch(action.vote.support());
        },
        unSupport() {
          dispatch(action.vote.unSupport());
        },
      };
    })(VoteFooter);
    // 如果是mapDispatchToProps对象，则内部会调用bindActionCreators转换成标准形式
    connect(null, action.vote)(VoteFooter);
    ```

```jsx
import { Provider } from 'react-redux';
<Provider store={store}>
  <VoteNew></VoteNew>
</Provider>;

import { connect } from 'react-redux';
function VoteNew(props) {
  // 从props中结构state和action
  const { a, b, support, unSupport } = props;
}
export default connect(
  state => {
    return {
      a: 1,
      b: 2,
    };
  },
  dispatch => {
    return {
      support() {
        dispatch(action.vote.support());
      },
      unSupport() {
        dispatch(action.vote.unSupport());
      },
    };
  }
)(VoteNew);
```

### redux 中间件

- redux-logger：派发日志
- redux-thunk/redux-promise：异步派发，都派发 2 次，第一次派发是重写的 dispatch，等待结果拿到之后在用原来的 dispatch 派发结果。redux-thunk 的第二次派发是手动的，redux-promise 是自动的

```jsx
// 模拟异步
const delay = (timer = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
};

const voteAction = {
  // 使用redux-thunk中间件处理异步，需要手动派发一次
  support(payload) {
    return async dispatch => {
      await delay();
      dispatch({
        type: VOTE_SUP,
        ...payload,
      });
    };
  },
  // 使用redux-promise中间件处理异步
  async unSupport(payload) {
    await delay();
    return {
      type: VOTE_OP,
      ...payload,
    };
  },
};

export default voteAction;
```
