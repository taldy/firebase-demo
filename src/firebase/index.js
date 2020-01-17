import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

import firebaseConfig from './settings.json';

firebase.initializeApp(firebaseConfig);

firebase
  .firestore()
  .enablePersistence({ synchronizeTabs: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('Firestore persistence enabled successfully'))
  // eslint-disable-next-line no-console
  .catch(err => console.log('Firestore persistence error', err));

const firestore = firebase.firestore();
const rtdb = firebase.database();
const auth = firebase.auth();

export default firebase;
export {
  firebaseui, firestore, rtdb, auth,
};
