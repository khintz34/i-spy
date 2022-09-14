import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getDatabase, ref, set, push, onValue, child } from "firebase/database";
import {
  assortOneData,
  assortTwoData,
  chessData,
  hoarderData,
  roomData,
  winterData,
} from "../assets/data";

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
const db = getDatabase();
let datasetName;
export let displayArray = [];

export function writeUserData(board, name, time) {
  const reference = ref(db, board + "/");

  const newItem = push(reference);

  set(newItem, {
    username: name,
    time: time,
  });

  let obj = { username: name, time: time };
  addData(board, obj);
}

export function getUserData(board) {
  const boardRef = ref(db, board + "/");
  displayArray = [];

  onValue(
    boardRef,
    (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        const childKey = childSnapShot.key;
        const childData = childSnapShot.val();
        let obj = { username: childData.username, time: childData.time };
        addData(obj);
      });
    },
    {
      onlyOnce: false,
    }
  );
}

function addData(obj) {
  displayArray.push(obj);
  sortArray();
}

function sortArray() {
  displayArray.sort((a, b) => {
    return a.time - b.time;
  });
}
