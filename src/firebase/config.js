// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIDut_-8j9__chKWPzLijKtsUIuXD0M-k",
  authDomain: "unzip-f83f2.firebaseapp.com",
  projectId: "unzip-f83f2",
  storageBucket: "unzip-f83f2.appspot.com",
  messagingSenderId: "22003970350",
  appId: "1:22003970350:web:41e7ba5417a007cf8ccabf",
  measurementId: "G-K2SE243S33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);