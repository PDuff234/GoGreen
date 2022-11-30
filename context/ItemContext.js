import { createContext } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

import { useStateWithRef } from "../functions/customHooks";
import { determineMatId } from "../functions/helperFunctions";

const ItemContext = createContext(); 

export function ItemProvider({ children }){
  const [itemPrediction, setItemPrediction, itemPredictionRef] = useStateWithRef(null); 

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

  return(
    <ItemContext.Provider 
      value={{ 
        itemPredictionRef, 
        setItemPrediction, 
        getPrediction, 
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export default ItemContext;