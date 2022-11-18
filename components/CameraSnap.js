import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";

export default function CameraSnap({ onSnap }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
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

  const takePicture = async () => {
    if (!camera) return;
    let photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
    console.log(photo.uri); 

    const manipulateResult = await ImageManipulator.manipulateAsync(
      photo.uri, 
      [{ resize: {width: 640, height: 480} }], 
      { format: 'jpeg' }
    ); 
    const response = await fetch(manipulateResult.uri);
    const blob = await response.blob();

    const storageRef = ref(storage, 'test/test-image.jpeg');
    await uploadBytesResumable(storageRef, blob).then( () => {
      console.log("Success");
    } );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing:true
    });
    if (!result.canceled) {
      setPreviewVisible(true); 
      setCapturedImage(result); 
      console.log(result); 

      const manipulateResult = await ImageManipulator.manipulateAsync(
        result.uri, 
        [{ resize: {width: 640, height: 480} }], 
        { format: 'jpeg' }
      ); 

      console.log(manipulateResult); 
      
      const response = await fetch(manipulateResult.uri);
      const blob = await response.blob();
  
      const storageRef = ref(storage, 'test/test-image.jpeg');
      await uploadBytesResumable(storageRef, blob).then( () => {
        console.log("Success");
      });
    }
  };

  
  return (
    <View
      style={{
        flex: 1,
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
            </View>
          </View>
        </ImageBackground>
      ) : (
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
      )}
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
    }
  });