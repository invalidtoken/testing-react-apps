// simple test with React Testing Library
// http://localhost:3000/counter

import {render, fireEvent, screen} from '@testing-library/react'
import * as React from 'react'
// 🐨 import the `render` and `fireEvent` utilities from '@testing-library/react'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const {container} = render(<Counter />)

  const message = container.firstChild.querySelector('div')
  const [decrement, increment] = container.querySelectorAll('button')

  expect(message).toHaveTextContent('Current count: 0')

  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')

  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
