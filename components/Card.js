import { React, } from 'react';
import { StyleSheet, View, Text, Image, Dimensions} from "react-native";

import RadioButton from './RadioButton';

const windowWidth = Dimensions.get('window').width;

const Card = (props) => {
  const { imgSrc, cardTitle, materialName, selected, id, onPress } = props;

  return(
    <View style={styles.cardContainer}>
      <View style={styles.content}>
        <Image style={styles.image} source={imgSrc}></Image>
        <View>
          <Text style={styles.title} numberOfLines={1}>{cardTitle}</Text>
          <Text style={styles.subtitle}>{materialName}</Text>
        </View>
        <RadioButton id={id} onPress={onPress} isChecked={selected}  />
      </View>
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
    borderColor: '#154C8A',
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
    borderColor:'#154C8A',
  },
  title: {
    width: 200,
    fontSize: 25,
    color: '#154C8A',
  },

  subtitle: {
    fontSize: 15,
    color: '#154C8A',
  }
});

export default Card;

