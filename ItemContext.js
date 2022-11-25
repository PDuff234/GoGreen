import { createContext, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

import { MATERIALS } from "./constants";
import { earth911ApiKey } from "./ApiKey";

const ItemContext = createContext(); 

const searchParams = {
  maxDistance: 50,
  maxResults: 20,
};

const determineMatId = (label) => {
  const loc_mat = label.split("1");

  switch (loc_mat[0]) {
    case "Commercial":
      if (loc_mat[1] === "paper"){
        return MATERIALS.giftBag;
      } else {
        return MATERIALS.coatHanger;
      }
    case "Government_Dropoff":
      return MATERIALS.paperCup;
    case "Retail_Electronics":
      return MATERIALS.cable;
    case "Retail_Grocery":
      if (loc_mat[1] === "plastic"){
        return MATERIALS.plasticBag;
      } else {
        return MATERIALS.foam;
      }
    case "Retail_Hardware":
      return MATERIALS.cfl;
  }
}

const determineModalState = (label) => {
  if (!label || label === "Trash") {
    return(
      {
        modalProp: {
          buttonTitle: "Snap another picture",
          text: "This is trash and should not be recycled",
          icon: "trash",
          screen: "Camera",
        }
      }
    );
  }

  const loc_mat = label.split("1");

  switch (loc_mat[0]) {
    case "Government_Curbside":
      let modalProp = {
        buttonTitle: "Snap another picture",
        icon: "recycle",
        screen: "Camera",
      };
      if (loc_mat.at(-1) === "plastic"){
        modalProp.text = "This plastic can be recycled at your curbside but consider reusing or reducing instead!";
      } else{
        modalProp.text = "This item can be recycled at your curbside or any recycling bin!";
      }
      return({
        modalProp
      });
    default: 
      return({
        modalProp: {
          buttonTitle: "Click me to recycle",
          text: "Yay! This item is recyclable!",
          icon: "recycle",
          screen: "Map", 
        }
      });
  }
}

export function ItemProvider({ children }){
  const [itemContext, setItemContext] = useState({
    modal: false,
  }); 

  const [locations, setLocation] = useState([]);
  

  const getPrediction = async (image) => {
    const functions = getFunctions();
    const getPredictionRequest = httpsCallable(functions, 'getPredictionRequest');
    const result = await getPredictionRequest({ filepath: `temp/${image}` }).catch((error) => {
      console.log(error.code);
      console.log(error?.message);
      throw new Error("Firebase internal error during endpoint prediction");
    });
    const { label } = result.data;
    const { modalProp }= determineModalState(label);

    if (label){
      const matid = determineMatId(label);
      setItemContext({
        modal: true,
        matid,
        modalProp,
      })
    } else {
      setItemContext({
        modal: true,
        modalProp,
      })
    }
    


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

    console.log(parsed.result);
    setLocation(parsed.result);
  }

  return(
    <ItemContext.Provider value={{ itemContext, locations, setItemContext, getPrediction, getLocations }}>{children}</ItemContext.Provider>
  );
}

export default ItemContext;