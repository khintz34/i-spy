import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDAD2JUqxqvCm2y8Tjf4GT343SNIYRuk44",
  authDomain: "i-spy-719e5.firebaseapp.com",
  projectId: "i-spy-719e5",
  storageBucket: "i-spy-719e5.appspot.com",
  messagingSenderId: "1059341256881",
  appId: "1:1059341256881:web:c235f2e3e0738b9277fa90",
  measurementId: "G-JVMCE8NSJJ",
};

const fireBaseApp = initializeApp(firebaseConfig);
export const db = getDatabase();
