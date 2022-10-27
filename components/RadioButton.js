import { React } from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';

const RadioButton = (props) => {
  const {id, isChecked, onPress} = props

  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <View style={[styles.radioOuter,]}>
        {
          isChecked ? <View style={styles.radioInner}/> : null
        }
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  radioOuter: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor:'#006600',
    alignItems: 'center',
    justifyContent: 'center',    
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#006600',    
  },
});

export default RadioButton;