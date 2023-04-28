// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwrJYgFo8SqJUC08PD6hLXRIBcnNRjvRM",
  authDomain: "laundry-app-4319b.firebaseapp.com",
  projectId: "laundry-app-4319b",
  storageBucket: "laundry-app-4319b.appspot.com",
  messagingSenderId: "589217529638",
  appId: "1:589217529638:web:3e08edc8cb1d8ae57b0be7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore();

export {auth,db};