// test Location component
// mock react-use-geolocation dependency
// initially loading should be shown
// on state update the latitude and longitude should be shown

import {useLocation} from 'components/use-location'
import {act, render, screen} from '@testing-library/react'
import Location from 'examples/location'
import {useState} from 'react'

// Mock this module and replace every
// function exported from this module with jest.fn()
jest.mock('../../components/use-location')

test('display the user current location', () => {
  const fakePosition = {
    coords: {
      latitude: 23.2323,
      longitude: 52.2322,
    },
  }

  let setPositionValue = null
  function useMockedCurrentPositionHook() {
    const [position, setPosition] = useState(undefined)
    setPositionValue = setPosition
    return [position]
  }

  useLocation.mockImplementation(useMockedCurrentPositionHook)
  render(<Location />)

  expect(screen.getByLabelText('loading...')).toBeInTheDocument()

  act(() => {
    setPositionValue(fakePosition)
  })

  expect(screen.getByText(/latitude:/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )

  expect(screen.getByText(/longitude:/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )

  expect(screen.queryByLabelText('loading...')).not.toBeInTheDocument()
})

test('display user error on failure of retrieving location', () => {
  const errorMessage = 'Geolocation is not supported or permission denied'
  const fakeError = new Error(errorMessage)

  let setErrorValue = null
  function useMockedCurrentPositionHook() {
    const [error, setError] = useState(undefined)
    setErrorValue = setError
    return [undefined, error]
  }

  useLocation.mockImplementation(useMockedCurrentPositionHook)
  render(<Location />)

  expect(screen.getByLabelText('loading...')).toBeInTheDocument()

  act(() => {
    setErrorValue(fakeError)
  })

  expect(screen.queryByLabelText('loading...')).not.toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
})
