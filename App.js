import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler'; 

import HomeScreen from "./screens/HomeScreen";
import UserScreen from "./screens/UserScreen";
import MapScreen from "./screens/MapScreen";
import MapDisplay from "./screens/Map"; 
import ListScreen from "./screens/ListScreen";


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
	screen: HomeScreen,
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
<<<<<<< HEAD
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
			name="md-map-sharp"
			size={24}
			color={tabInfo.focused ? "#006600" : "#8e8e93"}
		/>
		);
	},
	},
},
Camera: {
	screen: HomeScreen,
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
Notifications: {
	screen: HomeScreen,
	navigationOptions: {
	tabBarLabel: "Notifications",
	tabBarOptions: {
		activeTintColor: "#006600",
	},
	tabBarIcon: (tabInfo) => {
		return (
		<Ionicons
			name="notifications-outline"
			size={24}
			color={tabInfo.focused ? "#006600" : "#8e8e93"}
		/>
		);
	},
	},
},
User: {
	screen: UserScreen,
=======
},
List: {
	screen: ListStack,
>>>>>>> a78c62dbe00892790fbdec6c532062fa193d8773
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
<<<<<<< HEAD
=======
MapContainer: {
	screen: MapDisplay,
	navigationOptions: {
		tabBarLabel: "Map",
		tabBarOptions: {
			activeTintColor: "#006600",
		},
		tabBarIcon: (tabInfo) => {
			return (
			<Ionicons
				name="md-map-sharp"
				size={24}
				color={tabInfo.focused ? "#006600" : "#8e8e93"}
			/>
			);
		},
	},
},
>>>>>>> a78c62dbe00892790fbdec6c532062fa193d8773
});

const Navigator = createAppContainer(TabNavigator);

export default function App() {
	return (
		<Navigator>
			<StatusBar style="auto"/>
			<HomeScreen/>
		</Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
	  backgroundColor: '#i35631',
	  width: 500, 
	},
  });
