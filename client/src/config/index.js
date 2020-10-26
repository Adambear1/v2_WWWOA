import firebase from "firebase/app";
import "firebase/auth";

if (!firebase.apps.length) {
  const apps = firebase
    .initializeApp({
      apiKey: "AIzaSyCT1TK7I2Hd4mstDHGg8qwI5hlSoMEUN1k",
      authDomain: "fir-oa-67436.firebaseapp.com",
      databaseURL: "https://fir-oa-67436.firebaseio.com",
      projectId: "fir-oa-67436",
      storageBucket: "fir-oa-67436.appspot.com",
      messagingSenderId: "559638877699",
      appId: "1:559638877699:web:1d8e8a8955675f1ca42036",
    })
    .auth();
}
