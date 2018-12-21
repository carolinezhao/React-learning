import createByKey, { createGetByKey } from '../reducers/createByKey'

it('should create a byKey-reducer', () => {
  const reducer = (state = null, action) => {
    return action.type === 'FETCH_SUCCESS' ? action.payload : state
  }

  const byKeyReducer = createByKey(
    action => action.hasOwnProperty('filterKey'),
    action => action.filterKey
  )(reducer)
  const getByKey = createGetByKey(({ filterKey }) => filterKey)
 
  const state = [ {}, {
    type: 'FETCH_SUCCESS',
    filterKey: 4,
    payload: 'some-payload',
  } ].reduce(byKeyReducer, undefined)

  expect(getByKey(state, { filterKey: 4 })).toBe('some-payload')
  console.log(state)
})