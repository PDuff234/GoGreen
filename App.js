import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';

export default function App() {
	return (
		<AuthenticatedUserProvider>
			<SafeAreaProvider>
				<StatusBar style="auto"/>
		  		<RootNavigator />
			</SafeAreaProvider>
	  	</AuthenticatedUserProvider>
	);
}
