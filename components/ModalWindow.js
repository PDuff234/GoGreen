import { StyleSheet, Text, View, Button, } from "react-native";
import  { FontAwesome5 } from "@expo/vector-icons";

import { recycleGreen } from "../styles/constants";


const ModalWindow = ({ modalProp, handleClick, navigation }) => {
  const { buttonTitle, text, icon, screen, matId  } = modalProp;


  const handleModalClick = () => {
    if (screen === "Map"){
      navigation.navigate(screen, {matId});
    } else {
      navigation.navigate(screen);
    }
    handleClick({
      modal: false,
    });
  }
  return(
    <View style={styles.centeredView}>
      <FontAwesome5 name={icon} size={"100%"} color="white" />
      <Text style={styles.modalText}>{text}</Text>
      <View style={styles.modalButton}>
        <Button
          color={recycleGreen}
          title={buttonTitle}
          onPress={handleModalClick}
        />
      </View>
    </View>
  )
}


export default ModalWindow;

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    backgroundColor: recycleGreen,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',    
  },
  modalText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  modalButton: {
    marginTop: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.45,
    shadowRadius: 5,
    elevation: 5
  },    
})