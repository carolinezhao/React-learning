import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

// 每个 reducer 只负责管理全局 state 中它负责的一部分，且各 state 的参数都不相同。
export default combineReducers({
  todos,
  visibilityFilter
})

// 相当于：
// export default function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }


// 路径下是所有顶级 reducer，使用 import * as reducers 得到一个以它们名字作为 key 的 object：
// import * as reducers from './reducers'
// const todoApp = combineReducers(reducers)