import React from 'react';
import { GoogleMap, Autocomplete,DirectionsRenderer, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import {useRef,useState} from 'react';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const location = { lat: 28.05873, lng: -82.41564}

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAU5WKtwKIV2PB9DpAfv9zDyG1-mWKskkQ",
    libraries: ['places'],
  })

  const [map, setMap] = React.useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  const originRef ={lat: 28.05873, lng: -82.41564}
  const destinationRef ={lat: 28.05506, lng: -82.40021}

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef,
      destination: destinationRef,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={18}
       
      >
        <Marker position={location} />
        <Marker position={{lat: 28.05506, lng: -82.40021}} />
        <Marker position={{lat: 28.07415, lng: -82.43824}} />
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
