import React, {useState} from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import { ItemProvider } from "./context/ItemContext";

export default function App() {
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
