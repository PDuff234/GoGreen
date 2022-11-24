import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, ActivityIndicator, Modal } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable } from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";
import * as ImageManipulator from "expo-image-manipulator";


import ModalWindow from "./ModalWindow";
import { MATERIALS } from "../constants";
import { recycleGreen } from "../styles/constants";


const determineState = (prediction) => {

  const { label } = prediction;
  let nav = {
    loading: false,
    modal: true,
  }

  if (!label || label === "Trash") {
    return(
      {
        ...nav,
        modalProp: {
          buttonTitle: "Snap another picture",
          text: "This is trash and should not be recycled",
          icon: "trash",
          screen: "Camera",
        }
      }
    );
  }

  const loc_mat = label.split("1");
  let matId;

  switch (loc_mat[0]) {
    case "Commercial":
      if (loc_mat[1] === "paper"){
        matId = MATERIALS.giftBag;
      } else {
        matId = MATERIALS.coatHanger;
      }
      break;
    case "Government_Dropoff":
      matId = MATERIALS.paperCup;
      break;
    case "Retail_Electronics":
      matId = MATERIALS.cable;
      break;
    case "Retail_Grocery":
      if (loc_mat[1] === "plastic"){
        matId = MATERIALS.plasticBag;
      } else {
        matId = MATERIALS.foam;
      }
      break;
    case "Retail_Hardware":
      matId = MATERIALS.cfl;
      break;
    case "Government_Curbside":
      let modalProp = {
        buttonTitle: "Snap another picture",
        icon: "recycle",
        screen: "Camera",
      };
      if (loc_mat.at(-1) === "plastic"){
        modalProp.text = "This plastic can be recycled at your curbside but consider reusing or reducing instead!";
      } else{
        modalProp.text = "This item can be recycled at your curbside or any recycling bin!";
      }
      return({
        ...nav,
        modalProp
      });
  }
  
  return({
    ...nav,
    modalProp: {
      buttonTitle: "Click me to recycle",
      text: "Yay! This item is recyclable!",
      icon: "recycle",
      screen: "Map", 
      matId,
    }
  });
}

export default function CameraSnap({ onSnap, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [navState, setNav] = useState({
    loading: false,
    modal: false,
  });
  const [type, setType] = useState(Camera.Constants.Type.back);

  let camera = Camera

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleSave = async () => {
    try {
      setPreviewVisible(false);
      const photo = capturedImage;
      const manipulateResult = await ImageManipulator.manipulateAsync(
        photo.uri, 
        [{resize: {width: 1024, height: 1024}}],
        { compress: 0.8, format: 'jpeg' }
      ); 
      const response = await fetch(manipulateResult.uri);
      const blob = await response.blob();
  
      const filename = photo.uri.split("/").at(-1);
      const storageRef = ref(storage, `temp/${filename}`);
      setNav({
        loading: true,
        modal: false,
      });
      await uploadBytesResumable(storageRef, blob);
  
      const functions = getFunctions();
      const getPredictionRequest = httpsCallable(functions, 'getPredictionRequest');
      const result = await getPredictionRequest({ filepath: `temp/${filename}` });
  
      const state = determineState(result.data, navigation);
      state.modalProp.navigation = navigation;
      setNav(state);
    } catch (error) {
      console.log(error)
      setNav({
        modal: true,
        loading: false,
        modalProp: {
          buttonTitle: "Snap another picture",
          text: "Sorry an error just occured! Please try again",
          icon: "frown-open",
          screen: "Camera",
          navigation,
        }
      })
    }
  }

  const takePicture = async () => {
    if (!camera) return;
    let photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing:true
    });
    if (!result.canceled) {
      setCapturedImage(result); 
      handleSave();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center'
      }}
    >
      {previewVisible ? (
        <ImageBackground
          source={{ uri: capturedImage && capturedImage.uri }}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 15,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => setPreviewVisible(false)}
                style={{
                  width: 130,
                  height: 40,

                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                  }}
                >
                  Re-take
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  width: 130,
                  height: 40,

                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : 
        <>
          {navState.loading ? 
            <ActivityIndicator 
              size="large"
              color={recycleGreen}
            /> :
            <Camera
              style={{ flex: 1 }}
              type={type}
              ref={(r) => {
                camera = r;
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: "5%",
                    left: "5%",
                  }}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <Text style={{ fontSize: 20, marginBottom: 10, color: "white" }}>
                    {" "}
                    Flip{" "}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    flex: 1,
                    width: "100%",
                    padding: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity onPress={takePicture}> 
                        <Image style={styles.snap} source = {require('../assets/Camera.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {pickImage}>
                      <Image style = {styles.button} source={require('../assets/Upload.png')}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Camera>   
          }
 
        </>       
      }
      <Modal visible={navState.modal}>
        <ModalWindow modalProp={navState.modalProp} handleClick={setNav}/>
      </Modal>
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
    button: {
      backgroundColor: 'transparent',
      width: 25, 
      height: 25, 
      left: 100, 
      top: -50, 
      padding: 10,
    },
    snap: {
        backgroundColor: 'transparent', 
        width: 70,
        height: 70,
        bottom: 0,
        borderRadius: 50,
    },
  });