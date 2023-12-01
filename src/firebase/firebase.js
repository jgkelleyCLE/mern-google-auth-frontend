// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern--auth.firebaseapp.com",
  projectId: "mern--auth",
  storageBucket: "mern--auth.appspot.com",
  messagingSenderId: "750379353328",
  appId: "1:750379353328:web:6a4228150c4bbb3f6b2e35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);