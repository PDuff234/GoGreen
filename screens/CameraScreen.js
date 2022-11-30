import React, {useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, Image, SafeAreaView, ScrollView, StyleSheet, Modal } from "react-native";

//import CameraUpload from "../components/CameraUpload"
import CameraSnap from "../components/CameraSnap";
import CustomStatusBar from "../components/StatusBar";

const CameraScreen = ({ navigation }) => {
  const [state, setState] = useState({
    uri: null
  });

return (
  <>
    <CustomStatusBar />
    <View style={{ flex: 1 }}>
      <CameraSnap onSnap={setState} navigation={navigation}></CameraSnap>
    </View>    
  </>

  );
};

export default CameraScreen;
