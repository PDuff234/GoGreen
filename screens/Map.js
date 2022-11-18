import React, {useEffect,useState} from 'react';
import { Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';

import { MATERIALS } from '../constants';
import { primaryColor } from '../styles/constants';
import Results from '../components/Results';

const searchParams = {
  maxDistance: 25,
  maxResults: 20,
  materialId: 429,
}

const Map = ({ label }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, seterrorMsg] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getPermissions(){
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted'){
        seterrorMsg('Please allow location permission to use this feature');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);

      searchParams.geolocation = { 
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
       };
      
    }
    getPermissions();
  }, []);

  if (errorMsg){
    return (
      <View style={styles.mapContainer}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }


  switch(label){
    case "Government_Dropoff1paper":
      searchParams.materialId = MATERIALS.paperCup;   
    case "Retail_Grocery1foam":
      searchParams.materialId = MATERIALS.foam;
    case "Retail_Grocery1plastic":
      searchParams.materialId = MATERIALS.plasticBag;
    case "Retail_Hardware1cfl":
      searchParams.materialId = MATERIALS.cfl;
  }


  return (
    <View style={styles.mapContainer}>
      { isLoading ? 
        <ActivityIndicator size="large" color={primaryColor}/> :
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Results searchParams={searchParams}></Results>      
        </MapView> 
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
