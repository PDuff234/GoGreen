import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, ActivityIndicator, Modal } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from "../config/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc, query, collection, getDoc, updateDoc } from "firebase/firestore";
import * as ImageManipulator from "expo-image-manipulator";

import ModalWindow from "./ModalWindow";
import ItemContext from "../context/ItemContext";
import { AuthenticatedUserContext } from "../providers/AuthenticatedUserProvider";
import { determineUserLabel, determineModalState } from "../functions/helperFunctions";
import { recycleGreen } from "../styles/constants";

export default function CameraSnap({ onSnap, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    modal: false,
  });
  const [type, setType] = useState(Camera.Constants.Type.back);
  const { itemPredictionRef, setItemPrediction, getPrediction } = useContext(ItemContext);
  const { user } = useContext(AuthenticatedUserContext);

  let camera = Camera;

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

  const determineItem = async () => {
    try {
      if (previewVisible) {
        setPreviewVisible(false);
      }
      const photo = capturedImage;
      const manipulateResult = await ImageManipulator.manipulateAsync(
        photo.uri, 
        [{resize: {width: 1024, height: 1024}}],
        { compress: 0.8, format: 'jpeg' }
      ); 
      console.log(typeof(photo.uri)); 
      const response = await fetch(manipulateResult.uri);
      const blob = await response.blob();

      //Syntax for Android is not up to ES-2022 standards and is missing the .at() operator
      //Below is the syntax which works for iOS but not for Android
      //      const filename = photo.uri.split("/").at(-1);
  
      const temp = photo.uri.split("/");
      const filename = temp[temp.length - 1].toString(); 
      console.log(filename); 
      console.log(typeof(filename)); 
      const storageRef = ref(storage, `temp/${filename}`);
      setLoading(true);
      await uploadBytesResumable(storageRef, blob).catch((error) => {
        console.log(error.code);
        console.log(error?.message);
        throw new Error("Firebase internal error during upload");
      });
      await getPrediction(filename);

      if (itemPredictionRef.current.matid){
        await setDoc(doc(db, "UserData", `${user.uid}`, "Recyclables", filename), {
          id: filename,
          material: determineUserLabel(itemPredictionRef.current.matid),
          url: `gs://${storageRef.bucket}/${storageRef.fullPath}`,
          searchid: itemPredictionRef.current.matid,
        });
      }
      
      if (itemPredictionRef.current.label && itemPredictionRef.current.label !== "Trash"){
        const userRef = doc(db, "UserData", `${user.uid}`);
        const snap = await getDoc(userRef)
        const { score } = snap.data()


        if (score){
          await updateDoc(userRef, {
            score: score + 1
          });
        } else{
          await updateDoc(userRef, {
            score: 1
          });
        }
      }
      
      const { modalProp } = determineModalState(itemPredictionRef.current.label);
      setModal({
        modal: true,
        modalProp,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setModal({
        modal: true,
        modalProp: {
          buttonTitle: "Snap another picture",
          text: "Sorry an error just occured! Please try again",
          icon: "frown-open",
          screen: "Camera",
          navigation,
        }
      });
      setLoading(false);
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
      determineItem();
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
                onPress={determineItem}
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
          {loading ? 
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
      <Modal visible={modal.modal}>
        <ModalWindow modalProp={modal.modalProp} handleClick={setModal} navigation={navigation}/>
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