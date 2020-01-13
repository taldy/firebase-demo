import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

firebase.initializeApp(config);

firebase.firestore().enablePersistence()
  .then(function() {
    const db = firebase.firestore();
  });
