import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCbJ76D-60lpyLc7ll0WsB7yAw72JTNGE",
  authDomain: "time-off-react.firebaseapp.com",
  projectId: "time-off-react",
  storageBucket: "time-off-react.appspot.com",
  messagingSenderId: "272095822289",
  appId: "1:272095822289:web:e618c3a146d53730e720f0",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth(app);
