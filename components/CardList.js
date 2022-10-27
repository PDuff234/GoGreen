import { React, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Button, SafeAreaView} from 'react-native';


import Card from './Card';
import DraggableFlatList, {ScaleDecorator} from 'react-native-draggable-flatlist';

const CardList = ({ items, onDragDrop, navigation }) => {
  const [state, setState] = useState({
    currentSelected: null,
  })
  
  const handleRadioClick = (id) => {
    if (state.currentSelected === id) {
      setState({
        currentSelected: null,
      })
    } else {
      setState({
        currentSelected: id,
      });
    }
    
  }

  const { currentSelected } = state;

  const renderItem = ({item, drag, isActive}) => {
    const {id, name, material, url} = item;
    const isChecked = state.currentSelected === id ? true : false;
    
		return(
			<ScaleDecorator >
				<TouchableOpacity
          activeOpacity={1}
					onLongPress={drag}
					disabled={isActive}
				>
					<Card 
            id={id}
            imageSrc={url}
            cardTitle={name}
            materialName={material}
            selected={isChecked}
            onPress={handleRadioClick}
          />
				</TouchableOpacity>
			</ScaleDecorator>
		);
	};
  

  const keyExtractor = ({ id }) => id.toString();

	return (
			<View style={styles.container}>
				<DraggableFlatList
						data={items}
            onDragEnd={({data}) => onDragDrop(data)}
						keyExtractor={keyExtractor}
						renderItem={renderItem}
				/>
        { currentSelected ?  
          <View style={styles.mapNavigation}>
            <Button 
              title='Go to map' 
              color={'#006600'}
              onPress={() => navigation.navigate('Map')}
            />
          </View>: null}
			</View>
	);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mapNavigation: {
    width: 120,
    height: 40,
    position: 'absolute',
    bottom: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#006600',
  },
})


export default CardList;