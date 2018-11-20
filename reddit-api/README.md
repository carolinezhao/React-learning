# Project: Reddit API

调用异步 API 时，需要 dispatch 至少三种 action：
- 通知 reducer 请求开始
- 通知 reducer 请求成功
- 通知 reducer 请求失败
  
通常定义 3 个 ActionType：*_REQUEST, *_SUCCESS, *_FAILURE
