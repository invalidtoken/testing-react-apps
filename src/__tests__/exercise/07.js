// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {getByRole, render as rtlRender, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'
import userEvent from '@testing-library/user-event'

function render(props) {
  rtlRender(
    <ThemeProvider {...props}>
      <EasyButton />
    </ThemeProvider>,
  )
}

test('renders with the dark styles for the dark theme', () => {
  render({initialTheme: 'dark'})
  const button = screen.getByRole('button')

  expect(button).toHaveStyle({
    backgroundColor: 'black',
    color: 'white',
  })
})

test('renders with the light styles for the light theme', () => {
  render({initialTheme: 'light'})
  const button = screen.getByRole('button')

  expect(button).toHaveStyle({
    backgroundColor: 'white',
    color: 'black',
  })
})

/* eslint no-unused-vars:0 */
