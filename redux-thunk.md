# redux-thunk

thunk
- It’s a special name for a function that’s returned by another.

redux-thunk
- It’s a middleware that looks at every action that passes through the system, and if it’s a function, it calls that function.

Redux will pass two arguments to thunk functions: 
- dispatch, so that they can dispatch new actions if they need to;
- getState, so they can access the current state. 

The getState function can be useful for deciding whether to fetch new data, or return a cached result, depending on the current state.

example
```js
function logOutUser() {
  return function(dispatch, getState) {
    return axios.post('/logout').then(function() {
      // pretend we declared an action creator called 'userLoggedOut', and now we can dispatch it
      dispatch(userLoggedOut());
    });
  };
}
```

register
```js
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
```

reference
- https://daveceddia.com/what-is-a-thunk/