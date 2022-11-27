import React, {useEffect, useState, useContext} from 'react';
import { Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';

import ItemContext from '../context/ItemContext';
import { recycleGreen } from '../styles/constants';
import Results from '../components/Results';

const Map = () => {
  const [errorMsg, seterrorMsg] = useState(null);
  const { location, updateUserLocation } = useContext(ItemContext);

  useEffect(() => {
    async function getPermissions(){
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted'){
        seterrorMsg('Please allow location permission to use this feature');
        return;
      }
    }
    getPermissions();
    updateUserLocation();
  }, []);


  if (errorMsg){
    return (
      <View style={styles.mapContainer}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }


  return (
    <View style={styles.mapContainer}>
      { location ? 
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onUserLocationChange={updateUserLocation}
        >
          <Results 
            lat={location.latitude} 
            lng={location.longitude}
          />  
        </MapView> : 
        <ActivityIndicator size="large" color={recycleGreen}/>  
      }
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
  }
})

export default Map
