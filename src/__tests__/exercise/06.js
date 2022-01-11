// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

// window.navigator.geolocation function composition
// window.navigation.geolocation(successCallback, errorCallback, options)
// successCallback(coords)
// coords: { latitude: Number, longitude: Number }
// errorCallback(error)

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const {resolve, promise} = deferred()

  const fakePosition = {
    coords: {
      latitude: 23.2323,
      longitude: 52.2322,
    },
  }

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    success => {
      promise.then(() => {
        // 1 way to solve this can be this
        act(() => {
          success(fakePosition)
        })
      })
    },
  )

  render(<Location />)

  const loadingScreen = screen.getByLabelText(/loading/i)
  expect(loadingScreen).toBeInTheDocument()

  resolve()
  await promise

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude:/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude:/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays error to the user', async () => {
  const errorMessage = 'Geolocation is not supported or permission denied'
  const fakeError = new Error(errorMessage)
  const {promise, reject} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (success, error) => {
      promise.catch(() => {
        // Wrap the error function inside act
        // so that it can yield execution of assertions
        // until all side effects aren't executed
        act(() => {
          error(fakeError)
        })
      })
    },
  )
  render(<Location />)

  expect(screen.getByLabelText('loading...')).toBeInTheDocument()

  // option 2
  // wrapping the reject call inside act
  /*
    await act(async () => {
      try {
        reject()
        await promise
      } catch (e) {}
    })
   */

  try {
    reject()
    await promise
  } catch (e) {}
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
})
