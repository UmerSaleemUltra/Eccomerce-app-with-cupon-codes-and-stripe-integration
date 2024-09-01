// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCETeJHG4ZHSxjkIXrBfKftG-9lVrWC2X0",
  authDomain: "eccomerce-dashboa.firebaseapp.com",
  projectId: "eccomerce-dashboa",
  storageBucket: "eccomerce-dashboa.appspot.com",
  messagingSenderId: "97461166946",
  appId: "1:97461166946:web:4891128b862a75e16bc23b",
  measurementId: "G-P01NQRZDMN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db, onAuthStateChanged };