// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rent-house-991c8.firebaseapp.com",
  projectId: "rent-house-991c8",
  storageBucket: "rent-house-991c8.appspot.com",
  messagingSenderId: "436310771120",
  appId: "1:436310771120:web:9f2b0f1f0452fc609bc275"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);