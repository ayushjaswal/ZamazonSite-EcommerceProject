// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ecommerceproject-427821.firebaseapp.com",
  projectId: "ecommerceproject-427821",
  storageBucket: "ecommerceproject-427821.appspot.com",
  messagingSenderId: "547419576275",
  appId: "1:547419576275:web:002600a512eb4033fdc126",
  measurementId: "G-LS9RQFD66L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);