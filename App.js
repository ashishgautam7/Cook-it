import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNav from './navigation/AppNav';
import { initializeApp } from 'firebase/app';




const firebaseConfig = {
  apiKey: "AIzaSyDZmip3-O9pjoidscdzKVtKHt-ByOD-DFY",
  authDomain: "cook-it-99c63.firebaseapp.com",
  projectId: "cook-it-99c63",
  storageBucket: "cook-it-99c63.appspot.com",
  messagingSenderId: "690918141919",
  appId: "1:690918141919:web:ec95d951d40751eba0de6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default function App() {
  return (
    <AppNav/>
  );
}


