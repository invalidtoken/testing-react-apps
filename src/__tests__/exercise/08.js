// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

describe('useCounter increment/decrement corrently', () => {
  let result = null
  function TestComponent(props) {
    result = useCounter(props)
    return null
  }

  beforeEach(() => {
    result = null
  })

  test('when step is 2', () => {
    render(<TestComponent initialCount={1} step={2} />)

    expect(result.count).toBe(1)

    act(() => {
      result.increment()
    })

    expect(result.count).toBe(3)

    act(() => {
      result.decrement()
      result.decrement()
    })

    expect(result.count).toBe(-1)
  })

  test('when step is -2', () => {
    render(<TestComponent initialCount={1} step={-2} />)

    expect(result.count).toBe(1)

    act(() => {
      result.increment()
    })

    expect(result.count).toBe(-1)

    act(() => {
      result.decrement()
      result.decrement()
    })

    expect(result.count).toBe(3)
  })
})

/* eslint no-unused-vars:0 */
