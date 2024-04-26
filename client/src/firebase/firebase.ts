import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf2Q7VnpHmHOs9hKlRl7_-fAJNhhRfTp4",
  authDomain: "eduhub-d1414.firebaseapp.com",
  projectId: "eduhub-d1414",
  storageBucket: "eduhub-d1414.appspot.com",
  messagingSenderId: "307001335532",
  appId: "1:307001335532:web:43737fd3e4bbdd97ac0fc9",
  measurementId: "G-LHXC960S3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};