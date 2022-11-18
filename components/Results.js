import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';

import { GOOGLE_MAPS_GEOENCODE_ENDPOINT } from "@env";
import { googleMapsApiKey, earth911ApiKey } from '../ApiKey';

const Results = ({ searchParams }) => {
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    async function getResults() {
      const response = await fetch(`https://api.earth911.com/earth911.searchLocations?api_key=${earth911ApiKey}\&latitude=${searchParams.geolocation.latitude}&longitude=${searchParams.geolocation.longitude}\&business_only=${searchParams.businessOnly}&max_distance=${searchParams.maxDistance}\&max_results=${searchParams.maxResults}&material_id=${searchParams.materialId}`, {
          method: "GET",
          header: {
            Accept: "application/json",
          },
      });
      const parsed = await response.json();

      if (parsed.error){
        return
      }
      setLocations(parsed.result);
    }
    getResults();
  }, [])

  const handlePress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    const latlngD = `${latitude},${longitude}`;
    const latlngO = `${searchParams.geolocation.latitude},${searchParams.geolocation.longitude}`;
  
    const responseDestination = await fetch(`${GOOGLE_MAPS_GEOENCODE_ENDPOINT}?latlng=${latlngD}&key=${googleMapsApiKey}`);
    const parsedDestination = await responseDestination.json();
    const destId = parsedDestination.results[0].place_id;

    const responseOrigin = await fetch(`${GOOGLE_MAPS_GEOENCODE_ENDPOINT}?latlng=${latlngO}&key=${googleMapsApiKey}`);
    const parsedOrigin = await responseOrigin.json();
    const originId = parsedOrigin.results[0].place_id;

    const parameters = `origin=${latlngO}\&origin_place_id:${originId}&destination=${latlngD}&destination_place_id:${destId}`;
    
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&${parameters}`);
 
  }


  return (
    <>
    {
      locations ? 
      locations.map(({ latitude, longitude, location_id }) => 
        <Marker 
          coordinate={{latitude, longitude}} 
          tappable={true} 
          onPress={handlePress} 
          key={location_id}
        />
      ) : 
      <></>
    } 
    </>
  );
}

export default Results;