import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAiLGljv3-XY5_XA7hFnyeo_93-ha1dHHc",
  
// //   import.meta.env.APIKEY
//   authDomain: "chatapp-e111d.firebaseapp.com",
//   projectId: "chatapp-e111d",
//   storageBucket: "chatapp-e111d.appspot.com",
//   messagingSenderId: "284759567697",
//   appId: "1:284759567697:web:42140e26d232a3699df770"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyBIFkm1__zsnEwwd0zBdaraFpHR0SyKSfo",
  authDomain: "chatapp-35110.firebaseapp.com",
  projectId: "chatapp-35110",
  storageBucket: "chatapp-35110.appspot.com",
  messagingSenderId: "700921078400",
  appId: "1:700921078400:web:ec7c918e0ec74e7b7ebc65",
  measurementId: "G-ZQXKG9RD80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth()
export const db=getFirestore()
export const storage=getStorage()