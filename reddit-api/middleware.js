// applyMiddleware 改写了 store 的 dispatch 方法，新的 dispatch 即是被所传入的中间件包装过的。

export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    // 接收 createStore 参数
    var store = createStore(reducer, preloadedState, enhancer)
    var dispatch = store.dispatch
    var chain = []

    // 传递给中间件的参数
    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }

    // 注册中间件调用链
    // 所有的中间件最外层函数接收的参数都是 {getState,dispatch}
    chain = middlewares.map(middleware => middleware(middlewareAPI))

    // compose 函数起到代码组合的作用：compose(f, g, h)(...args) 效果等同于 f(g(h(...args)))
    // 一般定义中间件时形参不叫 dispatch 而叫 next，是由于此时的 dispatch 不一定是原始 store.dispatch，有可能是被包装过的新的 dispatch。
    dispatch = compose(...chain)(store.dispatch)

    // 返回经 middlewares 增强后的 createStore
    return {
      ...store,
      dispatch
    }
  }
}

// reference
// https://juejin.im/post/59dc7e43f265da4332268906