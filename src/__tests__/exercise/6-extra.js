// test Location component
// mock react-use-geolocation dependency
// initially loading should be shown
// on state update the latitude and longitude should be shown

import {useCurrentPosition} from 'react-use-geolocation'
import {act, render, screen} from '@testing-library/react'
import Location from 'examples/location'
import {useState} from 'react'

// Mock this module and replace every
// function exported from this module with jest.fn()
jest.mock('react-use-geolocation')

test('display the user current location', () => {
  const fakePosition = {
    coords: {
      latitude: 23.2323,
      longitude: 52.2322,
    },
  }

  let setPositionState = null
  function useMockedCurrentPositionHook() {
    const [position, setPosition] = useState(undefined)
    setPositionState = setPosition
    return [position]
  }
  useCurrentPosition.mockImplementation(useMockedCurrentPositionHook)
  render(<Location />)

  expect(screen.queryByLabelText('loading...')).toBeInTheDocument()

  // If you are calling a function that is updating the state
  // then you must call it inside an act
  act(() => {
    setPositionState(fakePosition)
  })

  expect(screen.getByText(/latitude:/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )

  expect(screen.getByText(/longitude:/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )

  expect(screen.queryByLabelText('loading...')).not.toBeInTheDocument()
})
