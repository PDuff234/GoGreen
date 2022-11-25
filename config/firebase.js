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
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
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
