import { MATERIALS } from "../constants";

export const determineUserLabel = (id) => {
  switch (id){
    case 429:
      return "Plastic Bag";
    case 655:
      return "Foam";
    case 442:
      return "Paper cup";
    case 333:
      return "CFL";
    case 482:
      return "Cable";
    case 97: 
      return "Coat hanger";
    case 343:
      return "Gift bag";
    default:
      return "Recyclable";
  }
}

export const determineMatId = (label) => {
  if (label){
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
      default:
        return null;
    }
  }
  return null;
}

export const determineModalState = (label) => {
  if (!label || label === "Trash") {
    return(
      {
        modalProp: {
          buttonTitle: "Snap another picture",
          text: "This is possibly trash or needs special disposal. Please snap a picture of something else",
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
      //Again, Android is not up to ES-2022 standards, so below is the syntax for the if statement for iOS
      //if (loc_mat.at(-1) === "plastic")
      if (loc_mat[loc_mat.length - 1] === "plastic"){
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