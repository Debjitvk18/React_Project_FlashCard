import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCnwEZIbPFXWJe9QpnMA0AzSDrOmtLq39Q",
  authDomain: "flashcardproject-afb8f.firebaseapp.com",
  databaseURL: "https://flashcardproject-afb8f-default-rtdb.firebaseio.com",
  projectId: "flashcardproject-afb8f",
  storageBucket: "flashcardproject-afb8f.appspot.com",
  messagingSenderId: "942029717779",
  appId: "1:942029717779:web:544bafeca0746ffac71ae6",
  measurementId: "G-GR6MY0E9B9"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
