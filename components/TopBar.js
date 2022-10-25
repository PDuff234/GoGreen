import { React } from "react";
import { StyleSheet, View, Dimensions} from "react-native";
import Constants from 'expo-constants';

const windowWidth = Dimensions.get('window').width;

const TopBar = () => {

  return(
    <View style={styles.container}></View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: 60,
    backgroundColor: '#154C8A',
    position: 'absolute',
    top: Constants.statusBarHeight,
  },
});

export default TopBar;