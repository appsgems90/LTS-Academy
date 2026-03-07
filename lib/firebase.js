// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv9_ZPbk4FQj8UOrapH_yDOmdlvNyuKsg",
  authDomain: "lts-academy-chat.firebaseapp.com",
  projectId: "lts-academy-chat",
  storageBucket: "lts-academy-chat.firebasestorage.app",
  messagingSenderId: "1061823995766",
  appId: "1:1061823995766:web:d5072dc79a73e2aa276457",
  measurementId: "G-RZXPJQ6Z4E",
  databaseURL: "https://lts-academy-chat-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);