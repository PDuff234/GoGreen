import React from "react";
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
