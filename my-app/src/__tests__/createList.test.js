import createList, * as selectors from '../reducers/createList'

describe('createList', () => {
  const actionTypes = {
    SUCCESS: 'FETCH_SUCCESS',
    FAILURE: 'FETCH_FAILURE',
    REQUEST: 'FETCH_REQUEST',
    INVALIDATE: 'FETCH_INVALIDATE',
  }
  const fetchSuccess = ids => ({
    type: actionTypes.SUCCESS,
    response: { result: ids },
  })
  it('should return correct ids on success', () => {
    const list = createList(actionTypes)
    const ids = [ 1, 2, 3 ]
    const state = [ {}, fetchSuccess(ids) ].reduce(list, undefined)

    expect(selectors.getIds(state)).toBe(ids)
    expect(selectors.getIsFetching(state)).toBe(false)
    expect(selectors.getDidInvalidate(state)).toBe(false)
    console.log(state)
  })
})

// add it() (or test()) blocks with the name of the test and its code
// may optionally wrap them in describe() blocks for logical grouping