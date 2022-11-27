import { createContext, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import * as Location from 'expo-location';

import { useStateWithRef } from "../functions/customHooks";
import { determineMatId } from "../functions/helperFunctions";
import { earth911ApiKey } from "../ApiKey";

const ItemContext = createContext(); 

const searchParams = {
  maxDistance: 50,
  maxResults: 20,
};

export function ItemProvider({ children }){
  const [itemPrediction, setItemPrediction, itemPredictionRef] = useStateWithRef(null); 
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  const getPrediction = async (image) => {
    const functions = getFunctions();
    const getPredictionRequest = httpsCallable(functions, 'getPredictionRequest');
    const result = await getPredictionRequest({ filepath: `temp/${image}` }).catch((error) => {
      console.log(error.code);
      console.log(error?.message);
      throw new Error("Firebase internal error during endpoint prediction");
    });
    const { label } = result.data;
    const matid = determineMatId(label);
    
    setItemPrediction({
      label,
      matid,
    });
  }

  const getLocations = async (lat, lng) => {
    const response = await fetch(`https://api.earth911.com/earth911.searchLocations?api_key=${earth911ApiKey}&latitude=${lat}&longitude=${lng}&max_distance=${searchParams.maxDistance}&max_results=${searchParams.maxResults}&material_id=${itemContext.matid}`, {
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

  const updateUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;

    setLocation({
      latitude,
      longitude
    })
  }

  return(
    <ItemContext.Provider 
      value={{ 
        itemPredictionRef, 
        location,
        markers,
        setMarkers, 
        setItemPrediction, 
        getPrediction, 
        getLocations, 
        updateUserLocation,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export default ItemContext;