export const createReducer = (intialState, handlers) => (state = intialState, action) => (
  handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action)
    : state
)

export const createIsFetching = ({ FAILURE, REQUEST, SUCCESS }) => createReducer(false, {
  [FAILURE]: () => false,
  [REQUEST]: () => true,
  [SUCCESS]: () => false,
})

export const createDidInvalidate = ({ INVALIDATE, REQUEST, SUCCESS }) => createReducer(
  false, {
    [REQUEST]: () => false,
    [SUCCESS]: () => false,
    [INVALIDATE]: () => true,
})

export const createIds = ({ SUCCESS }) => createReducer([], {
  [SUCCESS]: (state, action) => action.response.result,
})