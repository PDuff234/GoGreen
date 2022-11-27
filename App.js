import React, {useState} from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';

export default function App() {
	return (
		<AuthenticatedUserProvider>
			<SafeAreaProvider>
		  		<RootNavigator />
			</SafeAreaProvider>
	  	</AuthenticatedUserProvider>
	);
}
