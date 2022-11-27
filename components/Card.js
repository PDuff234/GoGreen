import { React, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions} from "react-native";

import RadioButton from './RadioButton';
import { storage } from '../config/firebase';

import * as firebase from 'firebase/storage';

const windowWidth = Dimensions.get('window').width;

const Card = (props) => {
  const { imageSrc, materialName } = props;
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
      <View style={styles.content}>
        <View style={styles.imageContainer}><Image style={styles.image} source={{uri}} /></View>
        <View>
          <Text style={styles.title}>{materialName}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth,
    height: 80,
    borderTopWidth: 2,
    borderColor: '#006600',
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    overflow: 'visible',
  },
  image: {
    marginHorizontal: 10,
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  title: {
    width: 200,
    fontSize: 28,
    color: '#006600',
  },
  subtitle: {
    fontSize: 15,
    color: '#006600',
  }
});

export default Card;

