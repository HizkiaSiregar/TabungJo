// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd-_l32AQ3ZcSrMufL6SLb-DGgoJIhqQM",
  authDomain: "demotabungjo.firebaseapp.com",
  projectId: "demotabungjo",
  storageBucket: "demotabungjo.firebasestorage.app",
  messagingSenderId: "1076824981780",
  appId: "1:1076824981780:web:674db7d1368b3088954201",
  databaseURL: "https://demotabungjo-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Realtime Database and Storage
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, database, storage };
export default app;