// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2knPfCfO-8uEsj9AV-fk2FTt3uW7lqJI",
  authDomain: "uber-clone-425a4.firebaseapp.com",
  projectId: "uber-clone-425a4",
  storageBucket: "uber-clone-425a4.appspot.com",
  messagingSenderId: "996628268716",
  appId: "1:996628268716:web:63b0ebf0f4523117ffc109",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };
