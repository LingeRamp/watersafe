// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firestore from "firebase/firestore";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuIzuiB34_M5owAkU3hkHlvvc1oPr54Wc",
  authDomain: "water-monitor-3a119.firebaseapp.com",
  projectId: "water-monitor-3a119",
  storageBucket: "water-monitor-3a119.appspot.com",
  messagingSenderId: "537692839891",
  appId: "1:537692839891:web:b324a0cf7cf7af63f9d926"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);