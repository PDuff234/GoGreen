import * as React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";


import { LoginScreen, SignupScreen, ForgotPasswordScreen } from '../screens';

const Auth = createStackNavigator({
	Login: LoginScreen,
	Signup: SignupScreen,
  ForgotPassword: ForgotPasswordScreen, }
	,{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#006600',
			}, 
			headerTitleStyle: {
				color: "#fff"
			},
		}
});

const AuthNavigator = createAppContainer(Auth);

export const AuthStack = () => {
  return (
		<AuthNavigator />
  );
};
