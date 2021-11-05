// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDc6ISmxf_gJj5uiYpTTxZjJEDkRSwskd4",

  authDomain: "laplandsdg.firebaseapp.com",

  projectId: "laplandsdg",

  storageBucket: "laplandsdg.appspot.com",

  messagingSenderId: "433475123699",

  appId: "1:433475123699:web:140d04109b14fe3f0cba86",

  measurementId: "G-09X3XYDRWL"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app)
const storage = getStorage(app);
export {app, analytics, db, storage};