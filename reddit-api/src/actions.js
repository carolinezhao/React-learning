import fetch from 'cross-fetch'

// 把请求事件和 UI 事件分离很重要
// 随着应用变得复杂，有些用户操作（比如，预加载最流行的 subreddit，或者一段时间后自动刷新过期数据）后需要马上请求数据。路由变化时也可能需要请求数据。

// 由网络请求控制
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
// 由用户操作控制
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

// thunk action creator
function fetchPosts(subreddit) {
  return dispatch => { // dispatch 方法作为参数传入
    dispatch(requestPosts(subreddit)) // 更新应用的 state 来通知 API 请求发起了
    return fetch(`https://www.reddit.com/r/${subreddit}.json`) // 返回值是一个 Promise
      .then(
        response => response.json(),
        error => console.log(error) // 不要使用 catch，因为会捕获在 dispatch 和渲染中出现的任何错误
      )
      .then(json => dispatch(receivePosts(subreddit, json))) // 使用 API 请求结果来更新应用的 state
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

// thunk 的一个优点是它的结果可以再次被 dispatch
export function fetchPostsIfNeeded(subreddit) {
  // Note that the function also receives getState() which lets you choose what to dispatch next.
  // This is useful for avoiding a network request if a cached value is already available.
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // Dispatch a thunk from thunk
      return dispatch(fetchPosts(subreddit))
    } else {
      return Promise.resolve()
    }
  }
}