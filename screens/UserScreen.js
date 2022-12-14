import React, { useEffect, useCallback, useContext, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { signOut } from 'firebase/auth';
import * as Animatable from 'react-native-animatable';
import { AuthenticatedUserContext } from '../providers';
import { View, TextInput, Logo, FormErrorMessage } from '../components';

import { auth } from '../config'; 
import { recycleGreen } from '../styles/constants';

const UserScreen = () => {

  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error)); 
  }; 

  const { user, setUser } = useContext(AuthenticatedUserContext);

  return (
	<View style={styles.container}>
		<View style={styles.topBarInfoContainer}>
			<Animatable.Image 
				animation="bounceIn"
				duraton="1500"
				source={require('../assets/goGreen-Logo.png')}
				style={styles.logo}
				resizeMode="center"
			/>
			<Animatable.View
				animation="fadeInUpBig"
			>
				<Text style={styles.text_header}>Go Green!</Text>
			</Animatable.View>
		</View>

		<View>
			<Text style={ styles.textWithShadow }>
				Welcome {user.email.split("@")[0]}
			</Text>
		</View>

		<View style={ styles.logout }>
			<TouchableOpacity style={styles.button} onPress={handleLogout}>
				<Text style={styles.buttonText}>Log Out</Text>
			</TouchableOpacity>
		</View>

	</View>
	); 
}; 

export default UserScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.1;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		margin: 0,
		padding: 0,
		alignItems: 'center',
	  },
	logout: {
		justifyContent: 'center', 
		alignItems: 'center', 
		marginTop: 150
	}, 
	header: {
			flex: 1,
			alignItems: "center",
			paddingHorizontal: 20,
			paddingBottom: 50
	},
	footer: {
			flex: 2,
			backgroundColor: 'white',
			borderTopLeftRadius: 30,
			borderTopRightRadius: 30,
			paddingHorizontal: 20,
			paddingVertical: 30
	},
	textWithShadow: {
	fontWeight: '500',
	color: '#FFD700',
	textShadowColor: 'rgba(0, 80, 0, 0.9)',
	marginTop: 150,
	fontSize: 35,
	textShadowOffset: { width: -2, height: 2 },
	textShadowRadius: 5
	},
	logo: {
		width: height_logo,
		height: height_logo,
		marginBottom: -35
	},
	text_header: {
			color: '#fff',
			fontWeight: 'bold',
			fontSize: 18,
	paddingTop: 30, 
	textAlign: 'center', 
	},
	moto: {
		color: "white",
		fontSize: 14,
	},
	text_footer: {
			color: '#05375a',
			fontSize: 18
	},
	textInput: {
			flex: 1,
			marginTop: Platform.OS === 'ios' ? 0 : -12,
			paddingLeft: 10,
			color: '#05375a',
	},
	button: {
		width: 150,
		padding: 5,
		backgroundColor: recycleGreen,
		borderWidth: 2,
		borderColor: 'white',
		borderRadius: 15,
		alignSelf: 'center',
	},
	buttonText: {
		fontSize:20,
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	topBarInfoContainer: {
	position: 'absolute',
	top: 0,
	height: 120,
	left: 0,
	right: 0,
	...Platform.select({
		ios: {
		shadowColor: 'black',
		shadowOffset: { height: -3 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		},
		android: {
		elevation: 20,
		},
	}),
	alignItems: 'center',
	backgroundColor: '#006600',
	paddingVertical: 10,
	},
});
