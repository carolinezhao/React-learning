import createFilter, { getByFilter } from '../reducers/createFilter'

describe('createFilter', () => {     
  const fetchSuccess = (filterName, payload) => ({
    type: 'FETCH_FILTER_SUCCESS',
    filterName,
    payload,
  })
  const reducer = (state = null, action) => {
    return action.type === 'FETCH_FILTER_SUCCESS' ? action.payload
      : state
  }

  it('should handle two filters and initial state', () => {
    const FILTER_ONE = 'FILTER_ONE'
    const FILTER_TWO = 'FILTER_TWO'
    const filterReducer = createFilter({
      [FILTER_ONE]: reducer,
      [FILTER_TWO]: reducer,
    })

    const state = [ {},
      fetchSuccess(FILTER_ONE, 'some-payload'),
    ].reduce(filterReducer, undefined)
    
    expect(getByFilter(state, { filterName: FILTER_ONE })).toBe('some-payload')
    expect(getByFilter(state, { filterName: FILTER_TWO })).toBe(null)
    console.log(state)
  })
})