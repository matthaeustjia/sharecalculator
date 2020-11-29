import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export var app = firebase.initializeApp({
  apiKey: "AIzaSyB4zUdy05hA5VqYzk7UtsGN9DLTUEBSiZw",
  authDomain: "sharecalculator-cea7f.firebaseapp.com",
  databaseURL: "https://sharecalculator-cea7f.firebaseio.com",
  projectId: "sharecalculator-cea7f",
  storageBucket: "sharecalculator-cea7f.appspot.com",
  messagingSenderId: "751169945539",
  appId: "1:751169945539:web:61fed7b7bd67fa7ab0c776",
  measurementId: "G-T716NL84GC"
});

export const time = firebase.database.ServerValue.TIMESTAMP;
export const db = app.database();
export const auth = app.auth();
