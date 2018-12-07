import { render } from 'react-testing-library'
import 'dom-testing-library/extend-expect'

test('Joke component receives props and then renders text', () => {
  const { getByTestId } = render(
    <Joke text='The funniest joke.' />
  )

  expect(getByTestId('joke-text')).toHaveTextContent('The funniest joke.')
})