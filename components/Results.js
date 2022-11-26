import { useState, useEffect, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';

import { GOOGLE_MAPS_GEOENCODE_ENDPOINT } from "@env";
import { googleMapsApiKey } from '../ApiKey';
import ItemContext from '../context/ItemContext';



const Results = ({ lat, lng }) => {
  const { itemContext, location, markers, getLocations } = useContext(ItemContext);

  useEffect(() => {
    getLocations(lat,lng);
  }, [itemContext.matid, location])

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