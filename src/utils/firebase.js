// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClSdsw82S3tBaNbczZViZ4Z30FqRDaFZM",
  authDomain: "airlandsea.firebaseapp.com",
  projectId: "airlandsea",
  storageBucket: "airlandsea.appspot.com",
  messagingSenderId: "262838510238",
  appId: "1:262838510238:web:f3c5241ab79657cc71d18f",
  measurementId: "G-GLBLY3H943",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export default database;
