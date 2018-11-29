# Lifecycle Methods

## Mounting

1. constructor(props)
  - set an initial component state and bind class methods

2. componentWillMount()
   
3. render()
  - should be pure and therefore shouldn’t modify the component state
  - gets an input as props and state and returns an element

4. componentDidMount()
  - do an asynchronous request to fetch data from an API
  - the fetched data would get stored in the internal component state to display it in the render() lifecycle method

## Update

It happens when the state or the props change.

1. componentWillReceiveProps(nextProps)
  - diff the next props with the previous props, by using this.props, to apply a different behavior based on the diff
  - set state based on the next props

2. shouldComponentUpdate(nextProps, nextState)

3. componentWillUpdate(nextProps, nextState)
  - perform preparations before the render method gets executed
  - cannot trigger setState() anymore

4. render()

5. componentDidUpdate(prevProps, prevState)
  - perform DOM operations or to perform further asynchronous requests

## Unmounting

1. componentWillUnmount()
  - perform clean up tasks
