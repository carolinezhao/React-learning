// splitting reducers by keys

// two arguments
// A predicate that takes an action and tells if the reducer should be applied.
// A function that maps the action to the key.

// a function with a reducer as the only argument is returned
// This is called currying and it means that we would call it with createByKey(pred, mapToKey)(reducer)

const createByKey = (predicate, mapActionToKey) => reducer => {
  return (state = {}, action) => {
    if (predicate(action)) {
      const key = mapActionToKey(action)
      return { ...state, [key]: reducer(state[key], action) }
    }
    return state
  }
}
export default createByKey

export const createGetByKey = mapFilterToKey => {
  return (state, filter) => state[mapFilterToKey(filter)]
}