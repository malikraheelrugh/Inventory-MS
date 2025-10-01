// / Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVlWxcPHBkhJNU9KJ5hAIZ8Ta62dRvpIE",
  authDomain: "sample-firebase-ai-app-378dc.firebaseapp.com",
  projectId: "sample-firebase-ai-app-378dc",
  storageBucket: "sample-firebase-ai-app-378dc.firebasestorage.app",
  messagingSenderId: "927781153730",
  appId: "1:927781153730:web:e2480aa31d5e2c34efc45b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };
