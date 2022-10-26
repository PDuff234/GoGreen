import { React, useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Platform, Button, View, Image, Text} from "react-native";
import Constants from 'expo-constants';

import CardList from '../components/CardList';

import { collection, getDocs } from 'firebase/firestore';
import { db, app } from '../firebaseConfig';

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
        // console.log(`${doc.id} => ${doc.data()}`);
        data.push(doc.data());
      });
      // setState({data: querySnapshot.docs[0].data().url})
      // const storage = firebase.getStorage(app)
      // const ref = firebase.ref(storage, "gs://gogreen-366404.appspot.com/test/plastic4.jpg");
      // const url = await firebase.getDownloadURL(ref);
      // setState({url})
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
      {/* <Text>{state.url}</Text>
      <Image style={{height: 200, width: 200}} source={{uri: state.url}}></Image>
      { state.url ? <View><Image source={{uri: state.url}}></Image></View> : null } */}
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