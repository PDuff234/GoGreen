import React, {useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";

//import CameraUpload from "../components/CameraUpload"
import CameraSnap from "../components/CameraSnap";

const CameraScreen = () => {
  const [state, setState] = useState({
    uri: null
  });

return (
    <View style={{ flex: 1, padding: 24 }}>
		  <CameraSnap onSnap={setState}></CameraSnap>
    </View>
  );
};

export default CameraScreen;
