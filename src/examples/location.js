import {useLocation} from 'components/use-location'
import * as React from 'react'
import Spinner from '../components/spinner'

function Location() {
  const [position, error] = useLocation()

  if (!position && !error) {
    return <Spinner />
  }

  if (error) {
    return (
      <div role="alert" style={{color: 'red'}}>
        {error.message}
      </div>
    )
  }

  return (
    <div>
      <p>Latitude: {position.coords.latitude}</p>
      <p>Longitude: {position.coords.longitude}</p>
    </div>
  )
}

export default Location
