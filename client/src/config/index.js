import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCT1TK7I2Hd4mstDHGg8qwI5hlSoMEUN1k",
  authDomain: "fir-oa-67436.firebaseapp.com",
  databaseURL: "https://fir-oa-67436.firebaseio.com",
  projectId: "fir-oa-67436",
  storageBucket: "fir-oa-67436.appspot.com",
  messagingSenderId: "559638877699",
  appId: "1:559638877699:web:1d8e8a8955675f1ca42036",
});

export const auth = app.auth();
export const db = app.firestore();
export default app;
