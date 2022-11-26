import * as React from 'react';
import { StyleSheet, SafeAreaView, Platform, Button, View, Image, Text} from "react-native";
import Constants from 'expo-constants';


const TestScreen = ({navigation}) => {
	return (
		<View>
			<Text>Home Screen</Text>
            <Button title='Go to Home Screen' onPress={() => navigation.navigate(HomeScreen)}/>
		</View>
	)
};

export default TestScreen;