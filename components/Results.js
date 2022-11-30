import { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';

import { GOOGLE_MAPS_GEOENCODE_ENDPOINT } from "@env";
import { googleMapsApiKey, earth911ApiKey } from '../ApiKey';

import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';
import ItemContext from '../context/ItemContext';

const searchParams = {
  maxDistance: 50,
  maxResults: 20,
};

const Results = ({ lat, lng }) => {
  const [markers, setMarkers] = useState(null);
  const { itemPredictionRef } = useContext(ItemContext);
  const { user } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    const getLocations = async (latitude, longitude) => {
      if (!itemPredictionRef?.current?.matid) {
        return
      }
      
      const response = await fetch(`https://api.earth911.com/earth911.searchLocations?api_key=${earth911ApiKey}&latitude=${latitude}&longitude=${longitude}&max_distance=${searchParams.maxDistance}&max_results=${searchParams.maxResults}&material_id=${itemPredictionRef?.current?.matid}`, {
        method: "GET",
        header: {
          Accept: "application/json",
        },
      });
  
      const parsed = await response.json();
      
      if (parsed.error){
        return;
      }
      setMarkers(parsed.result);
    }
    getLocations(lat, lng);
  }, [itemPredictionRef?.current?.matid, lat, lng])

  useEffect(() => {
    setMarkers(null);
  }, [user?.uid])

  const handlePress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    const latlngD = `${latitude},${longitude}`;
    const latlngO = `${lat},${lng}`;
  
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
      markers ? 
      markers.map(({ latitude, longitude, location_id }) => 
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