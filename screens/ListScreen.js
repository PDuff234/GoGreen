import { React, useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Platform, Button, View, Image, Text} from "react-native";
import Constants from 'expo-constants';

import CardList from '../components/CardList';

import { collection, getDocs } from 'firebase/firestore';
import { db, app } from '../config/firebase';

const ListScreen = ({ navigation }) => {
  const [state, setState] = useState({
    data: [],
    isCardSelected: false,
  })

  useEffect ( () => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "UserData", "TestUser", "Recyclables"));
      const data = [];
      querySnapshot.forEach(async (doc) => {
        data.push(doc.data());
      });
      setState({isCardSelected: false, data});
    }
    fetchData();
  }, []);

  const { data, isCardSelected } = state;


  const handleDragEnd = (data) => {
    setState({isCardSelected,data})
  }
  

  return(
    <SafeAreaView style={{flex:1}}>
			{ data ? <CardList items={data} onDragDrop={handleDragEnd} navigation={navigation} /> : null }
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