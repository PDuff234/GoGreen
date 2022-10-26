import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ButtonGroup, Card } from 'react-native-elements'; 


const Camera = () => {
  const [image,setImage]=useState(null)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing:true
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const ButtonGroupModeSelection = ({ updateIndex, inputModeIndex }) => {
    return (
        <ButtonGroup
            selectedTextStyle = {{ color: 'white' }}
            selectedButtonStyle = {{backgroundColor: '#30518e'}}
            onPress = {updateIndex}
            selectedIndex = {inputModeIndex}
            buttons = {['Snap Photo', 'Upload Photo']}
            containerStyle = {{ height: 40, width: 370, margin: 0, padding: 0 }}
        />
    );
  };

  interface Props {
    foundMaterials?: object[];
  }
  
  interface State {
    hasCameraPermission: boolean | undefined;
    type: string;
    image: string;
    loading: boolean;
    inputModeIndex: number;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
      <Button title="Pick Image" onPress={pickImage}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Camera; 