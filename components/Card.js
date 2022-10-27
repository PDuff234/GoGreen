import { React, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions} from "react-native";

import RadioButton from './RadioButton';
import { storage } from '../firebaseConfig';

import * as firebase from 'firebase/storage';



const windowWidth = Dimensions.get('window').width;

const Card = (props) => {
  const {  id, imageSrc, cardTitle, materialName, selected, onPress } = props;
  const [state, setState] = useState({
    uri: null
  })

  useEffect( () => {
    async function fetchDownloadUrl() {
      const ref = firebase.ref(storage, imageSrc);
      const uri = await firebase.getDownloadURL(ref);  
      setState({uri})
    }
    fetchDownloadUrl();
  }, [])

  const { uri } = state;
  return(

    <View style={styles.cardContainer}>
      {true ?
      <View style={styles.content}>
        <Image style={styles.image} source={{uri}}></Image>
        <View>
          <Text style={styles.title} numberOfLines={1}>{cardTitle}</Text>
          <Text style={styles.subtitle}>{materialName}</Text>
        </View>
        <RadioButton id={id} onPress={onPress} isChecked={selected}  />
      </View> : 
      null}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: windowWidth * 0.9,
    height: 80,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#006600',
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    marginLeft: -10,
    width: 60,
    height: 60,
    borderRadius: 10,
    borderColor:'#006600',
  },
  title: {
    width: 200,
    fontSize: 25,
    color: '#006600',
  },

  subtitle: {
    fontSize: 15,
    color: '#006600',
  }
});

export default Card;

