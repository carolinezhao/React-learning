import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../selectors'

// 容器组件
// 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。
// 使用 React Redux 库的 connect() 方法来生成。
// mapStateToProps 指定如何把当前 state 映射到展示组件的 props 中。
// mapDispatchToProps 接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法。

const mapStateToProps = state => ({
  todos: getVisibleTodos(state)
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)