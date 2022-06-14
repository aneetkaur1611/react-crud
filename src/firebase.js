import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyDpFUQcqRG4V91-CQ7fk6WTDsTi5lh44iE",
  // authDomain: "react-firebase-574d4.firebaseapp.com",
  // projectId: "react-firebase-574d4",
  // storageBucket: "react-firebase-574d4.appspot.com",
  // messagingSenderId: "315262284265",
  // appId: "1:315262284265:web:c0515309ec5e926d091b78",
  // measurementId: "G-FMF55C6TL7"
  apiKey: "AIzaSyDJnTIupV1v9umoEeBeeNUw4EqdS5sSdAw",
  authDomain: "react-crud-34e62.firebaseapp.com",
  projectId: "react-crud-34e62",
  storageBucket: "react-crud-34e62.appspot.com",
  messagingSenderId: "753221475966",
  appId: "1:753221475966:web:ba81c8223cd8f4d7c5422f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export{app, auth, db};
