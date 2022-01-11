import {useEffect, useState} from 'react'

export const useLocation = () => {
  const [{position, error}, setState] = useState({position: null, error: null})

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        setState({position, error: null})
      },
      error => {
        setState({position: null, error})
      },
      {maximumAge: 0, timeout: 10000, enableHighAccuracy: true},
    )
  }, [])

  console.log(position)

  // NOTE: If you don't put your state update functions inside act(() => {})
  // the below useEffect will run after your assertions

  // useEffect(() => {
  //   console.log('Running useEffect.')
  // })

  return [position, error]
}
