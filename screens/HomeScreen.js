import React, {useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import Camera from "../components/Camera"

const Home = () => {
return (
    <View style={{ flex: 1, padding: 24 }}>
      <Camera></Camera>
    </View>
  );
};

export default Home;
