import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYkV7rO7FNMsquA2tbxHgh_gZCjxbS5nE",
  authDomain: "medwise-67925.firebaseapp.com",
  projectId: "medwise-67925",
  storageBucket: "medwise-67925.appspot.com",
  messagingSenderId: "692520875398",
  appId: "1:692520875398:web:50ae4fc23ef7d5a766a807"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }