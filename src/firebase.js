// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ0tzMb4Tjlh5Yz4zQze9wrlcjKFG097w",
  authDomain: "chat-app-7d2ed.firebaseapp.com",
  projectId: "chat-app-7d2ed",
  storageBucket: "chat-app-7d2ed.appspot.com",
  messagingSenderId: "1085792997372",
  appId: "1:1085792997372:web:c5da586ada8e745aa32c79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)