// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA0gCBP18lLOjOPUjRA6XA1QYiQBs7qezA",
  authDomain: "woo-com-frames.firebaseapp.com",
  projectId: "woo-com-frames",
  storageBucket: "woo-com-frames.appspot.com",
  messagingSenderId: "20047735230",
  appId: "1:20047735230:web:f37328b5da79e125fab1ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { app, db };
