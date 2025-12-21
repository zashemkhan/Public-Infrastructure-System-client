// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);




//  apiKey: "AIzaSyBzWM20Mhsl7wTnsg0fROGgStl2BTIX6Ew",
//   authDomain: "public-infastructure-system.firebaseapp.com",
//   projectId: "public-infastructure-system",
//   storageBucket: "public-infastructure-system.firebasestorage.app",
//   messagingSenderId: "343676445230",
//   appId: "1:343676445230:web:274a614a06dd1942f3b5bf"