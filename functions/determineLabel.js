export const determineLabel = (id) => {
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