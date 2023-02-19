// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASYcMnW4AjRVIIlJ2Cn9mIszibB39E6Yg",
  authDomain: "clarity-task.firebaseapp.com",
  projectId: "clarity-task",
  storageBucket: "clarity-task.appspot.com",
  messagingSenderId: "646964489593",
  appId: "1:646964489593:web:d011d57812b24244ad93a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
