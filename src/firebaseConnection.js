// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCICgXmIZshhhlIuZEI5wVB6YGdEl862Q",
  authDomain: "curso-9115a.firebaseapp.com",
  projectId: "curso-9115a",
  storageBucket: "curso-9115a.appspot.com",
  messagingSenderId: "791505196014",
  appId: "1:791505196014:web:dc563df7444d83fcd7f4ff",
  measurementId: "G-NQ34MTVYNG"
};


const firebaseApp = initializeApp(firebaseConfig);
const  db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export {db, auth};