// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

// cleanup
beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  ReactDOM.render(<Counter />, div)

  const message = div.firstChild.querySelector('div')
  expect(message.textContent).toBe('Current count: 0')

  const [decrementButton, incrementButton] =
    document.body.querySelectorAll('button')

  const mouseEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })

  decrementButton.dispatchEvent(mouseEvent)
  expect(message.textContent).toBe('Current count: -1')

  incrementButton.dispatchEvent(mouseEvent)
  expect(message.textContent).toBe('Current count: 0')

  incrementButton.dispatchEvent(mouseEvent)
  expect(message.textContent).toBe('Current count: 1')
})
