import { combineReducers } from 'redux'
import { createIsFetching, createDidInvalidate, createIds } from './utils'

// Higher-order reducers are functions that return reducers and/or take them as arguments.

// A reducer factory for creating a list reducer:

const createList = actionTypes => combineReducers({
  ids: createIds(actionTypes),
  isFetching: createIsFetching(actionTypes),
  didInvalidate: createDidInvalidate(actionTypes),
})

export default createList

export const getIds = state => state.ids
export const getIsFetching = state => state.isFetching
export const getDidInvalidate = state => state.didInvalidate

// reference
// https://medium.com/@mange_vibration/reducer-composition-with-higher-order-reducers-35c3977ed08f