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
import HomeScreen from "./screens/HomeScreen";
import { View } from "react-native";


import TestScreen from "./screens/TestScreen";
import SplashScreen from "./screens/SplashScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";


import GuideScreen1 from "./screens/GuideScreen1";
import GuideScreen2 from "./screens/GuideScreen2";
import GuideScreen3 from "./screens/GuideScreen3";


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
	screen: UserScreen,
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


const AuthStack = createStackNavigator({
    SplashScreen: {
        screen: SplashScreen,
    },
    SignInScreen: {
        screen: SignInScreen,
    },
    SignUpScreen: {
        screen: SignUpScreen,
    }},
	{
		defaultNavigationOptions: {
			headerShown: false,
			gestureEnabled: false,
		}
	}
);



// Custom Tab Screen *************

// const GuideTab = createBottomTabNavigator({
// 	Guide1: {
// 		screen: GuideScreen1,
// 		navigationOptions: {
// 			tabBarLabel: "Home",
// 			tabBarOptions: {
// 				activeTintColor: "#006600",
// 			},
// 			tabBarIcon: (tabInfo) => {
// 				return (
// 				<Ionicons
// 					name="md-home"
// 					size={24}
// 					color={tabInfo.focused ? "#006600" : "#8e8e93"}
// 				/>
// 				);
// 			},
// 		},
// 	},
// 	Guide2: {
// 		screen: GuideScreen2,
// 		navigationOptions: {
// 			tabBarLabel: "Location",
// 			tabBarOptions: {
// 				activeTintColor: "#006600",
// 			},
// 			tabBarIcon: (tabInfo) => {
// 				return (
// 				<Ionicons
// 					name="location-outline"
// 					size={24}
// 					color={tabInfo.focused ? "#006600" : "#8e8e93"}
// 				/>
// 				);
// 			},
// 		},
// 	},
// 	Guide3: {
// 		screen: GuideScreen3,
// 		navigationOptions: {
// 			tabBarLabel: "Camera",
// 			tabBarOptions: {
// 				activeTintColor: "#006600",
// 			},
// 			tabBarIcon: (tabInfo) => {
// 				return (
// 				<Ionicons
// 					name="camera-outline"
// 					size={24}
// 					color={tabInfo.focused ? "#006600" : "#8e8e93"}
// 				/>
// 				);
// 			},
// 		},
// 	},
// 	});

	












const GuideStack = createStackNavigator({
	Guide1: {
		screen: GuideScreen1
	},
	Guide2: {
		screen: GuideScreen2
	},
	Guide3: {
		screen: GuideScreen3
	}},
	{
		defaultNavigationOptions: {
			headerShown: false,
			gestureEnabled: false,
		}
})









const RootStack = createStackNavigator({
    AuthStack: {
        screen: AuthStack,
    },
    GuideNavigator: {
        screen: GuideStack,
    },
	TabNavigator: {
		screen: TabNavigator
	}},
	{
		defaultNavigationOptions: {
			headerShown: false,
			gestureEnabled: false,
		}
	}
);

const Navigator = createAppContainer(RootStack);




export default function App() {
	return (
		<Navigator>
			<StatusBar style="auto"/>
			<CameraScreen/>
		</Navigator>
	);
}



