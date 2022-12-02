import React, {useState} from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from "react-native";

import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import { ItemProvider } from "./context/ItemContext";

export default function App() {

	LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
	LogBox.ignoreAllLogs();

	return (
		<AuthenticatedUserProvider>
			<SafeAreaProvider>
				<ItemProvider>
					<RootNavigator />
				</ItemProvider>
			</SafeAreaProvider>
		</AuthenticatedUserProvider>
	);
}
