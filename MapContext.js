import { createContext, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

import { MATERIALS } from "./constants";

const ItemContext = createContext(); 

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
  let matId;

  switch (loc_mat[0]) {
    case "Commercial":
      if (loc_mat[1] === "paper"){
        matId = MATERIALS.giftBag;
      } else {
        matId = MATERIALS.coatHanger;
      }
      break;
    case "Government_Dropoff":
      matId = MATERIALS.paperCup;
      break;
    case "Retail_Electronics":
      matId = MATERIALS.cable;
      break;
    case "Retail_Grocery":
      if (loc_mat[1] === "plastic"){
        matId = MATERIALS.plasticBag;
      } else {
        matId = MATERIALS.foam;
      }
      break;
    case "Retail_Hardware":
      matId = MATERIALS.cfl;
      break;
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
  }
  
  return({
    modalProp: {
      buttonTitle: "Click me to recycle",
      text: "Yay! This item is recyclable!",
      icon: "recycle",
      screen: "Map", 
      matId,
    }
  });
}

export function ItemProvider({ children }){
  const [state, setContextState] = useState({
    modal: false,
  }); 

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

    setContextState({
      modal: true,
      label, 
      modalProp,
    })
  }

  return(
    <ItemContext.Provider value={{state, setContextState, getPrediction}}>{children}</ItemContext.Provider>
  );
}

export default ItemContext;