// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2ta2s2BV521OS14DtHp6QMRmn8vV7QXE",
  authDomain: "netflixgpt-e804e.firebaseapp.com",
  projectId: "netflixgpt-e804e",
  storageBucket: "netflixgpt-e804e.firebasestorage.app",
  messagingSenderId: "471612647823",
  appId: "1:471612647823:web:3d2c266866049e199b43fa",
  measurementId: "G-P6VZCP4K3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();