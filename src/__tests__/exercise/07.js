// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render as rtlRender, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'
import userEvent from '@testing-library/user-event'

// Mock window alert

function render(ui, {theme = 'light', ...options} = {}) {
  const Wrapper = ({children}) => {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  }
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

describe('easy button renders with', () => {
  window.alert = jest.fn()

  test('the dark styles for the dark theme', () => {
    render(<EasyButton onClick={() => alert('that was easy')} />, {
      theme: 'dark',
    })
    const button = screen.getByRole('button')

    expect(button).toHaveStyle({
      backgroundColor: 'black',
      color: 'white',
    })

    userEvent.click(screen.getByRole('button'))
    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(window.alert).toHaveBeenCalledWith('that was easy')
  })

  test('the light styles for the light theme', () => {
    render(<EasyButton onClick={() => alert('that was easy')} />, {
      theme: 'light',
    })
    const button = screen.getByRole('button')

    expect(button).toHaveStyle({
      backgroundColor: 'white',
      color: 'black',
    })

    userEvent.click(screen.getByRole('button'))
    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(window.alert).toHaveBeenCalledWith('that was easy')
  })
})

/* eslint no-unused-vars:0 */
