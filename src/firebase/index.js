import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

import firebaseConfig from './settings.json';

firebase.initializeApp(firebaseConfig);

if (localStorage.firebasePersistence === undefined) {
  localStorage.firebasePersistence = true;
}

if (localStorage.firebasePersistence === 'true') {
  firebase
    .firestore()
    .enablePersistence({ synchronizeTabs: true })
    .then(() => console.log('Firestore persistence enabled successfully'))
    .catch(err => console.log('Firestore persistence error', err));
}

const firestore = firebase.firestore();
const rtdb = firebase.database();

export default firebase;
export { firebaseui, firestore, rtdb };
