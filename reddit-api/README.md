# Project: Reddit API

调用异步 API 时，需要 dispatch 至少三种 action：
- 通知 reducer 请求开始
- 通知 reducer 请求成功
- 通知 reducer 请求失败
  
通常定义 3 个 ActionType：*_REQUEST, *_SUCCESS, *_FAILURE

异步 Action 创建函数
- 通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。
- 这个函数会被 Redux Thunk middleware 执行。
- 这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。
- 这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。
