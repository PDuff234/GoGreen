import React from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InscriptionScreen from "../components/AddressForm";

const User = () => {
return (
	<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
		<InscriptionScreen />
	</View>
);
};


export default User;
