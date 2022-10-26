import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler'; 

import UserScreen from "./screens/UserScreen";
import MapScreen from "./screens/MapScreen";
import MapDisplay from "./screens/Map"; 
import ListScreen from "./screens/ListScreen";
import CameraScreen from "./screens/CameraScreen";
import { Camera } from "expo-camera";


const ListStack = createStackNavigator({
	List: ListScreen,
	Map: MapScreen,}
	,{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#154C8A',
			}, 
			headerTitleStyle: {
				color: "#fff"
			},
		}
});

const TabNavigator = createBottomTabNavigator({
Home: {
	screen: CameraScreen,
	navigationOptions: {
		tabBarLabel: "Home",
		tabBarOptions: {
			activeTintColor: "#006600",
		},
		tabBarIcon: (tabInfo) => {
			return (
			<Ionicons
				name="md-home"
				size={24}
				color={tabInfo.focused ? "#006600" : "#8e8e93"}
			/>
			);
		},
	},
},
Location: {
	screen: MapDisplay,
	navigationOptions: {
		tabBarLabel: "Location",
		tabBarOptions: {
			activeTintColor: "#006600",
		},
		tabBarIcon: (tabInfo) => {
			return (
			<Ionicons
				name="location-outline"
				size={24}
				color={tabInfo.focused ? "#006600" : "#8e8e93"}
			/>
			);
		},
	},
},
Camera: {
	screen: CameraScreen,
	navigationOptions: {
		tabBarLabel: "Camera",
		tabBarOptions: {
			activeTintColor: "#006600",
		},
		tabBarIcon: (tabInfo) => {
			return (
			<Ionicons
				name="camera-outline"
				size={24}
				color={tabInfo.focused ? "#006600" : "#8e8e93"}
			/>
			);
		},
	},
},
List: {
	screen: ListStack,
	navigationOptions: {
		headerStyle: { backGroundColor: 'red' },
		tabBarLabel: "List",
		tabBarOptions: {
			activeTintColor: "#006600",
		},
		tabBarIcon: (tabInfo) => {
			return (
			<Ionicons
				name="md-list"
				size={24}
				color={tabInfo.focused ? "#006600" : "#8e8e93"}
			/>
			);
		},
	},
},
Profile: {
	screen: CameraScreen,
	navigationOptions: {
		headerStyle: { backGroundColor: '#i35631' },
		tabBarLabel: "Profile",
		tabBarOptions: {
			activeTintColor: "#006600",
		},
		tabBarIcon: (tabInfo) => {
			return (
			<Ionicons
				name="person-circle-outline"
				size={24}
				color={tabInfo.focused ? "#006600" : "#8e8e93"}
			/>
			);
		},
	},
},
});

const Navigator = createAppContainer(TabNavigator);

export default function App() {
	return (
		<Navigator>
			<StatusBar style="auto"/>
			<CameraScreen/>
		</Navigator>
	);
}
