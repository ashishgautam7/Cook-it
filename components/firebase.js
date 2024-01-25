// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Auth with AsyncStorage
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
// const auth  = getAuth(app)

export{auth}