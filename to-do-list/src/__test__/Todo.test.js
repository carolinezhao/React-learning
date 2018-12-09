import React from 'react'
import {cleanup, render, fireEvent} from 'react-testing-library'
import Todo from '../components/Todo'

afterEach(cleanup)

test('Todo should render passed props as content body and respond to callback props', () => {
  const onClick = jest.fn()
  const completed = false
  const text = 'Learning TDD'

  const {getByTestId} = render(<Todo onClick={onClick} completed={completed} text={text} />)
  expect(getByTestId('newTodo').textContent).toBe('Learning TDD')

  fireEvent.click(getByTestId('newTodo'))
  expect(onClick).toHaveBeenCalledTimes(1)
})
