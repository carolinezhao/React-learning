# Project: Reddit API

## 异步 Action

调用异步 API 时，需要 dispatch 至少三种 action：
- 通知 reducer 请求开始
    - reducer 可能会切换 state 中的 isFetching 标记，以此来告诉 UI 来显示加载界面。
- 通知 reducer 请求成功
    - reducer 可能会把接收到的新数据合并到 state 中，并重置 isFetching。UI 则会隐藏加载界面，并显示接收到的数据。
- 通知 reducer 请求失败
    - reducer 可能会重置 isFetching。另外有些 reducer 会保存这些失败信息，并在 UI 里显示出来。
  
通常定义 3 个 ActionType：*_REQUEST, *_SUCCESS, *_FAILURE

## 异步 Action 创建函数

- 通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。
- 这个函数会被 Redux Thunk middleware 执行。
- 这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。
- 这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。

## Middleware

- middleware 最优秀的特性就是可以被链式组合。
- Redux middleware 提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。
- 像 redux-thunk 或 redux-promise 这样支持异步的 middleware 都包装了 store 的 dispatch() 方法，从而可以 dispatch 除了 action 以外的内容，比如函数或 Promise。
- 每个 middleware 都以自己的方式解析 dispatch 的内容，并继续传递 actions 给下一个 middleware。比如，支持 Promise 的 middleware 能够拦截 Promise，然后为每个 Promise 异步地 dispatch 一对 begin/end actions。
- 当 middleware 链中的最后一个 middleware 开始 dispatch action 时，这个 action 必须是一个普通对象，来将处理流程带回同步方式。
