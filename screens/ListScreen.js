import { React, useState, useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import Constants from 'expo-constants';

import CustomStatusBar from '../components/StatusBar';
import CardList from '../components/CardList';

import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';
import { collection, query, onSnapshot  } from 'firebase/firestore';
import { db } from '../config/firebase';


const ListScreen = ({ navigation }) => {
  const [state, setState] = useState({
    data: [],
  })

  const { user } = useContext(AuthenticatedUserContext);
  const q = query(collection(db, "UserData", `${user.uid}`, "Recyclables"));

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
    <>
      <CustomStatusBar />
      <SafeAreaView style={{flex:1}}>
        { data ? 
          <CardList items={data} 
            navigation={navigation}
            onDataChange={setState}
          /> : 
          null 
        }
      </SafeAreaView>
    </>
 

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