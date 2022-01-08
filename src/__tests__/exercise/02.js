// simple test with React Testing Library
// http://localhost:3000/counter

import {render} from '@testing-library/react'
import * as React from 'react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const {container} = render(<Counter />)

  const message = container.firstChild.querySelector('div')
  const [decrement, increment] = container.querySelectorAll('button')

  expect(message).toHaveTextContent('Current count: 0')

  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')

  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
