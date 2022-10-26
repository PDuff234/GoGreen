// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import * as firebase from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSUv-dQGfbLWKumxA6OQEl42NLJTTV2O4",
  authDomain: "gogreen-366404.firebaseapp.com",
  projectId: "gogreen-366404",
  storageBucket: "gogreen-366404.appspot.com",
  messagingSenderId: "887063495200",
  appId: "1:887063495200:web:9c8eb9db0a7659ae98b245",
  measurementId: "G-KHQ9KXKHX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = firebase.getStorage(app);

export { db, app, storage, };