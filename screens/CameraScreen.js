import React, {useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import CameraUpload from "../components/CameraUpload"
import CameraSnap from "../components/CameraSnap";

const CameraScreen = () => {
return (
    <View style={{ flex: 1, padding: 24 }}>
		<CameraSnap></CameraSnap>
    </View>
  );
};

export default CameraScreen;
