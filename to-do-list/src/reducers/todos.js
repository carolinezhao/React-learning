// Reducers specify how the application's state changes in response to actions sent to the store. 
// Remember that actions only describe what happened, but don't describe how the application's state changes.

// Never write directly to state or its fields, and instead we return new objects.
// The new todos is equal to the old todos concatenated with a single new item at the end. 
// The fresh todo was constructed using the data from the action.

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo,
          completed: !todo.completed
        } : todo
      )
    default:
      return state
  }
}

export default todos