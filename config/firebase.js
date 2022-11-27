import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics"; 
import { getFunctions } from "firebase/functions"; 
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import * as firebase from 'firebase/storage'; 

import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// add firebase config
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
//const analytics = getAnalytics(app); 
const db = getFirestore(app); 
const storage = firebase.getStorage(app); 
const functions = getFunctions(app); 

export { db, app, auth, storage };
