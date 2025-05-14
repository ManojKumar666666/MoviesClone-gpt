// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWyO4EhR0JdfhrnMdxTykX_eaLDeTWZb0",
  authDomain: "moviesclone-gpt.firebaseapp.com",
  projectId: "moviesclone-gpt",
  storageBucket: "moviesclone-gpt.firebasestorage.app",
  messagingSenderId: "30267705980",
  appId: "1:30267705980:web:50db713f70179b3a20d7f9",
  measurementId: "G-QS12MF2Z1W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
