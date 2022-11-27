import { React, useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Platform, Button, View, Image, Text} from "react-native";
import Constants from 'expo-constants';

import CardList from '../components/CardList';

import { collection, getDocs, query, onSnapshot  } from 'firebase/firestore';
import { db, app } from '../config/firebase';


const q = query(collection(db, "UserData", "TestUser", "Recyclables"));

const ListScreen = ({ navigation }) => {
  const [state, setState] = useState({
    data: [],
  })

  useEffect ( () => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        item.docid = doc.id;
        data.push(item);
      }); 
      setState({data});  
    })
    return unsubscribe;
  }, []);

  const { data } = state;

  return(
    <SafeAreaView style={{flex:1}}>
			{ data ? 
        <CardList items={data} 
          navigation={navigation}
          onDataChange={setState}
        /> : 
        null 
      }
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