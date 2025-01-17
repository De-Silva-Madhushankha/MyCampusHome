// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mycampushomelk-760a0.firebaseapp.com",
  projectId: "mycampushomelk-760a0",
  storageBucket: "mycampushomelk-760a0.firebasestorage.app",
  messagingSenderId: "840297036946",
  appId: "1:840297036946:web:41f5fe2193f8f9167dfa4b",
  measurementId: "G-XV2FGB5WZ3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);