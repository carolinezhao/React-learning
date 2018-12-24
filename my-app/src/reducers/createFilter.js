import createByKey, { createGetByKey } from './createByKey'
import { compose } from 'redux'

const withInitialState = initialState => reducer => {
  return (state = initialState, action) => reducer(state, action)
}

const mapToReducer = mapActionToKey => reducers => (state, action) => {
  return reducers[mapActionToKey(action)](state, action)
}

const combineInitialStates = reducers => Object.keys(reducers).reduce(
  (initialState, reducerKey) => {
    initialState[reducerKey] = reducers[reducerKey](undefined, {})
    return initialState
  },
  {}
)

const mapActionToKey = action => action.filterName

const createFilter = filterReducers => {
  const filterPredicate = action => hasOwnProperty(action, 'filterName') &&
    hasOwnProperty(filterReducers, action.filterName)
  const initialState = combineInitialStates(filterReducers)

  return compose(
    withInitialState(initialState),
    createByKey(filterPredicate, mapActionToKey),
    mapToReducer(mapActionToKey)
  )(filterReducers)
}

export default createFilter

export const getByFilter = createGetByKey(({ filterName }) => filterName)
