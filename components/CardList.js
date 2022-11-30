import { React, useContext } from 'react';
import { Animated, StyleSheet, View, TouchableOpacity, Button, Text, Pressable, FlatList} from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { collection, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

import ItemContext from '../context/ItemContext';
import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';
import Card from './Card';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5);

const CardList = ({ items, navigation, onDataChange }) => {
  const { setItemPrediction } = useContext(ItemContext);
  const { user } = useContext(AuthenticatedUserContext);

  const renderItem = ({item}) => {
    const {id, material, url} = item;

    const renderRightView = (progress, dragX, onDeleteHandler) => {
      const scale = dragX.interpolate({
        inputRange: [-80, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
      return(
        <RectButton style={styles.rightAction} onPress={onDeleteHandler}>
          <AnimatedIcon 
            name="trash"
            size={30}
            color='#fff'
            style={styles.rightIcon}
          />
        </RectButton>
      )
    }
    
		return(
      <Swipeable
        renderRightActions={(progress, dragX) => renderRightView(progress, dragX, async () => {
          await deleteDoc(doc(db, "UserData", `${user.uid}`, "Recyclables", item.docid));
          const querySnapshot = await getDocs(collection(db, "UserData", `${user.uid}`, "Recyclables"));
          const data = [];
          querySnapshot.forEach(async (doc) => {
            const item = doc.data();
            item.docid = doc.id;
            data.push(item);
          });             
          onDataChange({
            data
          });
        })}
        friction={3}
        rightThreshold={40}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Map");
            setItemPrediction({
              matid: item.searchid,
            })
          }}
        >
          <Card 
            id={id}
            imageSrc={url}
            materialName={material}
          />
        </TouchableOpacity>
      </Swipeable>
		);
	};
  

  const keyExtractor = ({ id }) => id.toString();

	return (
			<View style={styles.container}>
				<FlatList
						data={items}
            onDragEnd={({data}) => onDragDrop(data)}
						keyExtractor={keyExtractor}
						renderItem={renderItem}
				/>
			</View>
	);

}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 'auto', 
    borderBottomWidth: 2,
    borderColor: '#006600',
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'flex-end'    
  },
  rightIcon: {
    width: 35,
    marginHorizontal: 10,
  }
})


export default CardList;