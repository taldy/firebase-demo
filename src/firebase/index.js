import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDpxOH-Qb6ncdqJtuH3EjLgWoBP7cn2uFM",
  authDomain: "fir-demo-4ecdc.firebaseapp.com",
  databaseURL: "https://fir-demo-4ecdc.firebaseio.com",
  projectId: "fir-demo-4ecdc",
  storageBucket: "",
  messagingSenderId: "1087801120529"
};

firebase.initializeApp(config);

firebase.firestore().enablePersistence()
  .then(function() {
    const db = firebase.firestore();
  });
