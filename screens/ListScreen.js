import { React, useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, Button,} from "react-native";
import Constants from 'expo-constants';

import CardList from '../components/CardList';

const ListScreen = ({ navigation }) => {
  const [state, setState] = useState({
    data: [
      {image: '../assets/bottles.jpg', name: 'Water Bottles', material: 'Plastic', id: 1},
      {image: '../assets/coca-cola.webp', name: 'Soda cans', material: 'Aluminum can', id: 2},
      {image: '../assets/styrofoam.jpg', name: 'Takeout box', material: 'Plastic', id: 3},
    ],
    isCardSelected: false,
  })

  const { data, isCardSelected } = state;


  const handleDragEnd = (data) => {
    setState({isCardSelected,data})
  }

  return(
    <SafeAreaView style={styles.container}>
			<CardList items={data} onDragDrop={handleDragEnd} navigation={navigation} />   
    </SafeAreaView>

  )
}

const platformVersion =
  Platform.OS === 'ios'
    ? parseInt(Platform.Version, 10)
    : Platform.Version;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || platformVersion < 11
      ? Constants.statusBarHeight : 0,
  },
});
export default ListScreen;